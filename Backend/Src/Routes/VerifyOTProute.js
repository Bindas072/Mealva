import express from 'express';
import VerifyOTPController from '../Controller/VerifyOTPController.js';
const VerifyOTProute= express.Router();

VerifyOTProute.route ('/verify-otp').post (VerifyOTPController)

export default VerifyOTProute;