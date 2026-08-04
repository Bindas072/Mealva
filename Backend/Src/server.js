import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import LoginRoute from './Routes/LoginRoute.js';
import RegisterRoute from './Routes/RegisterRoute.js';
import VerifyOTProute from './Routes/VerifyOTProute.js';
import cors from "cors";
const app = express()
const port=5000
 
app.use(cors())
const corOptions ={
    origin : 'http://localhost:5173',
    optionsSuccessStatus: 200 
}
app.use(express.json());
app.use('/',LoginRoute);
app.use('/',RegisterRoute)
app.use('/',VerifyOTProute)


app.listen(port,()=>{
    console.log(`Server is ruuning at http://localhost:${port}`);
     console.log("JWT_SECRET =", process.env.JWT_SECRET);
});