import prisma from "../prisma.js";

import React from 'react'

export  function generateOTP() {
  return  Math.floor(600000 + Math.random()*900000).toString();
}

export async function saveOTP(email,otp) {
 const expiresAt = new Date(Date.now() + 120 * 60 * 1000);
 await prisma.oTPVerification.upsert({
    where:{email},
    update:{otp,expiresAt},
    create: {
            email,
            otp,
            expiresAt
        }
 })
}
 

 export async function verifyOTP(email,otp) {
    
    const otpData = await prisma.oTPVerification.findUnique({
        where: {email }
    })
    console.log("Entered OTP:", otp);
    console.log("Database OTP:", otpData?.otp);
    console.log("Full DB Record:", otpData);
     

    if (!otpData) {
        throw new Error("OTP_NOT_FOUND")
    }
    if (new Date() > otpData.expiresAt)
    {
       throw new Error("OTP_EXPIRED"); 
    }
     
     if (String(otp).trim() !== String(otpData.otp).trim()) {
        throw new Error("INVALID_OTP");
    }
   
    
 }

 
 export async function resentOTP(email) {
    const newOtp = generateOTP();
   return (
    await prisma.otp.update ({
        where: {
            email: email
        },
        data: {
            otp: newOtp, 
            expireAt : new Date(Date.now()+ 10*60*1000 ),
        },
    })
   )
 }
 
   

