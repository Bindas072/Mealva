
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

// ==================== BREAKFAST MENU ====================
const Breakfasts = [
  {
    name: "Poha",
    price: 89,
    img: "https://i.pinimg.com/736x/0e/b5/c4/0eb5c4fd85ceac86eb5577a2f7684ed2.jpg",
    ingredients: "Flattened rice, peanuts, curry leaves, mustard seeds, turmeric",
  },
  {
    name: "Upma",
    price: 79,
    img: "https://i.pinimg.com/736x/1d/fc/93/1dfc93c2f3800fe48c0a4977658f3687.jpg",
    ingredients: "Semolina, vegetables, curry leaves, mustard seeds, green chilies",
  },
  {
    name: "Idli Sambar",
    price: 99,
    img: "https://i.pinimg.com/736x/ba/d8/91/bad891a4c5b461bb889a2af953f39253.jpg",
    ingredients: "Rice, urad dal, lentils, vegetables, tamarind, spices",
  },
  {
    name: "Medu Vada",
    price: 109,
    img: "https://i.pinimg.com/736x/80/2f/94/802f94e740a413c5c8612c59264f0b58.jpg",
    ingredients: "Urad dal, black pepper, curry leaves, green chilies, ginger",
  },
  {
    name: "Aloo Paratha with Curd",
    price: 129,
    img: "https://i.pinimg.com/736x/f4/48/17/f4481795503f2a2f72f880e23f2356b5.jpg",
    ingredients: "Wheat flour, potatoes, coriander, green chilies, yogurt",
  },
  {
    name: "Besan Chilla",
    price: 99,
    img: "https://i.pinimg.com/736x/0a/d5/58/0ad5582c08a7d50900f7e018936aa339.jpg",
    ingredients: "Gram flour, onion, tomato, coriander, spices",
  },
  {
    name: "Vegetable Uttapam",
    price: 139,
    img: "https://i.pinimg.com/736x/d2/31/18/d231186480c5334370f7bdc8bcfcdf3a.jpg",
    ingredients: "Rice batter, vegetables, onions, tomatoes, coriander",
  },
  {
    name: "Luchi Tarkari",
    price: 119,
    img: "https://i.pinimg.com/1200x/48/1b/97/481b9787a3146c72145a4917dda66319.jpg",
    ingredients: "Wheat flour, potatoes, tomatoes, spices",
  },
  {
    name: "Bread Butter Toast & Tea",
    price: 69,
    img: "https://i.pinimg.com/736x/67/2c/03/672c03803bfd7372221c6a12f15a5bac.jpg",
    ingredients: "Bread, butter",
  },
  {
    name: "Fruit Yogurt Bowl",
    price: 149,
    img: "https://i.pinimg.com/736x/cf/08/92/cf0892e0e766997cd441f973296c709b.jpg",
    ingredients: "Yogurt, fresh fruits, nuts",
  },
];

// ==================== LUNCH MENU ====================
const Lunchs = [
  {
    name: "Classic Veg Thali",
    price: 249,
    img: "https://i.pinimg.com/736x/a9/fe/84/a9fe8403dfcccdcbf43282968e522e67.jpg",
    ingredients: "Roti, rice, dal, mixed vegetable curry, salad, pickle",
  },
  {
    name: "Paneer Deluxe Thali",
    price: 299,
    img: "https://i.pinimg.com/736x/25/60/75/256075855766e5ad654d66cbac20c820.jpg",
    ingredients: "Paneer curry, roti, jeera rice, dal, salad, dessert",
  },
  {
    name: "North Indian Thali",
    price: 279,
    img: "https://i.pinimg.com/736x/cb/b4/e9/cbb4e9fb5f5d5b0cd7383b7f92543d31.jpg",
    ingredients: "Butter roti, dal makhani, paneer curry, rice, salad",
  },
  {
    name: "Rajasthani Thali",
    price: 329,
    img: "https://i.pinimg.com/736x/eb/65/3d/eb653dde109e3dcca6fd263d45d42e1c.jpg",
    ingredients: "Dal, baati, churma, seasonal vegetables, rice",
  },
  {
    name: "Gujarati Thali",
    price: 289,
    img: "https://i.pinimg.com/736x/0c/9c/d9/0c9cd9709f869102e5af580a77d4ffac.jpg",
    ingredients: "Roti, dal, kadhi, vegetables, rice, farsan",
  },
  {
    name: "Bengali Veg Thali",
    price: 269,
    img: "https://i.pinimg.com/1200x/fa/25/d6/fa25d617553db1d94d78d545a0236df3.jpg",
    ingredients: "Rice, dal, seasonal vegetables, vegetable curry, chutney",
  },
  {
    name: "South Indian Meals",
    price: 239,
    img: "https://i.pinimg.com/736x/89/c6/33/89c63307ba7c739c82da1f4ea4e94a50.jpg",
    ingredients: "Rice, sambar, rasam, vegetable poriyal, curd",
  },
  {
    name: "Mini Veg Thali",
    price: 199,
    img: "https://i.pinimg.com/736x/30/13/32/301332e0a5bea49b228b201aaa158612.jpg",
    ingredients: "Roti, rice, dal, one vegetable curry, salad",
  },
  {
    name: "Special Lunch Thali",
    price: 319,
    img: "https://i.pinimg.com/736x/53/43/97/534397daa7e7644ce809651013a40b23.jpg",
    ingredients: "Roti, rice, dal, paneer curry, vegetables, dessert",
  },
  {
    name: "Family Veg Thali",
    price: 399,
    img: "https://i.pinimg.com/736x/a2/c5/35/a2c53523e357f0a505a39ff685270600.jpg",
    ingredients: "Assorted rotis, rice, dal, paneer curry, vegetables",
  },
];

// ==================== DINNER MENU ====================
const Dinners = [
  {
    name: "Paneer Lababdar",
    price: 289,
    img: "https://i.pinimg.com/736x/f0/9e/e0/f09ee02acc30b1eedea6b0b6aec03fe9.jpg",
    ingredients: "Paneer, tomato gravy, cream, spices",
  },
  {
    name: "Malai Kofta",
    price: 269,
    img: "https://i.pinimg.com/736x/5b/8a/13/5b8a1309dc97630578934b4b2c3589aa.jpg",
    ingredients: "Potato, paneer, kofta, creamy tomato gravy",
  },
  {
    name: "Veg Handi",
    price: 249,
    img: "https://i.pinimg.com/736x/fd/24/fd/fd24fd46ea13dc82aeee390262cf0105.jpg",
    ingredients: "Mixed vegetables, tomato gravy, spices",
  },
  {
    name: "Butter Roti Combo",
    price: 199,
    img: "https://i.pinimg.com/736x/0f/02/46/0f0246ce19275cd8c6b43b85ae9487a7.jpg",
    ingredients: "Butter roti, vegetable curry",
  },
  {
    name: "Jeera Rice with Dal",
    price: 219,
    img: "https://i.pinimg.com/736x/35/27/4d/35274d2003912cea6478860e74147d39.jpg",
    ingredients: "Rice, cumin, dal, spices",
  },
  {
    name: "Tandoori Thali",
    price: 259,
    img: "https://i.pinimg.com/736x/32/2f/b9/322fb98cd67f648e853f7fbee4a17b97.jpg",
    ingredients: "Tandoori roti, dal, vegetable curry, salad",
  },
  {
    name: "Paneer Bhurji",
    price: 239,
    img: "https://i.pinimg.com/1200x/e7/b8/ab/e7b8abc91758d1ab1c6eb71a381411ea.jpg",
    ingredients: "Paneer, tomatoes, capsicum, coriander, spices",
  },
  {
    name: "Veg Kolhapuri",
    price: 279,
    img: "https://i.pinimg.com/1200x/58/77/a1/5877a1eddd2c8e5149b429304f17c9bd.jpg",
    ingredients: "Mixed vegetables, Kolhapuri masala, spices",
  },
  {
    name: "Dal Tadka with Rice",
    price: 209,
    img: "https://i.pinimg.com/736x/34/00/bf/3400bf42deb3ebd88c4d59927e0d63e8.jpg",
    ingredients: "Yellow dal, cumin, spices, steamed rice",
  },
  {
    name: "Methi Malai Paneer",
    price: 299,
    img: "https://i.pinimg.com/736x/91/83/54/9183548d125555c6e2332c0fa1db0b0c.jpg",
    ingredients: "Paneer, fenugreek leaves, cream, spices",
  },
];

// ==================== MAIN COMPONENT ====================
export default function BannerFood() {
  const location = useLocation();
  const navigate = useNavigate();

  const mealType = location.state?.mealType || "Breakfast";

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  // Select the food list according to the banner
  const foodItems = useMemo(() => {
    switch (mealType) {
      case "Breakfast":
        return Breakfasts;
      case "Lunch":
        return Lunchs;
      case "Dinner":
        return Dinners;
      default:
        return Breakfasts;
    }
  }, [mealType]);

  // Search food by name
  const filteredFoods = foodItems.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add food or increase its quantity
  const handleClick = (food) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.name === food.name
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.name === food.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...food, quantity: 1 }];
    });
  };

  // Increase food quantity
  function handleIncrease(food) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.name === food.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease food quantity
  function handleDecrease(food) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.name === food.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove food completely from cart
  function handleRemove(food) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.name !== food.name)
    );
  }

  // Cart item count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Cart total
  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  // Navigate to the order page
  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Please add food items to your cart first!");
      return;
    }

    navigate("/orderpage", {
      state: { cart },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <Link
            to="/dashboard"
            className="text-sm text-green-700 hover:underline"
          >
            ← Back to Menu
          </Link>

          <h1 className="mt-2 text-7xl font-bold text-gray-800">
            {mealType}
          </h1>

          <p className="mt-2 text-sm text-gray-900">
            Enjoy Your Food
          </p>
        </div>

        <button
          type="button"
          onClick={handleOrder}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700"
        >
          <ShoppingCart size={20} />
          Cart ({cartCount})
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`Search ${mealType.toLowerCase()} food...`}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-500"
        />
      </div>

      {/* FOOD CARDS */}
      {filteredFoods.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No food items found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFoods.map((food) => {
            const quantity =
              cart.find((item) => item.name === food.name)?.quantity || 0;

            return (
              <div
                key={food.name}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
              >
                {/* FOOD IMAGE */}
                <img
                  src={food.img}
                  alt={food.name}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-gray-800">
                      {food.name}
                    </h2>

                    <span className="whitespace-nowrap font-bold text-green-700">
                      ₹{food.price}
                    </span>
                  </div>

                  {food.ingredients && (
                    <p className="mt-2 text-sm text-gray-500">
                      {food.ingredients}
                    </p>
                  )}

                  {/* ORDER AND CART BUTTONS */}
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => handleClick(food)}
                      className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                    >
                      Order
                    </button>
                  ) : (
                    <div className="mt-4 flex items-center gap-2">
                      {/* DECREASE QUANTITY */}
                      <button
                        type="button"
                        onClick={() => handleDecrease(food)}
                        className="h-9 w-9 shrink-0 rounded-lg bg-green-600 text-xl font-bold text-white hover:bg-green-700"
                        aria-label={`Decrease ${food.name} quantity`}
                      >
                        −
                      </button>

                      {/* ADDED TO CART / REMOVE ON HOVER */}
                      <button
                        type="button"
                        onClick={() => handleRemove(food)}
                        className="group min-w-0 flex-1 rounded-lg border border-green-600 px-2 py-2 font-medium text-green-700 transition-colors duration-200 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                      >
                        <span className="group-hover:hidden">
                          ✓ Added to Cart ({quantity})
                        </span>

                        <span className="hidden group-hover:inline">
                          Remove
                        </span>
                      </button>

                      {/* INCREASE QUANTITY */}
                      <button
                        type="button"
                        onClick={() => handleIncrease(food)}
                        className="h-9 w-9 shrink-0 rounded-lg bg-green-600 text-xl font-bold text-white hover:bg-green-700"
                        aria-label={`Increase ${food.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FIXED CART SUMMARY */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-20 mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-lg">
          <div>
            <p className="font-semibold text-gray-800">
              {cartCount} item(s)
            </p>

            <p className="text-sm text-gray-500">
              Total: ₹{cartTotal}
            </p>
          </div>

          <button
            type="button"
            onClick={handleOrder}
            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            Order Now
          </button>
        </div>
      )}
    </div>
  );
}