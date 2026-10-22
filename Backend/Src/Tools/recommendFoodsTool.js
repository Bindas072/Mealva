
export const recommendFoodsTool = {
  type: "function",
  function: {
    name: "recommendFoods",
    description:
      "Recommend available foods by meal category. Apply maxPrice only when the user specifies a budget.",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["Breakfast", "Lunch", "Dinner"],
          description: "Requested meal category",
        },
        maxPrice: {
          type: "number",
          description: "Optional maximum price in rupees",
        },
      },
      required: ["category"],
      additionalProperties: false,
    },
  },
};
