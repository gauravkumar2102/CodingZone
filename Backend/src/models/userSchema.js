import mongoose from 'mongoose';
import Problem from './problemSchema.js';

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{  
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
         
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    problemSolved:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Problem',
            unique:true
        }],
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    

});

userSchema.post('findOneAndDelete', async function (userInfo) {
    if (userInfo) {
      await mongoose.model('submission').deleteMany({ userId: userInfo._id });
    }
});

const User = mongoose.model('User', userSchema);
export default User;