
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import MealvaMsgInputAi from "../MealvaChat/MealvaChat";
import MealvaAiMsgStruct from "../MealvaChat/MealvaAiMsgStruct";

const API_URL = "http://localhost:5000";

export default function MealvaAi() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const abortControllerRef = useRef(null);
  const selectedConversationRef = useRef(null);

  // Redirect when the login session expires.
  const handleUnauthorized = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    navigate("/login", { replace: true });
  }, [navigate]);

  // Keep the selected conversation ref synchronized.
  const selectConversation = (id) => {
    selectedConversationRef.current = id;
    setSelectedConversationId(id);
  };

  // Load previous conversation titles.
  const loadConversations = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/conversations`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load conversations: ${response.status}`
        );
      }

      const data = await response.json();

      setConversations(data.conversations ?? []);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Load conversations error:", error);
      }
    }
  }, [handleUnauthorized]);

  // Load chat titles when the page opens.
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Load messages from a selected conversation.
  const openConversation = async (conversationId) => {
    if (isLoading) return;

    selectConversation(conversationId);
    setMessages([]);
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/conversations/${conversationId}/messages`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load chat messages: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Conversation response:", data);

      // Accept several common backend response formats.
      const loadedMessages =
        data.conversation?.messages ??
        data.messages ??
        data.conversation?.chatMessages ??
        [];

      if (!Array.isArray(loadedMessages)) {
        throw new Error("The backend returned an invalid messages list.");
      }

      const formattedMessages = loadedMessages.map((msg, index) => ({
        ...msg,
        id: msg.id ?? `${conversationId}-${index}`,
        role:
          msg.role ??
          msg.sender ??
          msg.messageRole ??
          "assistant",
        content:
          msg.content ??
          msg.message ??
          msg.text ??
          "",
        orders: msg.orders ?? null,
        foods: msg.foods ?? null,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Open conversation error:", error);
      setErrorMessage(
        "Unable to load this conversation. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new conversation without deleting old chats.
  const startNewChat = () => {
    if (isLoading) return;

    selectConversation(null);
    setMessages([]);
    setErrorMessage("");
  };

  // Stop the current AI request.
  const handleStop = () => {
    abortControllerRef.current?.abort();
  };

  // Send a message to Mealva AI.
  const handleSend = async (text) => {
    if (!text?.trim() || isLoading) return;

    const question = text.trim();
    const currentConversationId = selectedConversationRef.current;

    setErrorMessage("");

    // Display the user's message immediately.
    setMessages((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: question,
      },
    ]);

    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`${API_URL}/openrouter`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          conversationId: currentConversationId,
        }),
        signal: controller.signal,
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(
          `Request failed: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();

      // Store the ID of the created or selected conversation.
      if (data.conversationId) {
        selectConversation(data.conversationId);
      }

      const aiText = data.answer ?? data.reply ?? "";

      if (typeof aiText !== "string" || !aiText.trim()) {
        throw new Error("No AI response text received.");
      }

      // Display the assistant's reply.
      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: aiText,
          orders: data.orders ?? null,
          foods: data.foods ?? null,
          totalAmount: data.totalAmount ?? null,
          orderIds: data.orderIds ?? null,
          upiPaymentUrl: data.upiPaymentUrl ?? null,
        },
      ]);

      // Refresh sidebar titles after the response.
      await loadConversations();
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Generation stopped by user.");
        return;
      }

      console.error("Chat request failed:", error);
      setErrorMessage(error.message || "Something went wrong.");

      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Sorry, I couldn't get a response. Please try again.",
        },
      ]);
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
          <div className="border-b p-4">
            <button
              type="button"
              onClick={startNewChat}
              disabled={isLoading}
              className="w-full rounded-xl bg-green-600 px-4 py-3 text-left font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              + New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Chat History
            </p>

            {conversations.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => openConversation(chat.id)}
                disabled={isLoading}
                title={chat.title || "New conversation"}
                className={`mb-1 w-full truncate rounded-lg px-3 py-3 text-left text-sm transition ${
                  selectedConversationId === chat.id
                    ? "bg-green-100 font-medium text-green-800"
                    : "text-gray-700 hover:bg-gray-100"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {chat.title || "New conversation"}
              </button>
            ))}

            {conversations.length === 0 && (
              <p className="px-2 text-sm text-gray-400">
                No previous chats yet.
              </p>
            )}
          </div>

          <div className="border-t p-3 text-xs text-gray-400">
            Mealva AI Chat History
          </div>
        </aside>
      )}

      {/* Main chat */}
      <section className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex shrink-0 items-center gap-3 border-b bg-white px-5 py-4">
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            className="rounded-lg px-2 py-1 text-xl text-gray-600 hover:bg-gray-100"
            aria-label="Toggle chat history"
            title="Toggle chat history"
          >
            ☰
          </button>

          <h1 className="font-semibold text-green-700">
            Mealva AI
          </h1>
        </header>

        {/* Messages */}
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.length === 0 && !isLoading && (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Welcome to Mealva AI
                </h2>

                <p className="mt-2 text-gray-500">
                  Ask about food, menus, or your orders.
                </p>
              </div>
            )}

            {errorMessage && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {errorMessage}
              </div>
            )}

            {messages.map((msg, index) => (
              <MealvaAiMsgStruct
                key={msg.id ?? `${msg.role}-${index}`}
                message={msg}
              />
            ))}

            {/* AI thinking indicator */}
            {isLoading && (
              <div className="mr-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-600 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-600 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-600" />
                </div>

                <span className="whitespace-nowrap text-sm text-gray-600">
                  Mealva AI is thinking...
                </span>

                <button
                  type="button"
                  onClick={handleStop}
                  title="Stop generating"
                  aria-label="Stop generating"
                  className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600"
                >
                  <span className="h-2.5 w-2.5 rounded-sm bg-current" />
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Message input */}
        <footer className="shrink-0 border-t border-gray-200 bg-white">
          <MealvaMsgInputAi
            onSend={handleSend}
            isLoading={isLoading}
          />
        </footer>
      </section>
    </div>
  );
}
