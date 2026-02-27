import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { validate } from "../utils/validate.js";
import jwt from "jsonwebtoken";
import client from "../config/redisDb.js";

import dotenv from 'dotenv';
dotenv.config();

// Register User

export const registerUser=async(req,res)=>{
    try{
       
        validate(req.body);
        const {firstname,email,password}=req.body;
        req.body.password=await bcrypt.hash(password,10);
        req.body.role="user";
        
        const user=await User.create(req.body);
        const reply={
            firstname:user.firstname,
            email:user.email,
            role:user.role,
            _id:user._id
        }
        const token=jwt.sign({_id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'});
       res.cookie("token", token, {
       httpOnly: true,
       secure: true,         
       sameSite: "None",      
       maxAge: 60 * 60 * 1000
});

        res.status(201).json({
            user:reply,
            message:"User registered successfully"
        });
    
    }catch(error){
        res.status(400).send({error:error.message});
    }
}


// Login User

export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            throw new Error("Email and Password are required");
        }

        const user=await User.findOne({email});
        if(!user) throw new Error("Invalid Email or Password");

        const isPasswordMatched=await bcrypt.compare(password,user.password);
        if(!isPasswordMatched) throw new Error("Invalid Email or Password");

        const reply={
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            role:user.role,
            _id:user._id
        }
        const token=jwt.sign({_id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:60*60});
       res.cookie("token", token, {
       httpOnly: true,
       secure: true,         
       sameSite: "None",     
       maxAge: 60 * 60 * 1000
    });
        res.status(200).json({
            user:reply,
            message:"User logged in successfully"
        });

    } catch(error){
        res.status(401).send({error:error.message});
    }

}    

// Logout User
export const logoutUser=async(req,res)=>{
    try{
        const token=req.cookies.token;
        const payLoad=jwt.decode(token);
        
        await client.set(`token:${token}`,'blocked');
        await client.expireAt(`token:${token}`,payLoad.exp);
        res.cookie("token",null,{ expires: new Date(Date.now()) });
        res.status(200).send("User logged out successfully");

    }
    catch(error){
        res.status(401).send({error:error.message});
    }
}


// Admin Register user

export const AdminRegisterUser=async(req,res)=>{
    try{
       
        validate(req.body);
        const {firstname,lastname,email,password}=req.body;
        req.body.password=await bcrypt.hash(password,10);
        // req.body.role="admin";
        
        const user=await User.create(req.body);

        const token=jwt.sign({_id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie("token",token,{maxAge:60*60*1000});

        res.status(201).send("User registered successfully");
    
    }catch(error){
        res.status(400).send({error:error.message});
    }
}

// Delete Profile
export const deleteProfile = async(req,res)=>{
  
    try{
       const userId = req.result._id;
      
    // userSchema delete
    await User.findByIdAndDelete(userId);

    // Submission se bhi delete karo...
    
    // await Submission.deleteMany({userId});
    
    res.status(200).send("Deleted Successfully");

    }
    catch(err){
      
        res.status(500).send("Internal Server Error");
    }
}
