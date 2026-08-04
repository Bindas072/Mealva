import React, {useState}  from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { signupAtom } from '../../Atom/RegisterAtom';
export  default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const [signupData] = useAtom(signupAtom);

    const location = useLocation();
    const Navigate = useNavigate();

    const Email= location.state?.email;
    
    const verifyotp = async (e) =>{e.preventDefault()
      

    try{
      console.log("yes its calling")
        const res= await fetch ("http://localhost:5000/verify-otp",{
            method :"POST",
            headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...signupData,
          otp
        })
    });
    const data = await res.json();
    console.log(data);
    
      
      if (res.ok)
      {
        console.log("yes")
        alert("OTP Verified Successfully! ");
        
        Navigate("/login");
      }
      else {
            alert(data.message);
        } 
    }

    catch(error){
        console.log(error);
      alert("Something went wrong!");
    }
  }
  const RecentOTP =async ()=>{
    try{
       console.log("Resending OTP...");
      await fetch("http://localhost:5000/verify-otp", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        Email,
        action: "resend",
        }),
      });
       const data = await res.json();

        if (res.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    }
    catch(err){
       console.log(err);
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
                 
                 
          
            </div>

            <div className=' z-10 w-full max-w-lg   p-8 md:p-10 '>
        <div className='md:p-10 backdrop-blur-lg bg-white border border-white/20 rounded-3xl p-8 shadow-2xl shadow-green-700'>
        <h1 className='text-4xl font-bold text-black'>Verify OTP</h1>
        
        
        <form onSubmit={verifyotp}>
         <h1 className='text-md text-black pb-4 pl-2'>OTP</h1>
             <div className='relative'>
            <input type="text"
            placeholder="Enter OTP"
            className='mb-4 bg-white/20 w-full border-black rounded pb-2 p-2 pl-10 border placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-400'
             onChange={(e)=>{
                        setOtp(e.target.value);
            }}/>
            </div>
          <div className='px-4'>
             <button type="Submit" className='bg-green-500 rounded-md p-2 hover:bg-green-600 hover:border-4 hovar: border-green-800'  onClick={verifyotp}>
                  Verify OTP
              </button>

              <button type="button" className='text-red-700 hover:text-red-500 ' onClick={RecentOTP}>
                  Resent OTP
              </button>
          </div>
          </form>
        
        
        </div>
        </div>
        
    </div>
    </div>
    
    
  )
}
