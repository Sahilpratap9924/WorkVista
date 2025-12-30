import express from "express";
import verifyUser from "../middleware/authMiddleware.mjs";
import { addSalary, getSalary } from "../controller/salaryController.mjs";
const router = express.Router();
router.post("/add", verifyUser, addSalary);
router.get("/:id/:role", verifyUser, getSalary);

export default router;
