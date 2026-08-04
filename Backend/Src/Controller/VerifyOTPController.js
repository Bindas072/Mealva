import prisma from '../prisma.js';
import { verifyOTP, saveOTP ,resentOTP } from "../Services/otpServices.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { sendOTP } from "../Services/mailServices.js";
export default async function VerifyOTPController(req,res) {
     const {Name,Email,UserName,Password,otp,action} = req.body;
    console.log("Verify OTP route hit");
     console.log(req.body);
     try {
        console.log("its coming")
       
    //    const email = req.body.email;
    //     const otp = req.body.otp;
    

        console.log("email:",Email)
        console.log("otp:",otp);
        console.log("UserName:", UserName);
        console.log("Password:", Password);
        await verifyOTP(Email,otp);
         const hashedPassword = await bcrypt.hash(Password, 10);
         if (action=== "resend"){
            console.log("Resending....")
           const newOtp = await resentOTP(Email);
           console.log("generated")
           await sendOTP(Email,newOtp) 
        }
        console.log("UserName variable:", UserName);

        await prisma.user.create({
            data: {
                name:  Name,
                email:Email,
                username: UserName,
                password: hashedPassword,
                isVerified:true
            }
        });
            return res.status(200).json({
            message: "Account created successfully"
        });
        

            } catch (err) {
        return res.status(400).json({
            message: err.message,
            stack: err.stack

        });
    }
}
        // const resent=   await resentOTP();
        // if (resent)
        // {
        //     return res.status(200).json({m:"OTP Sent Sucessfully"})
        //     verificationOTP()

        // }
        // else{
        //     return "Try Again later"
        // }
  


   

