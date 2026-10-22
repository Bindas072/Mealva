export const takeOrders={
    type:"function",
    function:{
    name: "takeOrders",
    description:"Place a food order for the authenticated user by using the selected food items and their quantities. Use this tool when the user explicitly wants to place or confirm an order. Verify the food items, quantities, prices, and availability before creating the order. Do not place an order without the user's confirmation.",
    parameters :{
        type: "object",
        properties: {
        items:{
            type: "array",
            description :"Food items and quantities selected by the user",
            items :{
                properties:{
                    foodId:{type:"string"},
                    quantity: { type: "integer", minimum: 1 }
                },
               required: ["foodId", "quantity"],
               additionalProperties: false 
            }
        }
        }
    },
   required: ["items"],
  additionalProperties: false 
}
}