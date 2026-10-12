import Pizza from "../../assets/Top10/Pizza.jpeg";
import Burger from "../../assets/Top10/Burger.jpeg"
import Pasta from "../../assets/Top10/Pasta.jpeg";
import Sandwitch from  "../../assets/Top10/Sandwitch.jpeg";
import Momo from "../../assets/Top10/Momo.jpeg";
import PaneerTikka from "../../assets/Top10/PaneerTikka.jpeg";
import Noodles from "../../assets/Top10/Noodles.jpeg";
import FriedRice from "../../assets/Top10/FriedRice.jpeg";
import SpringRolls from "../../assets/Top10/SpringRolls.jpeg";
import Nachos from "../../assets/Top10/Nachos.jpeg";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
export default function FoodMenu() {
  const [cart,setCart]=useState([])
  const items = [
  { name: "Veg Pizza", price: 299, img: Pizza },
  { name: "Paneer Burger", price: 199, img: Burger },
  { name: "Pasta", price: 249, img: Pasta },
  { name: "Sandwich", price: 149, img: Sandwitch },
  { name: "Momos", price: 179, img: Momo },
  { name: "Paneer Tikka", price: 279, img: PaneerTikka },
  { name: "Hakka Noodles", price: 229, img: Noodles },
  { name: "Veg Fried Rice", price: 219, img: FriedRice },
  { name: "Spring Rolls", price: 189, img: SpringRolls },
  { name: "Cheese Nachos", price: 209, img: Nachos },
];
  const navigate = useNavigate();
  function HandleClick(food){
    const selectedFood={
      ...food,
      quantity:1
    };
     setCart([selectedFood]);
      navigate("/orderpage", {
      state: {
        cart: [selectedFood],
      }
    });
  }

  return (
    <div className='overflow-x-auto whitespace-nowrap scrollbar-hide'>
      <div className='flex gap-4 w-max pb-2'>
        {items.map((item, index) => (
          <div
            key={index}
            className='w-64 flex-shrink-0 bg-white rounded-3xl shadow-md p-4'
          >
            <img
              src={item.img}
              alt={item.name}
              className='w-full h-40 object-cover rounded-2xl'
            />
            <div className="flex justify-between items-center">
            <h2 className='text-lg font-semibold mt-3'>{item.name}</h2>
            <p className='text-gray-600 items-end mt-4 justify-end'>{item.price}</p>
            </div>
            <button className="hover:bg-green-200 hover:border-black hover:border-2 bg-green-500 p-2 pl-4 pr-4 rounded items-center justify-center ml-10 mt-1"
            onClick={()=>HandleClick(item)}>Order Now</button>
            
            
          </div>
        ))}
      </div>
    </div>
  );
}