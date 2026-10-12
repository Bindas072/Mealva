
import React, { useEffect, useState } from "react";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders belonging to the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/myorders", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError(
          err.message ||
            "Unable to load orders. Please check your connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Convert orderitems from a JSON string into an array
  const getItems = (orderitems) => {
    try {
      if (Array.isArray(orderitems)) {
        return orderitems;
      }

      if (typeof orderitems === "string") {
        const parsedItems = JSON.parse(orderitems);
        return Array.isArray(parsedItems) ? parsedItems : [];
      }

      return [];
    } catch (err) {
      console.error("Unable to parse order items:", err);
      return [];
    }
  };

  // Format the order date
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format prices
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-xl font-semibold text-red-700">
          Unable to load orders
        </h2>
        <p className="mt-2 text-sm text-red-600">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Orders
          </h1>
          <p className="mt-2 text-gray-500">
            View your Mealva order history and order details.
          </p>
        </div>

        {/* No orders */}
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-6xl">🍽️</div>

            <h2 className="text-xl font-semibold text-gray-800">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your food orders will appear here after you place an order.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const items = getItems(order.orderitems);

              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  {/* Order header */}
                  <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>

                      <p className="mt-1 break-all font-semibold text-gray-800">
                        {order.id}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {order.orderStatus || "PLACED"}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          order.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === "FAILED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        Payment: {order.paymentStatus || "PENDING"}
                      </span>
                    </div>
                  </div>

                  {/* Food items */}
                  <div className="p-5">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                      Ordered Items
                    </h2>

                    {items.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No item details are available for this order.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {items.map((item, index) => (
                          <div
                            key={item.id || `${order.id}-${index}`}
                            className="flex flex-col gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
                          >
                            {/* Food image */}
                            <img
                              src={item.img || item.image || ""}
                              alt={item.name || "Food item"}
                              className="h-24 w-24 rounded-xl object-cover"
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src =
                                  "https://placehold.co/200x200?text=Food";
                              }}
                            />

                            {/* Food information */}
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">
                                {item.name || "Food item"}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                Quantity: {item.quantity ?? 1}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                Price per item: ₹
                                {formatPrice(item.price)}
                              </p>

                              {item.ingredients && (
                                <p className="mt-2 text-sm text-gray-500">
                                  <span className="font-medium">
                                    Ingredients:
                                  </span>{" "}
                                  {item.ingredients}
                                </p>
                              )}
                            </div>

                            {/* Item subtotal */}
                            <p className="text-lg font-bold text-green-700 sm:text-right">
                              ₹
                              {formatPrice(
                                Number(item.price || 0) *
                                  Number(item.quantity ?? 1)
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Order summary */}
                  <div className="grid grid-cols-1 gap-4 border-t border-gray-100 bg-gray-50 p-5 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Payment Method
                      </p>
                      <p className="mt-1 font-semibold uppercase text-gray-800">
                        {order.paymentMethod || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Total Quantity
                      </p>
                      <p className="mt-1 font-semibold text-gray-800">
                        {order.quantity ?? 0}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Order Total
                      </p>
                      <p className="mt-1 text-2xl font-bold text-green-700">
                        ₹{formatPrice(order.price)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
