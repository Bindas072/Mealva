import React from 'react'
import { useState,useEffect } from 'react';
import FlotingImg from '../cards/FlotingImg';
import { FeatureCards } from '../cards/FeatureCards';

export default function Home() {
  const images = [
    
    "https://images.pexels.com/photos/7592526/pexels-photo-7592526.jpeg",
    "https://images.pexels.com/photos/28976231/pexels-photo-28976231.jpeg",
    "https://images.pexels.com/photos/4329/drink-lunch-glass-blur.jpg"
    
  ]
  const [currentImg,setCurrentImg]=useState(0)

  useEffect(()=>{
    const interval = setInterval(() => {
      setCurrentImg(prev =>(prev +1) % images.length);
      
    }, 3000);
    return () => clearInterval(interval);
  },[])

  return (
    <div>
    <div  className='min-h-screen items-stretch px-6 py-4 flex justify-between bg-gray-200'>
              
      
      <div className='relative w-1/2 h-1/2 ' >

        <span className='bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm'>
          ⭐ Order Fast. Eat Fresh. Save Time.</span>
        
        <h1 className="text-6xl font-bold mt-6 leading-tight">
          A Smarter Way to
              <br />
             Order, Serve & Enjoy 
             <span className="text-green-600"> Food</span>
             </h1>

        <p className="text-gray-500 mt-6 text-lg">
              Order your favorite meals in seconds and 
              enjoy fast, fresh food without the wait.
        </p> 

        {/* //buttons */}
        <div className="flex gap-4 mt-8">
              <button className="bg-green-600 mt-8 text-white px-6 py-3 border-2 rounded-xl hover:text-black hover:border-green-500 hover:bg-white">
                Order Now
              </button>

              <button className=" px-6 py-3  mt-8 rounded-xl bg-white border hover:text-black hover:border-white hover:bg-green-500">
                View Menu
              </button>
        </div>

        {/* customers */}
        <div className="flex -space-x-3 items-center mt-6">
                <img
                  src="data:image/jpeg;base64,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"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://img.magnific.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740&q=80"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="data:image/jpeg;base64,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"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <p className='px-8 text-green-800 font-semibold'>
                  Trusted by 500+ Customers
                </p>
              
        </div>             
              </div>
      {/* img */}
      <div className='flex w-1/2 relative h-150'>
          <img 
          src={images[currentImg]}
          className=' w-full h-full object-cover transition-opacity duration-1000'
          alt= 'background'
          /> 
        <FlotingImg/>
        
      
      </div> 
       {/* img end */}
       
      {/* online order,qr,cashless payment, fresh food*/}
     

    </div> 
    
      <FeatureCards/>
    
    </div>
    
  )
}