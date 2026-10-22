export default function MealvaOrderCards({ orders = [] }) {
  if (!orders.length) return null;

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-base font-semibold text-gray-900">
        Your Recent Orders
      </h3>

      {orders.map((order) => {
        const items = Array.isArray(order.orderitems)
          ? order.orderitems
          : [];

        return (
          <div
            key={order.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-gray-900">
                  {items.length
                    ? items.map((item) => item.name).filter(Boolean).join(", ")
                    : "Your order"}
                </p>

                <p className="mt-1 break-all text-xs text-gray-500">
                  Order ID: {order.id}
                </p>

                {order.createdAt && (
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                )}
              </div>

              <p className="shrink-0 font-bold text-green-700">
                ₹{Number(order.total ?? 0).toFixed(2)}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                {order.status ?? "Unknown"}
              </span>

              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                {order.paymentMethod ?? "Payment method unavailable"}
                {order.paymentStatus
                  ? ` · ${order.paymentStatus}`
                  : ""}
              </span>
            </div>

            <div className="mt-3 space-y-2 border-t pt-3">
              {items.map((item, index) => (
                <div
                  key={item.id ?? `${item.name}-${index}`}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-gray-700">
                    {item.name ?? item.foodName ?? "Food item"}
                    {" × "}
                    {item.quantity ?? item.qty ?? 1}
                  </span>

                  {item.price != null && (
                    <span className="shrink-0 text-gray-600">
                      ₹{Number(item.price).toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}