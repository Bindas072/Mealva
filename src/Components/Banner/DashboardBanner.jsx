
import Breakfast from "../../assets/FoodBanner/Breakfast.png";
import Lunch from "../../assets/FoodBanner/Lunch.png";
import Dinner from "../../assets/FoodBanner/Dinner.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DashboardBanner() {
  const banners = [
    { image: Breakfast, type: "Breakfast" },
    { image: Lunch, type: "Lunch" },
    { image: Dinner, type: "Dinner" },
  ];

  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Automatically shuffle through the 3 banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function handleClick() {
    navigate("/bannerfood", {
      state: {
        mealType: banners[current].type,
      },
    });
  }

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      {/* Banner Image */}
      <img
        src={banners[current].image}
        alt={`${banners[current].type} Banner`}
        className="w-full h-full cursor-pointer object-contain sm:object-cover object-top-left"
        onClick={handleClick}
      />

      {/* Three dots on the image */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-2 z-10">
        {banners.map((banner, index) => (
          <button
            key={banner.type}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show ${banner.type} banner`}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? "w-5 h-2 bg-green-600"
                : "w-2 h-2 bg-white border border-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardBanner;

