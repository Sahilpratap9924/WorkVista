import express from "express";
import { login, verify } from "../controller/authController.mjs";
import verifyUser from "../middleware/authMiddleware.mjs";
const router = express.Router();
router.post("/login", login);
router.get("/verify", verifyUser, verify);

export default router;
