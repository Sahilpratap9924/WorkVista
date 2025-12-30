import express from "express";
import verifyUser from "../middleware/authMiddleware.mjs";
import { getSummary } from "../controller/dashboardController.mjs";

const router = express.Router();

router.get("/summary", verifyUser, getSummary);

export default router;
