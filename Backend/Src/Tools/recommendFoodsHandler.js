import prisma from "../prisma.js";

export async function recommendFoodsHandler({ category, maxPrice }) {
  const foods = await prisma.foodItems.findMany({
    where: {
      category: {
        equals: category,
        mode: "insensitive",
      },
      price: {
        lte: maxPrice,
      },
    },
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
    },
    orderBy: {
      price: "asc",
    },
  });

  return foods;
}