import express from 'express';
import RegisterUserController from '../Controller/RegisterUserController.js'

const RegisterRoute= express.Router();

RegisterRoute.route ('/signup').post (RegisterUserController)
RegisterRoute.get('/test',(req,res)=>{
    res.send("Register route working");
});
export default RegisterRoute;