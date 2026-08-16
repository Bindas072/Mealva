import React, { useState } from "react";
import {
  CreditCard,
  Wallet,
  Banknote,
  CheckCircle,
} from "lucide-react";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-4">

      {/* PAYMENT HEADER */}
      <div className="flex items-center gap-3 mb-4">

        <div className="bg-green-100 p-2 rounded-xl">
          <CreditCard
            size={22}
            className="text-green-600"
          />
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            Payment Method
          </p>

          <p className="text-xs text-gray-500">
            Choose how you want to pay
          </p>
        </div>

      </div>

      {/* PAYMENT OPTIONS */}
      <div className="space-y-3">

        {/* CASH ON DELIVERY */}
        <button
          type="button"
          onClick={() => setPaymentMethod("cod")}
          className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${
            paymentMethod === "cod"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-white hover:border-green-300"
          }`}
        >

          <div className="flex items-center gap-3">

            <Banknote
              size={22}
              className={
                paymentMethod === "cod"
                  ? "text-green-600"
                  : "text-gray-500"
              }
            />

            <div className="text-left">
              <p className="font-semibold text-gray-800">
                Cash on Delivery
              </p>

              <p className="text-xs text-gray-500">
                Pay when your food arrives
              </p>
            </div>

          </div>

          {paymentMethod === "cod" && (
            <CheckCircle
              size={20}
              className="text-green-600"
            />
          )}

        </button>

        {/* ONLINE PAYMENT */}
        <button
          type="button"
          onClick={() => setPaymentMethod("online")}
          className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${
            paymentMethod === "online"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-white hover:border-green-300"
          }`}
        >

          <div className="flex items-center gap-3">

            <Wallet
              size={22}
              className={
                paymentMethod === "online"
                  ? "text-green-600"
                  : "text-gray-500"
              }
            />

            <div className="text-left">
              <p className="font-semibold text-gray-800">
                Online Payment
              </p>

              <p className="text-xs text-gray-500">
                UPI / Card / Net Banking
              </p>
            </div>

          </div>

          {paymentMethod === "online" && (
            <CheckCircle
              size={20}
              className="text-green-600"
            />
          )}

        </button>

      </div>

    </div>
  );
}