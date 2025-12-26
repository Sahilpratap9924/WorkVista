import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controller/departmentController.js";
const router = express.Router();
router.post("/add", verifyUser, addDepartment);
router.get("/", verifyUser, getDepartments);
router.get("/:id", verifyUser, getDepartment);
router.put("/:id", verifyUser, updateDepartment);
router.delete("/:id", verifyUser, deleteDepartment);
export default router;
