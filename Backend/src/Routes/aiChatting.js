import  express  from 'express';
const aiRouter =  express.Router();
import userMiddleware from "../middleware/userAuthMiddleware.js";
import solveDoubt from "../controllers/solveDoubt.js";


 aiRouter.post('/chat', userMiddleware, solveDoubt);

export default aiRouter;