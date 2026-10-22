
import prisma from "../prisma.js";

export async function recommendFoodsHandler({ category, maxPrice }) {
  const where = {
    category: {
      equals: category,
      mode: "insensitive",
    },
  };

  if (maxPrice !== undefined) {
    if (typeof maxPrice !== "number" || maxPrice < 0) {
      throw new Error("Invalid maximum price");
    }

    where.price = { lte: maxPrice };
  }

  return await prisma.foodItems.findMany({
    where,
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
      image: true,
    },
    orderBy: {
      price: "asc",
    },
  });
}
