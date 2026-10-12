import express from 'express';
import { ConfirmOrderController } from '../Controller/ConfirmOrderController.js';
import { AuthenticationMiddleware } from '../Middleware/AuthenticationMiddleware.js';

const ConfirmOrderRoute= express.Router();

ConfirmOrderRoute.route ('/orders').post (AuthenticationMiddleware,ConfirmOrderController)

export default ConfirmOrderRoute;