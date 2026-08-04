import { EyeOff ,Eye} from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [Showpassword,setShowPassword]= useState(false)
    const [errors, setErrors] = useState({})
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    const validateField =(fieldName,Value)=>{
          setErrors((prevErrors)=>{
            const newErrors ={...prevErrors}
          
        if(fieldName === "UserName"){
          if (!Value||!Value.trim()){
            newErrors.UserName="UserName is required"
          }
           else {
        delete newErrors.UserName;
        }
      }
        if (fieldName === "Password"){
          if (!Value||!Value.trim()){
            newErrors.Password="Password is required"
          } else {
        delete newErrors.Password;
        }
      }
       return newErrors 

    })}
  

    const HandleSubmit = async(e)=>{
      e.preventDefault();
      console.log("HandleSubmit called");
      validateField("UserName",UserName);
      validateField("Password",Password)
      if (!UserName.trim() || !Password.trim()) {
    return;
}
    

    try{
      console.log("Sending request...");
        const response = await fetch("http://localhost:5000/login",
         {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                  
                  username: UserName,
                  password:Password
                }),
                
              });
              console.log("hello")
              // console.log(response.status);

              // const text = await response.text();
              // console.log(text);
        const data = await response.json();
        console.log(data);

      
      if (response.ok)
      {
        alert("Login Sucessfull");
        console.log(response.status);
        console.log(data);
        
        console.log("Before navigate:", UserName);

        navigate("/dashboard",{state:{UserName:UserName}});
      }
      else {
            alert(data.message);
        }
    }
    catch(error){
      console.log(error)
    }
  }
    
      
  return (
    <div style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1974&auto=format&fit=crop')",
      }} 
      className='items-center min-h-screen bg-cover bg-center flex  px-4 md:px-12 '>
        <div className=" flex absolute  inset-0 bg-black/40"></div>
        <div className='flex relative z-10 w-full max-w-7xl mx-auto items-center justify-between gap-10'>
            <div className='hidden lg:flex w-1/2 flex-col justify-start py- 10 px-10 text-white '>
                <h1 className='text-7xl font-bold leading-tight'>Mealva</h1>
                <div className="w-24 h-1 bg-green-500 my-6 rounded-full"></div>
                 <p className="text-2xl text-gray-100 max-w-lg">
                    Smart Food Ordering for Modern Campuses
                </p>
                 <p className="mt-6 text-lg text-gray-200 max-w-xl leading-relaxed">
                    Order your favorite meals in seconds,
                    skip long queues, and enjoy a seamless
                    dining experience.
          </p>
            </div>

            
    <div className='relative z-10 w-full max-w-2xl  '>
        <div className='backdrop-blur-lg bg-white border border-white/20 rounded-3xl p-8 pr-12 shadow-2xl shadow-green-700'>
        <h1 className='text-4xl font-bold text-black'>Welcome Back</h1>
        <p className="text-black mb-8 pt-4"> Sign in to continue to Mealva</p>
        
        <form onSubmit={HandleSubmit}>
            <h1 className='text-md text-black pb-4 pl-2'>UserName</h1>
            <input
            type="text"
            value={UserName}
            placeholder="UserName"
            className='mb-4 bg-white/20 w-full border-black rounded pb-2 p-2 pl-6 border placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-400'
             onChange={(e)=>{
                        setUserName(e.target.value);
                        validateField("UserName", e.target.value);
            }}
            />
            {errors.UserName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.UserName}
              </p>
            )}
            <h1 className='text-md text-black pl-2'>Password</h1>
            <div className="relative">
            <input
            type={Showpassword ? "text" : "password"}
            value={Password}
            placeholder="Password"
            className='bg-white/20 w-full rounded mt-4 p-2 pl-6 pr-10 border border-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-400'
            onChange={(e)=>{
                        setPassword(e.target.value);
                        validateField("Password", e.target.value);
            }}
            />
            {errors.Password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.Password}
              </p>
            )}
            <button
                type="button"
                onClick={() => setShowPassword(!Showpassword)}
                className="text-black absolute right-4 top-4 pt-2">
                {Showpassword? <EyeOff/> : <Eye/>}</button>
            </div>
             <div className="flex justify-between text-sm text-gray-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#" className="hover:text-green-400 p-4">
                  Forgot Password?
                </a>
              </div>

              <button type='Submit'
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 text-white font-semibold
                "
              >
                Login
              </button>

              <p className="text-center text-gray-500 pt-4">
                Don't have an account?
                <span className="text-green-400 ml-2 cursor-pointer font-semibold"
                onClick={() => navigate("/signup")}>
                  Sign Up
                </span>
              </p>
        </form>
        </div>
    </div>
    </div>
    </div>
  )
}

