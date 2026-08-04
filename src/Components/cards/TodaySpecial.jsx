import React from 'react'

function Card({title,price,image}) {
  return (
     <div className='flex-col flex absolute rounded-2xl bg-white shadow-xl  p-4 right-10 bottom-5 items-center'>
          <p className='font-medium text-center mb-2'> Breakfast</p>
          <div className='flex'>
         
          <h3 className="font-bold mt-3 px-4 py-4"> Veg Thali 
           <br/>
            <span className='text-green-600 font-semibold'>₹60</span>
          </h3>
        </div> 

        <button className='mt-4 bg-green-600 w-full text-white hover:bg-green-700 rounded-lg  py-2'>Order Now</button> 
      
      </div> 
  )
}

export default Card