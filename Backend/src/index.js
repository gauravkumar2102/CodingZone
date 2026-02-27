import express from 'express';
import main from './config/db.js';
import dotenv from 'dotenv';
import AuthRouter from './Routes/UserAuthRoute.js';
import client from './config/redisDb.js';
import cookieParser from 'cookie-parser';
import problemRouter from './Routes/ProblemRoutes.js';
import submitRouter from './Routes/submitRoutes.js';
import aiRouter from './Routes/aiChatting.js';
import videoRouter from './Routes/videoCreator.js';
import cors from 'cors';
import mailUsRoute from './Routes/mailUsRoute.js'; 



dotenv.config();
const app = express();
app.use(cors({
    origin: 'https://coding-zone-eta.vercel.app',
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());



 
const Intialization = async () => { 
    try{
        await Promise.all([main(),client.connect()]);
        console.log("DB and Redis Connected");
        app.listen(process.env.PORT, () => { 
        console.log(`Server is running on port ${process.env.PORT}`);
    });
  
    }catch(error){
        console.error("DB not Connected:", error.message);
    }
}

Intialization(); 


app.use('/user', AuthRouter);
app.use('/problem', problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter); 
app.use("/video",videoRouter);  
app.use("/contact", mailUsRoute);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.get('/', (req, res) => {
    res.send('API is running...');
});       
