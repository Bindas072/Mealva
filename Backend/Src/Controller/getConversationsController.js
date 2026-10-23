import prisma from "../prisma.js";

export async function getConversationsController(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const conversations = await prisma.chatConversation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ conversations });
  } catch (error) {
    console.error("Fetch conversations error:", error);

    return res.status(500).json({
      error: "Failed to load conversations",
    });
  }
}