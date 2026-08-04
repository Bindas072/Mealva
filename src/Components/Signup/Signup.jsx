import { User, Mail, GraduationCap, Lock, Eye, EyeOff, Truck, Percent, ShieldCheck, ArrowRight} from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  VerifyOtp  from '../VerifyOTP/VerifyOtp' 
import { useAtom } from "jotai";
import { signupAtom } from '../../Atom/RegisterAtom';

export default function Signup() {
    const [Showpassword,setShowPassword]= useState(false)
    const [Name, setName] = useState("")
    const [Email,setEmail]=useState ("")
    const [UserName,setUserName]=useState("")
    const [Password,setPassword]=useState("")
    const [ConfirmPassword,setConfirmPassword]=useState("")
    const [OTPVerification,setOTPVerification] = useState("")
    const [ShowOTPbox, setShowOTPbox] = useState("")

    const [signupData, setSignupData] = useAtom(signupAtom);

    const [errors, setErrors] = useState({})
    const [AcceptedTerms, setAcceptedTerms] = useState(false)
    const[touched,setTouched]= useState({
      Name : false,
      Email : false,
      Password : false, 
      ConfirmPassword : false,
      UserName : false,
      OTPVerification: false
    })

    const Navigate = useNavigate();
    
  const validateField = (fieldName,Value) => {
    setErrors((prevErrors)=>{
  const newErrors = { ...prevErrors };

  if (fieldName === "Name") {
    if (!Value.trim()) {
      newErrors.Name = "Name is required";
    } 
    else if (Value.length <= 1) {
      newErrors.Name = "Name will be minimum 2 characters";
    } 
    else {
      delete newErrors.Name;
    }
  }

  if (fieldName === "Email") {
    if (!Value.trim()) {
      newErrors.Email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Value)) {
      newErrors.Email = "Invalid Email";
    } else {
      delete newErrors.Email;
    }
  }

  if (fieldName === "UserName") {
    if (!Value.trim()) {
      newErrors.UserName = "Username is required";
    } else {
      delete newErrors.UserName;
    }
  }

  if (fieldName === "Password") {
    if (!Value) {
      newErrors.Password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(Value)
    ) {
      newErrors.Password =
        "Password must contain uppercase, lowercase, number and special character.";
    } else {
      delete newErrors.Password;
    }
  }

  if (fieldName === "ConfirmPassword") {
    if (!Value) {
      newErrors.ConfirmPassword = "Type your password again";
    } else if (Password !== Value) {
      newErrors.ConfirmPassword = "Passwords do not match";
    } else {
      delete newErrors.ConfirmPassword;
    }
  }
  return newErrors;

  
}) } 

    const HandleSubmit = async (e)=>{  e.preventDefault();

       console.log("HandleSubmit called");
        setSignupData({
        Name,
        Email,
        UserName,
        Password,
        OTPVerification,
    });
     validateField("Name", Name);
    validateField("Email", Email);
    validateField("UserName", UserName);
    validateField("Password", Password);
    validateField("ConfirmPassword", ConfirmPassword);
     if (
        !Name ||
        !Email ||
        !UserName ||
        !Password ||
        !ConfirmPassword ||
    !AcceptedTerms
) {
    if (!AcceptedTerms) {
        setErrors((prev) => ({
            ...prev,
            AcceptedTerms: "Please accept the Terms & Conditions."
        }));
    }
     
      alert("Please fill all the fields.");
        return;
    }

      try{
        console.log("Sending request...");
        const response = await fetch("http://localhost:5000/signup",
         {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                  Name:Name,
                  Email: Email,
                  UserName: UserName,
                  Password: Password

                }),
                
              });
              console.log("hello")
        const data = await response.json();
        console.log(data);

      
      if (response.ok)
      {
        alert("OTP sent successfully");
        setShowOTPbox(true)
        Navigate("/verify-otp",{state:{email: Email,},});
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

    <div
    className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 md:px-12 overflow-hidden"> 
         <img
  src="https://images.unsplash.com/photo-1678358082845-db9ccd4efaaa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFubmVyJTIwbWFzYWxhfGVufDB8fDB8fHww"
  alt="Food"
  className="absolute inset-0 w-full h-full object-cover"
/>
        <div className=" flex absolute  inset-0 bg-black/30"></div>
        <div className='flex relative z-10 w-full max-w-7xl mx-auto items-center justify-between  '>
            <div className='hidden lg:flex w-1/2 flex-col justify-start -translate-y-16 text-white '>
                <h1 className='text-6xl font-bold  text-green-600'style={{ fontFamily: "'Dancing Script', cursive" }}>Mealva</h1>
                <div className="w-32 h-1 bg-green-600 my-3 rounded-full "></div>
                 <p className="text-4xl  font-extrabold  leading-tight">
                  create your <br/> <span className=' text-green-600 text-5xl font-extrabold'>Mealva</span>
                  <br/>
                  account
                    </p>
                 <p className="mt-5 text-lg text-gray-300 max-w-md ">
                   Join Mealva and enjoy delicious food with fast 
                   delivery to your campus.
          </p>
          
            </div>

            
    <div className=' z-10 w-full max-w-lg   p-8 md:p-10 '>
        <div className='md:p-10 backdrop-blur-lg bg-white border border-white/20 rounded-3xl p-8 shadow-2xl shadow-green-700'>
        <h1 className='text-4xl font-bold text-black'>Register</h1>
        
        
        <form onSubmit={HandleSubmit}>
          <h1 className='text-md text-black pt-10 pb-4 pl-2'>Your Name</h1>
          
          <div className='relative'>
            <span className='absolute pl-2 mr-2 pt-2 text-gray-500'><User/></span>
              <input
                type="text"
                placeholder="Full Name"
              className='mb-4 bg-white/20 w-full border-black rounded pb-2 p-2  pl-10 border placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-400'
              onChange={(e)=>{
                      setName(e.target.value);

                       if(touched.Name){
                            validateField("Name",e.target.value);
                        }
}} 
               onBlur ={()=> {setTouched({...touched, Name :true})
              validateField("Name",Name); }}
            />
            {touched.Name && errors?.Name &&<p className='text-red-500 text-sm mb-2'> {errors.Name}</p>}
          
          </div>
          
            <h1 className='text-md text-black pb-4  pl-2'>Email</h1>
            <div className='relative'>
              <span className='absolute pl-2 mr-2 pt-2 text-gray-500'><Mail/></span>
            <input
            type="email"
            placeholder="Email Address"
            className='mb-4 bg-white/20 w-full pl-10 border-black rounded pb-2 p-2  border placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-400'
            onChange={(e)=>{
                      setEmail(e.target.value);

                        if(touched.Email){
                          validateField("Email", e.target.value);
                        }
            }}
            onBlur ={()=> {setTouched({...touched, Email:true})

            validateField("Email",Email);
          } }           

            />
            {touched.Email && errors?.Email &&<p className='text-red-500 text-sm mb-2'> {errors.Email}</p>}
          
            </div>
           
            <h1 className='text-md text-black pb-4 pl-2'>UserName</h1>
             <div className='relative'>
              <span className='absolute pl-2 mr-2 pt-2 text-gray-500'><GraduationCap/></span>
            <input
            type="text"
            placeholder="UserName"
            className='mb-4 bg-white/20 w-full border-black rounded pb-2 p-2 pl-10 border placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-400'
             onChange={(e)=>{
                        setUserName(e.target.value);

                            if(touched.UserName){
                                    validateField("UserName", e.target.value);
                            }
            }} 
              onBlur ={()=> {setTouched({...touched, UserName :true}) 
             validateField("UserName",UserName);}}
            />
            {touched.UserName && errors?.UserName &&<p className='text-red-500 text-sm mb-2'> {errors.UserName}</p>}
          
            </div>
            <h1 className='text-md text-black pl-2'> Password</h1>
            <div className="relative">
              <span className='absolute pt-6 pl-2 mr-2  text-gray-500 '><Lock/></span>
            <input
            type={Showpassword ? "text" : "password"}
            placeholder="Password"
            className='bg-white/20 w-full rounded mt-4 p-2 pl-10 pr-10 border border-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-400'
            onChange={(e)=>{
                          setPassword(e.target.value);

                                if(touched.Password){
                                          validateField("Password", e.target.value);
                            }
              }}
             onBlur ={()=> {setTouched({...touched, Password:true})
             validateField("Password",Password);
             }}
            />
            {touched.Password && errors?.Password &&<p className='text-red-500 text-sm mb-2'> {errors.Password}</p>}
          
            <button
                type="button"
                onClick={() => setShowPassword(!Showpassword)}
                className="text-black absolute right-4 top-4 pt-2">
                {Showpassword? <EyeOff/> : <Eye/>}</button>

            </div>
            <h1 className='text-md text-black pt-2 pl-2'> Confirm Password</h1>
            
            <div className="relative">
              <span className='absolute pt-6 pl-2 mr-2  text-gray-500 '><Lock/></span>
            <input
            type={Showpassword ? "text" : "password"}
            placeholder="confirm Password"
            className='bg-white/20 w-full rounded mt-4 p-2 pl-10 pr-10 border border-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-400'
             onChange={(e)=>{
                              setConfirmPassword(e.target.value);

                              if(touched.ConfirmPassword){
                                      validateField("ConfirmPassword", e.target.value);
                              }
              }}
             onBlur ={()=> {setTouched({...touched, ConfirmPassword :true})
             validateField("ConfirmPassword",ConfirmPassword);
            }}
             
            />
            {touched.ConfirmPassword && errors?.ConfirmPassword &&<p className='text-red-500 text-sm mb-2'> {errors.ConfirmPassword}</p>}
          
            <button
                type="button"
                onClick={() => setShowPassword(!Showpassword)}
                className="text-black absolute right-4 top-4 pt-2">
                {Showpassword? <EyeOff/> : <Eye/>}</button>
            </div>
             <div className="mt-4 ">
                <label className="flex items-start gap-2 text-sm  text-gray-500">
                  <input type="checkbox" className="mt-1" 
                  checked={AcceptedTerms}
                  onChange={(e)=>{
            setAcceptedTerms(e.target.checked);

        if(e.target.checked){
            setErrors({
               ...errors,
                AcceptedTerms: ""
            });
        }
      }}/>
          
                  <span className='pb-4'>I agree to the {" "} <span className="text-green-500 font-medium hover:underline cursor-pointer">
                    Terms & Conditions</span>{" "} 
                    and {" "} <span className="text-green-500 font-medium hover:underline cursor-pointer">
                      Privacy Policy
                      </span>
                      </span>
                </label>
                {errors.AcceptedTerms &&<p className='text-red-500 text-sm  mb-2 pl-6'> {errors.AcceptedTerms}</p>}

               
              </div>

              <button 
            
                className="w-full bg-[#3B944D] hover:bg-[#327d41] text-white font-medium py-3.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 hover:border-4 hover:border-green-500
                shadow-lg shadow-green-700/20 mt-4" type="submit">
                <span className='flex items-center gap-3'>
                  Create Account <ArrowRight size={16} className='' />
                </span>
                

              </button>

               <div className="flex py-5 items-center">
              <div className="grow border-t border-gray-200"></div>
              <span className="shrink mx-4 text-gray-400 text-xs font-normal">or</span>
              <div className="grow border-t border-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 border border-gray-200 rounded-xl py-2.5 px-4 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google logo" />
                <span>Sign up with Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 border border-gray-200 rounded-xl py-2.5 px-4 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="Facebook logo" />
                <span>Sign up with Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-600">
                Already have an account?{' '}
                <span className="text-[#3B944D] font-semibold hover:underline cursor-pointer">Login</span>
              </p>
            </div>

          


        </form>
        </div>
    </div>
    </div>
    </div>
  )
}
