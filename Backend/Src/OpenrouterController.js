
import { OpenRouter } from "@openrouter/sdk";
import { getMyOrdersTool } from "./Tools/getmyOrdersTool.js";
import { getmyOrderHandler } from "./Tools/getmyOrdersHandler.js";

export async function OpenrouterController(req, res) {
  try {
    const { question } = req.body || {};
    const userId = req.userId;

    console.log("User ID:", userId);
    console.log("Question:", question);
    
    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const openrouter = new OpenRouter({
      apiKey: process.env.API_KEY,
    });

    const messages = [
      {
        role: "system",
        content:
          process.env.MEALVA_SYSTEM_PROMPT ||
          "You are Mealva AI, a helpful food ordering assistant.",
      },
      { role: "user", content: question.trim() },
    ];

    // First AI request
    let result = await openrouter.chat.send({
      chatRequest: {
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
        messages,
        tools: [getMyOrdersTool],
        tool_choice: "auto",
        stream: false,
      },
    });

    let message = result.choices?.[0]?.message;

    console.log("First AI message:", JSON.stringify(message, null, 2));

    // Execute tool if requested
    if (message?.toolCalls?.length) {
      messages.push(message);

      for (const tool of message.toolCalls) {
        if (tool.function?.name === "getMyOrders") {
          const orders = await getmyOrderHandler(userId);

          console.log("Orders fetched:", orders.length);

          messages.push({
            role: "tool",
            toolCallId: tool.id,
            content: JSON.stringify(orders),
          });
        }
      }

      // Second AI request
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

    return res.status(200).json({
      answer:
        typeof message?.content === "string" && message.content.trim()
          ? message.content
          : "The AI returned no text. Check the server logs.",
    });
  } catch (error) {
    console.error("OpenRouter error:", error);
    return res.status(500).json({
      error: "Failed to get AI response",
    });
  }
}
