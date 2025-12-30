import express from "express";
import verifyUser from "../middleware/authMiddleware.mjs";
import { changePassword } from "../controller/settingController.mjs";
const router = express.Router();
router.put("/change-password", verifyUser, changePassword);

export default router;
