import express from 'express';
import LoginUserController from '../Controller/LoginUserController.js';

const LoginRoute= express.Router();

LoginRoute.route ('/login').post (LoginUserController)

export default LoginRoute;