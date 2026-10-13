export const recommendFoodsTool = {
  type: "function",
  function: {
    name: "recommendFoods",
    description:
      "Find food items by meal category and maximum price.",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["Breakfast", "Lunch", "Dinner"],
          description: "The meal category requested by the user",
        },
        maxPrice: {
          type: "number",
          description: "Maximum price in rupees",
        },
      },
      required: ["category", "maxPrice"],
      additionalProperties: false,
    },
  },
};