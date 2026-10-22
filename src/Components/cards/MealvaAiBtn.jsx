import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MealvaAiBtn() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/mealvaAi")}
      className=" fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-700 px-5 py-3 text-white shadow-lg transition-all duration-200 hover:bg-green-800 hover:scale-105"
    >
      <Leaf size={22} />
      <span>Mealva AI</span>
    </button>
  );
}