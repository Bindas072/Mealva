
import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

function OrderFoodsCard({
  cart = [],
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Your Food Items
      </h2>

      {cart.length === 0 ? (
        <p className="py-6 text-center text-gray-500">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={item.id ?? item.name ?? index}
              className="flex items-center gap-4 rounded-xl border p-3"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  ₹{Number(item.price).toFixed(2)}
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onDecrease(index)}
                    disabled={item.quantity <= 1}
                    className="rounded-md border p-1 disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => onIncrease(index)}
                    className="rounded-md border p-1"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <p className="font-semibold text-gray-800">
                  ₹{(Number(item.price) * item.quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderFoodsCard;

