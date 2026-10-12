import express from 'express';
import { MyOrdersController } from '../Controller/MyOrdersController.js';
import { AuthenticationMiddleware } from '../Middleware/AuthenticationMiddleware.js';

const MyOrdersRoute= express.Router();

MyOrdersRoute.route ('/myorders').get (AuthenticationMiddleware,MyOrdersController)

export default MyOrdersRoute;