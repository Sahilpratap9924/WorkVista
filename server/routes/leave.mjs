import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave,
} from "../controller/leaveController.js";
const router = express.Router();
router.post("/add", verifyUser, addLeave);
router.get("/detail/:id", verifyUser, getLeaveDetail);
router.get("/admin/all", verifyUser, getLeaves);
router.get("/:id/:role", verifyUser, getLeave);
router.put("/:id", verifyUser, updateLeave);

export default router;
