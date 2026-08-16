import React from "react";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <CheckCircle
              size={70}
              className="text-green-600"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Order Placed!
        </h1>

        <p className="text-gray-500 mt-3">
          Your order has been successfully placed.
        </p>

        {/* Order status */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-6">

          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
            <ShoppingBag size={20} />
            <span>Order Confirmed</span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Your delicious food is being prepared.
          </p>

        </div>

        {/* Delivery message */}
        <div className="mt-5 text-gray-600">
          <p className="font-semibold">
            Estimated delivery
          </p>

          <p className="text-green-600 font-bold text-lg mt-1">
            30 - 40 minutes
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-7">

          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
          >
            <Home size={19} />
            Back to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full border border-green-600 text-green-600 py-3 rounded-2xl font-semibold hover:bg-green-50 transition"
          >
            Order More Food
          </button>

        </div>

      </div>

    </div>
  );
}