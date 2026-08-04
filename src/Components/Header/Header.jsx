import React from 'react'
import {Link,NavLink} from 'react-router-dom'

function Header() {
  return (
    <header className="shadow-md sticky top-0 bg-white z-50">
            <nav className="max-w-7xl mx-auto  flex items-center px-6 py-4">
        
                    <Link to="/" 
                    className="flex items-center text-3xl font-bold text-green-700 mr-12">
                      Mealva   
                        
                    </Link>

 
 
                     <ul className=" hidden md:flex items-center gap-20 font-medium ">
                            <li>
                                <NavLink
                                to = "/"
                                    className={({isActive}) =>
                                    `block py-2 px-3 border-b-2 transition-all duration-300 
                                    ${isActive? "text-green-700":"text-black-700"} 
                                    border-b border-gray-100 hover:bg-gray-50 
                                    lg:hover:bg-transparent
                                    lg:border-0 hover:text-green-700 lg:p-0`
                                    
                                    }
                                >
                                    Home
                                </NavLink>

                            </li>

                            <li>
                                <NavLink 
                                to = "/about"
                                    className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 
                                    ${isActive? "text-green-700":"text-black-700"} 
                                    border-b border-gray-100 hover:bg-gray-50 
                                    lg:hover:bg-transparent
                                    lg:border-0 hover:text-green-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>

                            </li>
                            <li>
                                <NavLink 
                                to = "/features"
                                    className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 
                                    ${isActive? "text-green-700":"text-black-700"} 
                                    border-b border-gray-100 hover:bg-gray-50 
                                    lg:hover:bg-transparent
                                    lg:border-0 hover:text-green-700 lg:p-0`
                                    }
                                >
                                    Features
                                </NavLink>

                            </li>
                             <li>
                                <NavLink 
                                to = "/menu"
                                    className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 
                                    ${isActive? "text-green-700":"text-black-700"} 
                                    border-b border-gray-100 hover:bg-gray-50 
                                    lg:hover:bg-transparent
                                    lg:border-0 hover:text-green-700 lg:p-0`
                                    }
                                >
                                    Menu
                                </NavLink>

                            </li>
                            <li>
                                <NavLink 
                                to = "/working"
                                    className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 
                                    ${isActive? "text-green-700":"text-black-700"} 
                                    border-b border-gray-100 hover:bg-gray-50 
                                    lg:hover:bg-transparent
                                    lg:border-0 hover:text-green-700 lg:p-0`
                                    }
                                >
                                    How it Works
                                </NavLink>

                            </li>
                            <li>
                                <NavLink 
                                to = "/contact"
                                    className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 
                                    ${isActive? "text-green-700":"text-black-700"} 
                                    border-b border-gray-100 hover:bg-gray-50 
                                    lg:hover:bg-transparent
                                    lg:border-0 hover:text-green-700 lg:p-0`
                                    
                                    }
                                >
                                    Contact
                                </NavLink>

                            </li>
                            
                        </ul>
                   
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
               </nav>     
        </header>
  )
}

export default Header