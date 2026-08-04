import React from 'react'

function About() {
  return (
    <div className='bg-white '>
        <h3 className='text-4xl text-green-600 font-bold  text-shadow-green-600 text-center p-5'>About Us</h3>
        <h2 className='text-4xl  text-gray-600 p-8 font-semibold'>Welcome to Mealva</h2>
        <p className='p-5 leading-relaxed font-serif bg-white'>Mealva is a modern online canteen management system
            designed to make food ordering simple, fast, and convenient.
            We connect customers and canteens through a digital platform 
            that eliminates long waiting lines and improves the overall dining experience.
            Whether you're a student, employee, or visitor, Mealva allows 
            you to browse menus, place orders, and make payments with just a few clicks. 
            Our platform helps canteen staff manage orders efficiently, reduce errors, 
            and serve customers faster.</p>
            <h2 className='text-2xl text-gray-700 font-bold p-8'>What We Do</h2>
            <ul className='list-disc pl-10 space-y-2 font-serif text-md pb-5'>
                <li >Provide a digital menu for easy food browsing.</li>
                <li>Help canteens manage incoming orders efficiently.</li>
                <li>Enable quick and hassle-free online ordering.</li>
                <li>Support secure and convenient payment methods.</li>
                <li>Reduce waiting time and improve customer satisfaction.</li>
            </ul>
            <h2 className='text-2xl text-gray-700 font-bold p-5'>Our Mission</h2>
            <h3 className='text-lg pl-5 font-serif bg-white'>To simplify food ordering and create a seamless dining experience 
                through smart technology.</h3>

            <h2 className='text-2xl text-gray-700 font-bold p-5'>Our Vision</h2>
            <h3 className='pb-18 text-lg pl-5 font-serif bg-white'>To transform traditional canteens into efficient, technology-driven food service systems that benefit both 
                customers and staff.</h3>
    </div>
  )
}

export default About