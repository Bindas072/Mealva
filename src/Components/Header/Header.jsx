import React from 'react'
import {Link,NavLink} from 'react-router-dom'

function Header() {
    const listitems =[
        {   
            name:"Home",
            link:"/"

        },
        {   
            name:"How it Works",
            link:"/working"

        },
        {   
            name:"Features",
            link:"/features"

        },{   
            name:"About",
            link:"/about"

        },
        {   
            name:"Contact",
            link:"/contact"

        },
    ]
         
  return (
    <header className="shadow-md sticky top-0  bg-white z-50">
       <div className='max-w-7xl mx-auto flex-row flex items-center px-6 py-4'>
        <Link to="/" 
                    className="flex items-center text-3xl font-bold text-green-700 mr-12">
                      Mealva   
                        
                    </Link>
    
    <div className=" hidden lg:flex    font-medium items-center lg:gap-30 ">
        
        {listitems.map((item)=>(
            <NavLink
        key={item.name}
        to={item.link}
        className={({ isActive }) =>
            isActive ? "text-green-700" : "text-black"
        }
    >
        {item.name}
    </NavLink>
        ))}
    </div>
    <div className="flex gap-4 items-center  ml-auto">
                        <button className=" bg-white text-black  px-4 py-2 rounded-lg hover:bg-gray-100 border-white ">
                            <Link
                            to="login" className="px-5 py-2 hover:text-green-700">
                            Login
                        </Link>

                        </button>
                        
                        <Link
                            to="signup"
                            className=" bg-green-500 text-white  px-4 py-2 rounded-2xl border-2 border-white hover:bg-white hover:text-black hover:border-green-700"
                        >
                            Sign Up
                        </Link>
                        </div>
    </div>
   
    
        </header>
        
  )
}

export default Header