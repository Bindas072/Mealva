
import { useState, useRef } from "react";
import MealvaMsgInputAi from "../MealvaChat/MealvaChat";
import MealvaAiMsgStruct from "../MealvaChat/MealvaAiMsgStruct";

export default function MealvaAi() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef(null);

  // Stop the current request
  const handleStop = () => {
    abortControllerRef.current?.abort();
  };

  // Send a message to Mealva AI
  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;

    const question = text.trim();

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    setMessages((previous) => [...previous, userMessage]);
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(
        "http://localhost:5000/openrouter",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("Mealva AI response:", data);
      console.log("Foods received:", data.foods);
      console.log("Answer:", data.answer);

      const aiText = data.answer ?? data.reply ?? "";

      if (typeof aiText !== "string" || !aiText.trim()) {
        throw new Error("No AI response text received.");
      }

      // Add the AI response once
      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: aiText,
          orders: data.orders ?? null,
          foods: data.foods ?? null,
        },
      ]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Generation stopped by user.");
        return;
      }

      console.error("Chat request failed:", error);

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
    <div className="flex h-dvh flex-col bg-gray-50">
      {/* Chat header */}
      <header className="shrink-0 border-b bg-white px-5 py-4">
        <h1 className="font-semibold text-green-700">
          Mealva AI
        </h1>
      </header>

      {/* Scrollable conversation */}
      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((msg) => (
            <MealvaAiMsgStruct
              key={msg.id}
              message={msg}
            />
          ))}

          {/* Loading animation and Stop button */}
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
                className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 transition hover:bg-red-100 hover:text-red-600"
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
    </div>
  );
}
