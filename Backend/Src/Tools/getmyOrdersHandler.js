import prisma from "../prisma.js";
export async function getmyOrderHandler(userId) {
    const orders = await prisma.orders.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt:"desc"
        },
        
    })
      return orders.map((order) => {
    let items = [];

    try {
      items =
        typeof order.orderitems === "string"
          ? JSON.parse(order.orderitems)
          : order.orderitems || [];
    } catch {
      items = [];
    }

    return {
      ...order,
      orderitems: items,
    };
  });
}