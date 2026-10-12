import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import OrderFoodsCard from "../cards/OrderFoodsCard";
import PaymentCard from "../cards/PaymentCard";
import BillCard from "../cards/BillCard";

export default function Orderpage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get cart items from the previous page
  const [cart, setCart] = useState(() =>
    (location.state?.cart || []).map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }))
  );

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  // Delivery fee
  const deliveryFee = cart.length > 0 ? 30 : 0;

  // Calculate tax (5%)
  const tax = Math.round(subtotal * 0.05 * 100) / 100;

  // Final total
  const grandTotal = subtotal + deliveryFee + tax;

  // Total number of food items
  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Increase food quantity
  function handleIncrease(index) {
    setCart((previousCart) =>
      previousCart.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease food quantity
  function handleDecrease(index) {
    setCart((previousCart) =>
      previousCart.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  }

  // Remove food from cart
  function handleRemove(index) {
    setCart((previousCart) =>
      previousCart.filter((_, i) => i !== index)
    );
  }

  // Confirm order
  async function handleConfirmOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add food items.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          orders: cart,
          total: grandTotal,
          paymentMethod,
          quantity: itemCount
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order.");
      }

      alert("Order placed successfully!");

      // Clear the cart after a successful response
      setCart([]);

      // Change this route if your app uses another order-success path
      navigate("/ordersuccess", {
        state: { order: data.order },
      });
    } catch (error) {
      console.error("Order submission error:", error);
      alert(error.message || "Something went wrong. Please try again.");
      // navigate("/login")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Complete Your Order
          </h1>
          <p className="mt-2 text-gray-500">
            Review your food items and select a payment method.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some delicious food before placing your order.
            </p>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-5 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {/* Left side: food list and payment */}
            <div className="space-y-6 lg:col-span-2">
              <OrderFoodsCard
                cart={cart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />

              <PaymentCard
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            {/* Right side: bill */}
            <div>
              <BillCard
                  itemCount={itemCount}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  tax={tax}
                  grandTotal={grandTotal}
                  onConfirmOrder={handleConfirmOrder}
                  loading={loading}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



