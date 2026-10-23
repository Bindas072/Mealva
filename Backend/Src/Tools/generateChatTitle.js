
export async function generateChatTitle(question, apiKey) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Create a short title for a food ordering AI chat. " +
                "Return only the title, using 3 to 6 words. " +
                "Do not use quotation marks or explanations.",
            },
            {
              role: "user",
              content: question,
            },
          ],
          max_tokens: 20,
          temperature: 0.3,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Title generation failed: ${response.status}`);
    }

    const data = await response.json();

    return (
      data.choices?.[0]?.message?.content?.trim()
        ?.replace(/^["']|["']$/g, "") ||
      "New Mealva Chat"
    );
  } catch (error) {
    console.error("Chat title generation error:", error);
    return "New Mealva Chat";
  }
}
