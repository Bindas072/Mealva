
import jwt from "jsonwebtoken";

import prisma from "../prisma.js";

// Create and save an order
export const ConfirmOrderController = async (req, res) => {
  try {
    // 1. Get the logged-in user's token
    const token = req.cookies?.token;
    const { orders, total, paymentMethod, quantity } = req.body;
    console.log("Cookies received:", req.cookies);
    console.log("Token received:", req.cookies?.token ? "YES" : "NO");
    const userId= req.userId;

    // 7. Save the order in PostgreSQL
    const newOrder = await prisma.orders.create({
      data: {
        
        userId: userId,
        paymentMethod: paymentMethod,
        orderitems: JSON.stringify(orders),
        quantity: quantity,
        price: Number(total),
      },
    });

    // 8. Send the saved order to React
    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Order creation failed",
    });
  }
};
