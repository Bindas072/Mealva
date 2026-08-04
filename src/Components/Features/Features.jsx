import {Store,Truck,ShoppingCart,CreditCard,BarChart3,Bell, Package} from "lucide-react"
import { useState } from "react";

export default function Features() {
  const [showMore,setShowMore] = useState({})
    const features=[
        {
          icon: <ShoppingCart size={28}/>,
          title: "Easy Ordering",
          description: "Browse the digital menu, select your favorite meals, customize items according to your preferences, and place orders in just a few clicks. The system makes ordering fast, simple, and convenient for every customer.",
    },
    {
      icon: <Truck size={28} />,
      title: "Order Tracking",
      description: "Track your order status in real-time from preparation to delivery. Customers receive live updates, estimated completion times, and notifications so they always know when their food will be ready.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Smart Analytics",
      description: "View detailed sales reports, customer trends, popular menu items, and business insights. Analytics help canteen owners make better decisions and improve overall operational efficiency."
    },
    {
      icon: <Package size={28} />,
      title: "Inventory Management",
      description: "Monitor ingredient stock levels, track item availability, receive low-stock alerts, and manage inventory efficiently. This helps prevent shortages and reduces food wastage."
    },
    {
      icon: <Bell size={28} />,
      title: "Smart Notifications",
      description: "Receive instant notifications for new orders, order status changes, special offers, and important announcements. Both customers and staff stay informed at all times."
    },
    {
  icon: <Store size={28} />,
  title: "Offline Counter Ordering",
  description: "Customers can place orders directly at the canteen counter while staff records them digitally. This ensures smooth service for walk-in customers and keeps all orders organized in one system."
},
  ];
  return (
    <div>
    <h1 className='text-green-500 text-center text-shadow-2xs p-5 font-bold '>Features</h1>
    <h3 className=' text-4xl text-black text-center text-shadow-green-900 text-shadow-2xs font-bold'>Everything You Need in One Platfrom</h3>
    <h1 className=' text-black text-center text-shadow-2xs p-4'>Powerfull features to simplify canteen opearions and enhance your experience</h1>
    <section className='bg-white rounded-xl justify-between items-center p-5'>
    <div className='grid grid-cols-2 md:grid-cols-3 gap-12 justify-between '>
        {features.map((item,index) =>
        (
          <div
        key={index}
    className="bg-white  rounded-xl shadow-sm shadow-green-600 p-5 flex  items-start gap-5 hover:shadow-md transition min-w-40 min-h-40">
            
                <div className="bg-green-100 text-green-600 p-3 rounded-lg">{item.icon}</div>
                <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>

                <p className="text-sm text-gray-500 mt-1"><br/>{showMore[index] ? item.description : item.description.slice(0,40) + "..."}</p>
                <button
                  onClick={()=> setShowMore({...showMore,[index]:!showMore[index]})}
                  className="text-green-600 text-sm mt-2 font font-medium hover:text-green-400 hover:underline">
                 {showMore ? "See Less  " : "See More ..."} 
                </button>
        </div>
        </div>
        )
        )}
        </div>
    </section>
    
   </div> 
  )
}
