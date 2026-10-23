
import prisma from "../prisma.js";

export async function takeOrderHandler(userId, items) {
  console.log("[takeOrderHandler] Function called");
  console.log("[takeOrderHandler] User ID exists:", Boolean(userId));
  console.log(
    "[takeOrderHandler] Items received:",
    JSON.stringify(items)
  );

  // 1. Validate user
  if (!userId) {
    throw new Error("User must be logged in to place an order.");
  }

  // 2. Validate items
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your cart is empty or invalid.");
  }

  const preparedItems = [];

  // 3. Find each food using foodId or foodName
  for (const item of items) {
    const quantity = Number(item?.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Invalid food quantity.");
    }

    let food = null;

    if (typeof item.foodId === "string" && item.foodId.trim()) {
      food = await prisma.foodItems.findUnique({
        where: {
          id: item.foodId.trim(),
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      });
    } else if (
      typeof item.foodName === "string" &&
      item.foodName.trim()
    ) {
      food = await prisma.foodItems.findFirst({
        where: {
          name: {
            equals: item.foodName.trim(),
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      });
    } else {
      throw new Error(
        "Each item must contain either foodId or foodName."
      );
    }

    if (!food) {
      throw new Error(
        `Food item not found: ${item.foodId || item.foodName}`
      );
    }

    preparedItems.push({
      food,
      quantity,
    });
  }

  console.log(
    "[takeOrderHandler] Validated items:",
    preparedItems.map(({ food, quantity }) => ({
      foodId: food.id,
      foodName: food.name,
      quantity,
      price: Number(food.price),
    }))
  );

  // 4. Create orders in a transaction
  console.log("[takeOrderHandler] Starting database transaction...");

  const createdOrders = await prisma.$transaction(async (tx) => {
    const orders = [];

    for (const item of preparedItems) {
      const order = await tx.orders.create({
        data: {
          userId,
          orderitems: item.food.name,
          quantity: item.quantity,
          price: item.food.price,
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

  console.log(
    "[takeOrderHandler] Orders created:",
    createdOrders.map((order) => order.id)
  );

  // 5. Calculate total from database prices
  const totalAmount = createdOrders.reduce(
    (total, order) =>
      total + Number(order.price) * order.quantity,
    0
  );

  // 6. Build UPI payment URL
  const upiId = process.env.MEALVA_UPI_ID;
  const payeeName = process.env.MEALVA_PAYEE_NAME || "Mealva";

  let upiPaymentUrl = null;

  if (upiId) {
    const paymentParams = new URLSearchParams({
      pa: upiId,
      pn: payeeName,
      am: totalAmount.toFixed(2),
      cu: "INR",
      tr: String(createdOrders[0].id).slice(0, 35),
      tn: `Mealva order ${createdOrders[0].id}`,
    });

    upiPaymentUrl = `upi://pay?${paymentParams.toString()}`;
  } else {
    console.warn(
      "[takeOrderHandler] MEALVA_UPI_ID is missing from .env"
    );
  }

  // 7. Return details to the controller
  return {
    status: "created",
    orders: createdOrders,
    orderIds: createdOrders.map((order) => order.id),
    totalAmount,
    paymentMethod: "upi",
    paymentStatus: "PENDING",
    upiPaymentUrl,
    message: upiPaymentUrl
      ? "Order saved successfully. Scan the QR code to pay."
      : "Order saved successfully, but UPI is not configured.",
  };
}
