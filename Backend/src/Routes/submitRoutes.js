import express from 'express';
const submitRouter = express.Router();
import userAuthMiddleware from '../middleware/userAuthMiddleware.js';
import { submitCode, runCode } from '../controllers/submissionController.js';  

 
// Submit Code for a Problem
submitRouter.post('/submit/:id', userAuthMiddleware, submitCode);
submitRouter.post("/run/:id", userAuthMiddleware, runCode);

export default submitRouter; 