import prisma from "../prisma.js";
import { sendOTP } from "../Services/mailServices.js";
import { generateOTP, saveOTP  } from "../Services/otpServices.js";
import { atom } from "jotai";
import { signupAtom } from "../../../src/Atom/RegisterAtom.js";

async function RegisterUserController(req,res) {
    console.log("Register controller called");
    try{
        console.log(req.body);
    const {Name,Email,UserName,Password,OTPVerification} = req.body;
    
    const emailExist =await prisma.user.findUnique({where:{email:Email},})
    
    if(emailExist){
        return res.status(400).json({m:"Already one Account exists in this email"});
    }
    
    
    const usernameexist =await prisma.user.findUnique({where:{username:UserName},})
    
    if(usernameexist){
        return res.status(400).json({m:"You already have one Account "});
    };

    
    
        const otp= generateOTP()
        await saveOTP(Email,otp)
        await sendOTP(Email,otp)
        return res.status(200).json({
        message:"OTP sent sucessfully",
        otp
        })
        return res;

        
 }
            catch(error){
            console.error(error);
              
        }

  
};
export default RegisterUserController
