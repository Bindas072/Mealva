import express from 'express'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import LoginRoute from './Routes/LoginRoute.js';
import RegisterRoute from './Routes/RegisterRoute.js';
import VerifyOTProute from './Routes/VerifyOTProute.js';
import cors from "cors";
import ConfirmOrderRoute from './Routes/ConfirmOrderRoute.js';
import MyOrdersRoute from './Routes/MyOrdersRoute.js';
import OpenrouterRoute from './Routes/OpenRouterRoute.js';
import getConversationsRoute from './Routes/getConversationsRoute.js';
import getConversationMessagesRoute from './Routes/getConversationMessagesRoute.js';
dotenv.config();

const app = express()
const port=5000
 

const corOptions ={
    credentials: true,
    origin : 'http://localhost:5173',
}
app.use(cors(corOptions))
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use('/',LoginRoute);
app.use('/',RegisterRoute)
app.use('/',VerifyOTProute)
app.use('/',ConfirmOrderRoute)
app.use('/',MyOrdersRoute)
app.use('/',OpenrouterRoute)
app.use ('/',getConversationsRoute)
app.use('/',getConversationMessagesRoute)


app.listen(port,()=>{
    console.log(`Server is ruuning at http://localhost:${port}`);
     console.log("JWT_SECRET =", process.env.JWT_SECRET);
});