import React from 'react'

export default function Contact() {
  return (
    <div>
        <h3 className='text-4xl text-green-600 font-bold  text-shadow-green-600 text-center p-5'>Contact Us</h3>
        <h2 className='text-4xl  text-gray-600 p-8 pb-4 font-bold'>Welcome to Mealva</h2>
        <p className='p-5 pl-10 leading-relaxed font-serif bg-white'>
            We'd love to hear from you! Whether you have questions, feedback, 
            suggestions, or need assistance with your 
            orders, our team is here to help.
            Our goal is to provide the best possible 
            experience for both customers and canteen 
            operators. Feel free to reach out to us through 
            any of the contact methods below.</p>
        <h3 className='text-2xl text-gray-700 font-bold pl-8 pb-2'>Contact Information</h3>
        <div  className='pl-8 font-serif'>
        <h2 className=' text-md pb-2 font-semibold'>📧 Email</h2>
        <p className='pb-2 font-medium'>support@mealva.com</p>
        </div>
        
        <div  className='pl-8 '>
        <h2 className=' font-serif text-md pb-2 font-semibold'>📞 Phone</h2>
        <p className='pl-5 pb-2'>+91 944328545</p>
        </div>
        <div  className=' '>
        <h2 className='pl-5 font-serif text-md pb-2 font-semibold'>📍 Address</h2>
        <p className='pl-12 pb-2 font-medium font-serif'>Mealva <br/>Diamond Harbour, West Bengal, India</p>

        </div>
        
        <h1 className='text-2xl text-center p-5 font-serif text-green-700 font-bold '>We are available 24x7 Hours For you</h1> 

          
    </div>
  )
}
