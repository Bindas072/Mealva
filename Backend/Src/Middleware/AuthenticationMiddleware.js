import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
export async function AuthenticationMiddleware(req,res,next) {
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({
            message:"Please Log in first",
        });
    }
    try{
        console.log("its coming...")
        const decoded = jwt.verify(
            token,process.env.JWT_SECRET
        );
        req.userId=decoded.u_id
        console.log(req.userId)
        const user = await prisma.user.findUnique({
        where: { id: req.userId },
        });

        if (!user) {
            return res.status(404).json({
            message: "User not found",
        });
        }
        next();
    }
    catch(error){
     if (error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Invalid or expired token",
      });  
    }
    console.error("Authentication error:", error);
  return res.status(500).json({
      message: "Internal server error",
    });
}

    
}
