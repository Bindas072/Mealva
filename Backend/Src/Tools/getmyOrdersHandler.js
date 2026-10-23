
import prisma from "../prisma.js";

export async function getmyOrderHandler(userId, limit = 5) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Limit the number of orders returned
  const safeLimit = Math.min(
    Math.max(Number.parseInt(limit, 10) || 5, 1),
    20
  );

  const orders = await prisma.orders.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: safeLimit,
  });

  const ordersWithImages = await Promise.all(
    orders.map(async (order) => {
      let items = [];

      try {
        items =
          typeof order.orderitems === "string"
            ? JSON.parse(order.orderitems)
            : order.orderitems || [];
      } catch {
        items = [];
      }

      // Handle older orders that store a single food name as a string
      const foodName =
        typeof order.orderitems === "string" &&
        !order.orderitems.trim().startsWith("[") &&
        !order.orderitems.trim().startsWith("{")
          ? order.orderitems.trim()
          : null;

      const food = foodName
        ? await prisma.foodItems.findFirst({
            where: {
              name: {
                equals: foodName,
                mode: "insensitive",
              },
            },
            select: {
              name: true,
              image: true,
            },
          })
        : null;

      return {
        id: order.id,
        createdAt: order.createdAt,
        status: order.orderStatus,
        total: order.price * order.quantity,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        quantity: order.quantity,
        foodName: food?.name ?? foodName ?? "Unknown",
        foodImage: food?.image ?? null,
        orderitems: items,
      };
    })
  );

  return ordersWithImages;
}
