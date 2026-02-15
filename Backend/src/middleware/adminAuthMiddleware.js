import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import client from "../config/redisDb.js";


const adminAuthMiddleware = async (req, res, next) => {
   try{
    const {token} = req.cookies;
    
    if (!token) {
        throw new Error("Token is not present");
    }

    let payload=jwt.verify(token,process.env.JWT_SECRET);
    
    if(!payload){

        throw new Error("Invalid Token");
    }
 
    const {_id}=payload;

    if(payload.role !== 'admin'){
        throw new Error("Access denied. Admins only.");
    }

    const user=await User.findById(_id);
    if(!user){
        throw new Error("User doesn't exist");
    }
    
    let isBlocked = await client.exists(`token:${token}`);
    if(isBlocked){
        throw new Error("Invalid Token");
    }
    req.result=user;
    next();

   }
   catch(error){
          return res.status(401).send({ error: "Unauthorized: "+error.message });
   }
}

export default adminAuthMiddleware;