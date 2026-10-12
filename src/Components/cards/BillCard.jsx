import { ReceiptText, LoaderCircle } from "lucide-react";

function BillCard({
  itemCount,
  subtotal,
  deliveryFee = 0,
  tax = 0,
  grandTotal,
  onConfirmOrder,
  loading = false,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm lg:sticky lg:top-6">
      <div className="flex items-center gap-2 mb-5">
        <ReceiptText className="text-green-700" size={23} />
        <h2 className="text-xl font-bold text-gray-800">
          Bill Summary
        </h2>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Total items</span>
          <span>{itemCount}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Delivery fee</span>
          <span className="text-green-700">
            {deliveryFee === 0
              ? "FREE"
              : `₹${deliveryFee.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-dashed pt-4 flex justify-between gap-3">
          <span className="font-bold text-gray-800">
            Grand Total
          </span>
          <span className="text-xl font-bold text-green-700">
            ₹{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirmOrder}
        disabled={itemCount === 0 || loading}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
      >
        {loading && (
          <LoaderCircle className="animate-spin" size={20} />
        )}

        {loading ? "Placing Order..." : `Confirm Order ₹${grandTotal.toFixed(2)}`}
      </button>

      <p className="text-xs text-center text-gray-400 mt-3">
        {loading
          ? "Please wait while your order is being saved."
          : "Please check your order before confirming."}
      </p>
    </div>
  );
}

export default BillCard;