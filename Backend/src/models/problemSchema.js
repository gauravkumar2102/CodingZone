import mongoose from 'mongoose';


const problemSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,   
        required:true,
        enum:['easy','medium','hard'] 
    },
    tags:{
        type:String,
        required:true,
        enum:['array','string','math','dynamic programming','graph','tree','sorting','searching','greedy','backtracking']
    }, 
    visibleTestCases:[
        {
            input:{type:String,required:true},
            output:{type:String,required:true},
            explanation:{type:String}
        }
    ] ,
    hiddenTestCases:[
        {
            input:{type:String,required:true},  
            output:{type:String,required:true},
        },
    ],
    startCode:[
        {
            language:{type:String,required:true},
            initialCode:{type:String,required:true},
        }
    ],
    referenceSolution:[{
             language:{type:String,required:true},
            completeCode:{type:String,required:true},
    }],
    problemCreator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true});



const Problem=mongoose.model('Problem',problemSchema);

export default Problem;