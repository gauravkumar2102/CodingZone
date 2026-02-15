import express from "express";
import { registerUser, loginUser,logoutUser ,AdminRegisterUser,deleteProfile} from "../controllers/userAuthController.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
const AuthRouter = express.Router();

AuthRouter.post("/register",registerUser);
AuthRouter.post("/login",loginUser);
AuthRouter.post("/logout",userAuthMiddleware,logoutUser);
AuthRouter.post("/admin/register",adminAuthMiddleware,AdminRegisterUser);
AuthRouter.delete("/deleteProfile",userAuthMiddleware,deleteProfile);   
// AuthRouter.get("/profile",getUserProfile);
AuthRouter.get('/check',userAuthMiddleware,(req,res)=>{
        const reply={
            firstname:req.result.firstname,
            lastname:req.result.lastname,
            email:req.result.email,
            role:req.result.role,
            _id:req.result._id  
        }
        res.status(200).json({user:reply,message:"User is authenticated"});
});

export default AuthRouter;