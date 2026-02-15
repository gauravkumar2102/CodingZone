import express from 'express';
const problemRouter = express.Router();
import adminAuthMiddleware from '../middleware/adminAuthMiddleware.js';
import userAuthMiddleware from '../middleware/userAuthMiddleware.js';
import { createProblem, getAllProblems, getProblemById, updateProblem, deleteProblem ,submittedProblem,solvedAllProblembyUser} from '../controllers/problemControllers.js';

// Create Problem
problemRouter.post('/create', adminAuthMiddleware, createProblem);
// Get All Problems
problemRouter.get('/getAllProblem',userAuthMiddleware, getAllProblems);
// Get Problem by ID
problemRouter.get('/problemById/:id',userAuthMiddleware, getProblemById);
// Update Problem 
problemRouter.patch('/update/:id',adminAuthMiddleware, updateProblem);
// Delete Problem
problemRouter.delete('/delete/:id',adminAuthMiddleware, deleteProblem);
// solved problems
problemRouter.get('/submittedProblem/:pid',userAuthMiddleware, submittedProblem);

problemRouter.get('/solvedProblemByUser',userAuthMiddleware, solvedAllProblembyUser);

export default problemRouter;