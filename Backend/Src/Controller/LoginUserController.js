import prisma from "../prisma.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

async function LoginUserController(req,res) {

try{
    const {username, password } =req.body;

    if (!username || !password)
    {
        return res.status(401).json({m: 'USERNAME  or PASSWORD Require'})
    }
    const user= await prisma.user.findUnique({where: {username}});
    if(!user){
        console.log("Username received:", username);
        return res.status(401).json({meassage:"User not found"});
    }

    else{
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(401).json({"m":"Invalid username and password !!"})
        }

        else{
            const payload ={
                u_id : user.id
            };
        const token = jwt.sign(payload,process.env.JWT_SECRET);
        console.log(token)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 1000,
            });

return res.status(200).json({
  message: "Login Successful",
});
        }
    }

}
catch(err){
        console.error(err);
        res.status(500).json({m:"Server error"});

    }
    
};



export default LoginUserController