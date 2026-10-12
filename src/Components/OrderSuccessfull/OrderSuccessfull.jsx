
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";

export default function OrderSucessfull() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the saved order from Orderpage.jsx
  const order = location.state?.order?.order || location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-5">
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <h2 className="text-xl font-bold text-gray-800">
            Order details not found
          </h2>

          <p className="mt-2 text-gray-500">
            Please check your orders or return to the dashboard.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 rounded-xl bg-green-600 px-6 py-3 text-white"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Data encoded into the QR code
  const qrData = JSON.stringify({
    orderId: order.id,
    amount: order.price,
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus,
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-6 text-center shadow-lg sm:p-8">

        {/* Success icon */}
        <div className="mb-4 flex justify-center">
          <CheckCircle size={70} className="text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Order Successful!
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for ordering with Mealva.
          Your order has been saved successfully.
        </p>

        {/* Order ID */}
        <div className="mt-6 rounded-xl bg-green-50 p-4">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="mt-1 break-all font-semibold text-green-700">
            {order.id}
          </p>
        </div>

        {/* QR code */}
        <div className="mt-7">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Your Order QR Code
          </h2>

          <div className="flex justify-center">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <QRCodeSVG
                value={qrData}
                size={200}
                level="H"
                includeMargin
              />
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Scan to read the encoded order information.
          </p>
        </div>

        {/* Order details */}
        <div className="mt-7 space-y-3 rounded-xl bg-gray-50 p-5 text-left">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-bold text-gray-800">
              ₹{Number(order.price).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium capitalize text-gray-800">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Payment Status</span>
            <span className="font-medium text-orange-600">
              {order.paymentStatus}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Order Status</span>
            <span className="font-medium text-green-700">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Navigation buttons */}
        {/* <button
          onClick={() => navigate("/myorders")}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          <ShoppingBag size={20} />
          View My Orders
        </button> */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-green-700 bg-green-500"
        >
          <Home size={20} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}


