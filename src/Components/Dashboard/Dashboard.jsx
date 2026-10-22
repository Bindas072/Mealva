import React, { useState } from 'react';
import { Menu ,X,Equal,User,ShoppingBag,Info} from "lucide-react";
// import { Sidebar,Menu, MenuItem } from 'react-pro-sidebar'
import { useLocation,useNavigate } from 'react-router-dom';
import TodaySpecial from '../cards/TodaySpecial';
import CustomerChoice from '../cards/CustomerChoice';
import Card from '../cards/cards';
import DashboardBanner from '../Banner/DashboardBanner';
import FoodMenu from '../cards/FoodMenu';
import Alltimefav from '../cards/AlltimeFav';
import MealvaAiBtn from '../cards/mealvaAiBtn';
export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
  const UserName =location.state?.UserName;
  console.log(UserName)
  const [ShowSidebar,setShowSidebar]=useState(true)
  const [showselected,setshowselected]=useState(true)
  function HandleClick(){
    navigate('/orders')
  }

  
  return (
    <div className='flex w-full min-h-screen  '>
    <div className=''>
      <div 
        className={`bg-black text-white transition-all duration-300 overflow-hidden h-screen fixed z-150 ${
          ShowSidebar ? " translate-x-0 w-64 sm:w-60 md:w-64 " : "-translate-x-full w-64 sm:w-60 md:w-64 "
        }lg:translate-x-0 lg:w-85 lg:h-full`}
      >
        <div className=' flex  items-center justify-between px-0.5 '>
          <h2 className="p-2 text-xl font-semibold">
          Welcome {UserName}
        </h2>
        <button
          className="mr-2 ml-8 lg:hidden p-1 right-6 border text-green-600 rounded hover:bg-white"
          onClick={() => setShowSidebar(false)}>
          <X size={30} />
        </button> 
        </div>

        <ul className="mt-6 space-y-4 text-lg  ">
          <li className='flex hover:bg-green-900  hover:border-2 rounded  px-4 py-3'><button className='pr-4 items-center ' > <User size={20} /></button >Profile</li>
          <li className="flex hover:bg-green-900 hover:border-2 rounded px-4 py-3">
                    <button  type="button"
                      onClick={HandleClick}
                      className="flex items-center gap-4 w-full text-left">
                      <ShoppingBag size={20} />
                      <span>Orders</span>
                    </button></li>
          <li className='flex hover:bg-green-900  hover:border-2 rounded px-4 py-3'><button className='pr-4 items-center '><Info size={20} /></button>About Us</li>
        </ul>
      </div>
      </div>
    {!ShowSidebar && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded border"
          onClick={() => setShowSidebar(true)}
        >
          <Equal size={24} />
        </button>
      )}  

 <div className={" flex-1 transition-all duration-300 p-4 overflow-y-auto lg:ml-85"}>
    <h1 className='justify-center items-center pt-2 lg:text-left text-center  sm:text-xl lg:text-2xl lg:pl-5 lg:font-semibold  font-serif text-green-600 '>"Life tastes better when shared"</h1>    
<div className=" lg:h-[450px] h-450px   rounded-3xl border-2 mt-4"> <DashboardBanner/></div>
   


<div className=" pt-2 px-6 m-2 border  w-full bg-purple-100 rounded">
  <h1 className="text-xl font-bold text-black">
   Top 10 Items 🌿
  </h1>
  <div className='overflow-auto'><FoodMenu/></div>
 
</div>
<div className=" pt-2 px-6 m-2 border rounded bg-purple-100 w-full">
  <h1 className="text-xl font-bold text-black">
    Alltime Favourite ❤️
  </h1>
  <div className='overflow-auto'><Alltimefav/></div>
 
</div>
<div className=" pt-2 px-6 m-2 rounded bg-purple-100 border w-full">
  <h1 className="text-xl font-bold text-black">
    Customers's Choice
  </h1>
  <div className='overflow-auto'><CustomerChoice/></div>
</div>
  <MealvaAiBtn/>
</div> 

</div>
       
     

    
  )
}


