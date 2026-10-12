import prisma from "../prisma.js";

export const MyOrdersController = async (req, res) => {
  try {
    console.log("its coming...")
     const userId = req.userId;
    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
       orderBy: {
    createdAt: "desc",
  },
    });
    
    console.log(orders)
    return res.status(200).json({
      message: "Orders fetched successfully",
      orders: orders,
    });
    
  } catch (error) {
    console.error("Fetch orders error:", error);

    return res.status(500).json({
      message: "Failed to fetch orders",
    });
  }

  
};