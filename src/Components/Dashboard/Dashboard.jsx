import React, { useState } from 'react';
import { Menu ,X,Equal,User,ShoppingBag,Info} from "lucide-react";
// import { Sidebar,Menu, MenuItem } from 'react-pro-sidebar'
import { useLocation } from 'react-router-dom';
import TodaySpecial from '../cards/TodaySpecial';
import Breakfast1 from "../../assets/Breakfast1.png";
import Card from '../cards/cards';
export default function Dashboard() {
    const location = useLocation();
  const UserName =location.state?.UserName;
  console.log(UserName)
  const [ShowSidebar,setShowSidebar]=useState(true)
  const [showselected,setshowselected]=useState(true)

  
  return (
          
    <div  className="flex">      
  <div>
    {!ShowSidebar &&
      <button className='text-white m-3  p-1 bg-black border' onClick={() => setShowSidebar(true)}>
        {ShowSidebar ? <X size={24}  /> : <Equal size={24} />}
      </button>}

      <div
        className={`bg-black text-white transition-all duration-300 overflow-hidden  h-screen ${
          ShowSidebar ? "w-64" : "w-0"
        }`}
      >
        <div className='flex items-center justify-between px-2 '>
          <h2 className="p-2 text-xl font-bold">
          Welcome {UserName}
        </h2>
        <button
          className="m-3 p-2 border text-green-600 rounded hover:bg-white"
          onClick={() => setShowSidebar(false)}
        >
          <X size={24} />
        </button>
          
        
        </div>
        <ul className="mt-6 space-y-4 px-4  ">
          <li className='flex hover:bg-green-900  hover:border-2 rounded  px-4 py-3'><button className='pr-4 items-center '> <User size={20} /></button >Profile</li>
          <li className='flex hover:bg-green-900  hover:border-2 rounded px-4 py-3'><button className='pr-4 items-center '> <ShoppingBag size={20} /></button >Orders</li>
          <li className='flex hover:bg-green-900  hover:border-2 rounded px-4 py-3'><button className='pr-4 items-center '><Info size={20} /></button>About Us</li>
        </ul>
      </div>
        </div>
    
<div className='flex-row w-full h-screen '>  
  <h1 className='p-6 pb-2 text-2xl font-serif text-green-600'>Life tastes better when shared</h1> 
<div className=" w-full rounded ">
  {/* <h1 className="text-2xl font-bold text-black pb-4">
    Today's Special
    <br/>
  </h1> */}
  <div ><Card title={"Breakfast"} image={Breakfast1}/></div>
  
</div>
<div className="flex pt-2 px-6 m-2 border w-full bg-purple-100 rounded">
  <h1 className="text-xl font-bold text-black">
   Top 10 Items 🌿
  </h1>
</div>
<div className="flex pt-2 px-6 m-2 border rounded bg-purple-100 w-full">
  <h1 className="text-xl font-bold text-black">
    Alltime Favourite ❤️
  </h1>
</div>
<div className="flex pt-2 px-6 m-2 rounded bg-purple-100 border w-full">
  <h1 className="text-xl font-bold text-black">
    Customers's Choice
  </h1>
</div>
</div> 
</div> 
    
  )
}
