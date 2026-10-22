
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MealvaOrderCards from "../Components/cards/MealvaOrderCards";

export default function MealvaAiMsgStruct({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`min-w-0 max-w-[95%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-green-700 text-white"
            : "bg-white text-gray-800  shadow-2xl shadow-gray-600"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>
        ) : (
          <>
            
            
              <div className="prose prose-sm max-w-none break-words">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content ?? ""}
                </ReactMarkdown>
              </div>
            

            {/* Order cards: render only once */}
            {message.orders?.length > 0 && (
              <MealvaOrderCards orders={message.orders} />
            )}

            {/* Food recommendation cards: render only once */}
            {message.foods?.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-full border border-gray-400 bg-white">
                {message.foods.map((food, index) => {
                  const imageUrl =
                    food.image ??
                    food.imageUrl ??
                    food.img ??
                    food.image_url ??
                    food.foodImage ??
                    food.foodImageUrl;

                  return (
                    <div
                      key={food.id ?? `${food.name}-${index}`}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs shadow-black"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={food.name ?? "Food item"}
                          loading="lazy"
                          onError={(event) => {
                            console.error(
                              "Food image failed to load:",
                              imageUrl
                            );
                            event.currentTarget.style.display = "none";
                          }}
                          className="h-40 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center bg-green-50 text-sm text-gray-500">
                          No image available
                        </div>
                      )}

                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900">
                          {food.name ?? food.foodName ?? "Food item"}
                        </h3>

                        {food.quantity != null && (
                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {food.quantity}
                          </p>
                        )}

                        {food.price != null && (
                          <p className="mt-2 font-semibold text-green-700">
                            ₹{food.price}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
