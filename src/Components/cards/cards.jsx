// import React from 'react'

// function Card({title,image}) {
//   return (
//     //  <div className='border rounded-xl items-center'>
//     //   <div style={{
//     //     backgroundImage:
//     //       `url(${image})`,
//     //   }} >
//     //       {/* <p className="text-white text-xl font-semibold  inline-block px-2 py-1 rounded">
//     //       {title}
//     //     </p> */}
          
//     //       <div className='flex'>
         
          
//     //     </div> 

//     //     <button className='mt-4 bg-green-600 w-50 text-white hover:bg-green-700 rounded-lg  py-2'>Order Now</button> 
      
//     //   </div> 
//     //   </div>
//     <div className="border rounded-xl overflow-hidden w-full">
//       <div className=" ">
//       <img
//         src={image}
//         alt={title}
//         className="w-full max-h-min object-cover"
//       />
//       </div>
//     </div>
//   )
// }

// export default Card

import React from "react";
import { Clock, Star } from "lucide-react";

function Card({ title, image }) {
  return (
    <div className=" w-full   shadow-2xl">
      


        
        <div className="w-full rounded-3xl overflow-hidden bg-[#111827] ">
          <img
            src={image}
            alt={title}
            className="w-full object-cover h-[550px] "
          />
        </div>
      </div>
   
  );
}

export default Card;