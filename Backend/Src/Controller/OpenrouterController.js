
import { OpenRouter } from "@openrouter/sdk";
import prisma from "../prisma.js";
import { generateChatTitle } from "../Tools/generateChatTitle.js";
import { getMyOrdersTool } from "../Tools/getmyOrdersTool.js";
import { getmyOrderHandler } from "../Tools/getmyOrdersHandler.js";
import { recommendFoodsHandler } from "../Tools/recommendFoodsHandler.js";
import { recommendFoodsTool } from "../Tools/recommendFoodsTool.js";
import { takeOrders } from "../Tools/takeOrder.js";
import { takeOrderHandler } from "../Tools/takeOrderHandler.js";

export async function OpenrouterController(req, res) {
  try {
    const { question, conversationId } = req.body || {};
    const userId = req.userId;

    // STEP 1: Validate the request
    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        error: "Question is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    if (!process.env.API_KEY) {
      console.error("API_KEY is missing from the backend .env file");

      return res.status(500).json({
        error: "AI service is not configured",
      });
    }

    const cleanQuestion = question.trim();

    // STEP 2: Find or create a conversation
    let conversation;

    if (conversationId) {
      conversation = await prisma.chatConversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
      });

      if (!conversation) {
        return res.status(404).json({
          error: "Conversation not found",
        });
      }
    } else {
      const chatTitle = await generateChatTitle(cleanQuestion, process.env.API_KEY);
      conversation = await prisma.chatConversation.create({
        data: {
          userId,
          title: chatTitle,
        },
      });
    }

    // STEP 3: Load previous messages before saving this message
    const history = await prisma.chatMessage.findMany({
      where: {
        conversationId: conversation.id,
        role: {
          in: ["user", "assistant"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    history.reverse();

    // STEP 4: Save the user's message
    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "user",
        content: cleanQuestion,
      },
    });

    // STEP 5: Detect food-related requests
    const wantsFoodRecommendations =
      /\b(recommend|recommendation|suggest|suggestion|menu|food|foods|breakfast|lunch|dinner|meal|meals|dish|dishes|vegetarian|veg|snack|snacks|thali|poha|paneer|available)\b/i.test(
        cleanQuestion
      );

    // STEP 6: Fetch food records, including their image URLs
    let availableFoods = [];

    if (wantsFoodRecommendations) {
      availableFoods = await prisma.foodItems.findMany({
        select: {
          id: true,
          name: true,
          category: true,
          price: true,
          image: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      console.log("Foods fetched:", availableFoods.length);
      console.log("First food record:", availableFoods[0] ?? null);
    }

    // STEP 7: Prepare the AI system instructions
    const systemPrompt =
      process.env.MEALVA_SYSTEM_PROMPT ||
      `You are Mealva AI, the food ordering and customer support assistant for the Mealva food canteen application.

Your responsibilities:
- Help users explore the available food menu, categories, prices, and food items.
- Recommend food using the Mealva database records provided to you.
- Help users check their previous orders using the available tools.
- Help users place orders using the available order tools.
- Never invent food names, prices, availability, image URLs, or order details.
- Be friendly, concise, and easy to understand.
- If a user asks about something unrelated to Mealva, politely explain that you mainly help with food, menus, and orders.
- Never claim an order was placed unless the order tool confirms it.`;

    // Give the AI database context for food-related questions.
    const foodContext = wantsFoodRecommendations
      ? `\n\nAvailable Mealva food records from the database:\n${JSON.stringify(
          availableFoods
        )}\n\nUse these records when answering menu questions. Do not invent food items or prices.`
      : "";

    // STEP 8: Initialize OpenRouter
    const openrouter = new OpenRouter({
      apiKey: process.env.API_KEY,
    });

    // STEP 9: Build the message history
    const messages = [
      {
        role: "system",
        content: systemPrompt + foodContext,
      },
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: cleanQuestion,
      },
    ];

    // STEP 10: Send the first AI request
    let result = await openrouter.chat.send({
      chatRequest: {
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
        messages,
        tools: [getMyOrdersTool, recommendFoodsTool, takeOrders],
        tool_choice: "auto",
        stream: false,
      },
    });

    let message = result.choices?.[0]?.message;

    let recentOrders = null;
    let recommendedFoods = null;

    // STEP 11: Execute any tools requested by the AI
    if (message?.toolCalls?.length) {
      messages.push(message);

      for (const tool of message.toolCalls) {
        let args = {};

        try {
          args = JSON.parse(tool.function.arguments || "{}");
        } catch (parseError) {
          console.error("Invalid tool arguments:", parseError);
        }

        let toolResult;

        try {
          if (tool.function.name === "getMyOrders") {
            toolResult = await getmyOrderHandler(userId);
             const limit = Number(args.limit) || 5;

              toolResult = await getmyOrderHandler(userId, limit);
              recentOrders = toolResult;
          } else if (tool.function.name === "recommendFoods") {
            toolResult = await recommendFoodsHandler(args);

            // Support either an array or an object containing foods.
            recommendedFoods = Array.isArray(toolResult)
              ? toolResult
              : Array.isArray(toolResult?.foods)
                ? toolResult.foods
                : [];
          } else if (tool.function.name === "takeOrders") {
            toolResult = await takeOrderHandler(userId, args.items);
          } else {
            toolResult = {
              error: "Unknown tool",
            };
          }
        } catch (toolError) {
          console.error(
            `Tool ${tool.function.name} failed:`,
            toolError
          );

          toolResult = {
            error: "The requested operation could not be completed.",
          };
        }

        messages.push({
          role: "tool",
          toolCallId: tool.id,
          content: JSON.stringify(toolResult ?? null),
        });
      }

      // STEP 12: Ask the AI to produce a final answer using tool results
      result = await openrouter.chat.send({
        chatRequest: {
          model: "nvidia/nemotron-3-ultra-550b-a55b:free",
          messages,
          tool_choice: "none",
          stream: false,
        },
      });

      message = result.choices?.[0]?.message;
    }

    // STEP 13: Extract the final AI answer
    const aiReply =
      typeof message?.content === "string" && message.content.trim()
        ? message.content.trim()
        : "I couldn't prepare an answer right now. Please try again.";

    // STEP 14: Save the assistant reply
    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "assistant",
        content: aiReply,
      },
    });

    // STEP 15: Prepare the food data for React
    // Prefer results from the recommendation tool.
    // If the tool wasn't called, use the database records fetched above.
    const foodsToSend =
      Array.isArray(recommendedFoods) && recommendedFoods.length > 0
        ? recommendedFoods
        : wantsFoodRecommendations
          ? availableFoods
          : null;

    console.log("Conversation ID:", conversation.id);
    console.log("Orders returned:", Array.isArray(recentOrders) ? recentOrders.length : 0);
    console.log("Food records sent:", Array.isArray(foodsToSend) ? foodsToSend.length : 0);
    console.log("First image URL:", foodsToSend?.[0]?.image ?? null);

    // STEP 16: Return the response to React
    return res.status(200).json({
      answer:
        Array.isArray(recentOrders) && recentOrders.length > 0
          ? "Here are your recent orders:"
          : aiReply,
      conversationId: conversation.id,
      orders: recentOrders,
      foods: foodsToSend,
    });
  } catch (error) {
    console.error("OpenRouter controller error:", error);

    return res.status(500).json({
      error: "Failed to get AI response",
    });
  }
}
