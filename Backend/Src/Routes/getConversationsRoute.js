import express from 'express';
import { getConversationsController } from '../Controller/getConversationsController.js';
import { AuthenticationMiddleware } from '../Middleware/AuthenticationMiddleware.js';

const getConversationsRoute= express.Router();

getConversationsRoute.route ('/conversations').get (AuthenticationMiddleware,getConversationsController)

export default getConversationsRoute;