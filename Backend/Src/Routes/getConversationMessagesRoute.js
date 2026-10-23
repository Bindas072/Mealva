import express from 'express';
import { getConversationMessagesController } from '../Controller/getConversationMessagesController.js';
import { AuthenticationMiddleware } from '../Middleware/AuthenticationMiddleware.js';

const getConversationMessagesRoute= express.Router();

getConversationMessagesRoute.route ('/conversations/:conversationId/messages').get (AuthenticationMiddleware,getConversationMessagesController)

export default getConversationMessagesRoute;