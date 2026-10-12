import express from 'express';
import { OpenrouterController } from '../OpenrouterController.js';
import { AuthenticationMiddleware } from '../Middleware/AuthenticationMiddleware.js';

const OpenrouterRoute= express.Router();

OpenrouterRoute.route ('/openrouter').post (AuthenticationMiddleware,OpenrouterController )

export default OpenrouterRoute;