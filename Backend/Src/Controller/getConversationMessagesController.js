
import prisma from "../prisma.js";

export async function getConversationMessagesController(req, res) {
  try {
    const userId = req.userId;
    const { conversationId } = req.params;

    // 1. Check authentication
    if (!userId) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    // 2. Check conversation ID
    if (!conversationId) {
      return res.status(400).json({
        error: "Conversation ID is required",
      });
    }

    // 3. Find the conversation belonging to this user
    const conversation = await prisma.chatConversation.findFirst({
      where: {
        id: conversationId,
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,

        // 4. Fetch all saved messages in chronological order
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            role: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    // 5. Handle missing conversation
    if (!conversation) {
      return res.status(404).json({
        error: "Conversation not found",
      });
    }

    // 6. Return conversation and its messages
    return res.status(200).json({
      conversation,
    });
  } catch (error) {
    console.error(
      "Fetch conversation messages error:",
      error
    );

    return res.status(500).json({
      error: "Failed to load conversation messages",
    });
  }
}
