export const getMyOrdersTool = {
  type: "function",
  function: {
    name: "getMyOrders",
    description:
      "Retrieve the authenticated user's order history, including food items, quantities, total price, order status, payment status, and order date. Use this when the user asks about their orders or previous purchases.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
      additionalProperties: false,
    },
  },
};