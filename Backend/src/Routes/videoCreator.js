import express from 'express';
import adminMiddleware from'../middleware/adminAuthMiddleware.js';
const videoRouter =  express.Router();
import {generateUploadSignature,saveVideoMetadata,deleteVideo} from"../controllers/videoSection.js";

videoRouter.get("/create/:problemId",adminMiddleware,generateUploadSignature);
videoRouter.post("/save",adminMiddleware,saveVideoMetadata);
videoRouter.delete("/delete/:problemId",adminMiddleware,deleteVideo);

export default videoRouter;