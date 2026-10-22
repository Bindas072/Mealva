
import prisma from "../prisma.js";

export async function takeOrderHandler(userId, items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const prepareorders = [];

  // Validate food items and get trusted prices from the database
  for (const item of items) {
    const { foodName, quantity } = item;

    if (
      typeof foodName !== "string" ||
      !foodName.trim() ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      throw new Error("Invalid food name or quantity");
    }

    const food = await prisma.foodItems.findFirst({
      where: {
        name: {
          equals: foodName.trim(),
          mode: "insensitive",
        },
      },
    });

    if (!food) {
      throw new Error(`Food item not found: ${foodName}`);
    }

    prepareorders.push({
      food,
      quantity,
      price: food.price,
    });
  }

  // Create orders and update food order counts atomically
  const createdOrders = await prisma.$transaction(async (tx) => {
    const orders = [];

    for (const item of prepareorders) {
      const order = await tx.orders.create({
        data: {
          userId,
          orderitems: item.food.name,
          quantity: item.quantity,
          price: item.price,
          paymentMethod: "upi",
          paymentStatus: "PENDING",
          orderStatus: "PLACED",
        },
      });

      await tx.foodItems.update({
        where: {
          id: item.food.id,
        },
        data: {
          orders: {
            increment: item.quantity,
          },
        },
      });

      orders.push(order);
    }

    return orders;
  });

  const totalAmount = createdOrders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );

  return {
    status: "created",
    orders: createdOrders,
    totalAmount,
    message: "Order saved successfully.",
  };
}
