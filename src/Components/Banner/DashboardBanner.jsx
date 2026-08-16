import Breakfast from "../../assets/FoodBanner/Breakfast.png";
import Lunch from "../../assets/FoodBanner/Lunch.png"
import Dinner from "../../assets/FoodBanner/Dinner.png"
import BannerFood from "../BannerFood/Bannerfood";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
function DashboardBanner() {
    const banners =[Breakfast,Lunch,Dinner]
    const [current,setCurrent] =useState(0);
    const navigate = useNavigate();
    
    function handleClick() {
    navigate('/bannerfood', {
      state: { current }
    });
  }

// useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);


  


return (
  <div className=" w-full h-full rounded-3xl overflow-hidden">
    
    <img
      src={banners[current]}
      alt="Banner"
      className="w-full cursor-pointer object-contain sm:object-cover object-top-left "
      onClick={handleClick}
    />
    
  </div>
);
}

export default DashboardBanner