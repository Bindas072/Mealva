import React from 'react'

function FlotingImg() {
  return (
    <div className='flex-col flex absolute rounded-2xl bg-white shadow-xl  p-4 right-10 bottom-5 items-center'>
          <p className='font-medium text-center mb-2'>🔥 Today's Spacial</p>
          <div className='flex'>
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="flootingImg"
            className="w-full h-40 object-cover rounded-xl"
          />
          <h3 className="font-bold mt-3 px-4 py-4"> Veg Thali 
           <br/>
            <span className='text-green-600 font-semibold'>₹60</span>
          </h3>
        </div> 

        <button className='mt-4 bg-green-600 w-full text-white hover:bg-green-700 rounded-lg  py-2'>Order Now</button> 
      
      </div> 
  )
}

export default FlotingImg