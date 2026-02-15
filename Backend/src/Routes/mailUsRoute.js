import express from "express";
import { sendQueryMail } from "../controllers/mailUs.js";

const router = express.Router();

router.post("/send-query", sendQueryMail);

export default router;