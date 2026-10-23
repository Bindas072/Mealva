export const getMyOrdersTool = {
  type: "function",
  function: {
    name: "getMyOrders",
    description:
      "Get the logged-in user's recent orders. Use the limit argument to control how many orders to return. For example, if the user asks for their last 2 orders, use limit 2.",
    parameters: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Maximum number of recent orders to return",
        },
      },
      required: ["limit"],
      additionalProperties: false,
    },
  },
};