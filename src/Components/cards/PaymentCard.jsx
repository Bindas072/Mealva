
import { CreditCard, Wallet } from "lucide-react";

const paymentOptions = [
  {
    value: "upi",
    title: "UPI",
    description: "Pay using a UPI app",
  },
  {
    value: "card",
    title: "Debit / Credit Card",
    description: "Pay using your bank card",
  },
  {
    value: "netbanking",
    title: "Net Banking",
    description: "Pay through your bank",
  },
  {
    value: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
  },
];

function PaymentCard({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Payment Method
      </h2>

      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
              paymentMethod === option.value
                ? "border-green-600 bg-green-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.value}
              checked={paymentMethod === option.value}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-green-600"
            />

            {option.value === "upi" || option.value === "cod" ? (
              <Wallet className="text-green-700" size={22} />
            ) : (
              <CreditCard className="text-green-700" size={22} />
            )}

            <div>
              <p className="font-semibold text-gray-800">
                {option.title}
              </p>
              <p className="text-sm text-gray-500">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PaymentCard;

