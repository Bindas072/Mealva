
import prisma from "../prisma.js";

export async function getmyOrderHandler(userId) {
  const orders = await prisma.orders.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
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
        // Older orders store just the food name, e.g. "Paneer Burger"
        items = [];
      }

      // Your current takeOrderHandler saves a single food name as a string.
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
