import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
} from "../controller/employeeController.js";
const router = express.Router();
router.post("/add", verifyUser, upload.single("profileImage"), addEmployee);
router.get("/", verifyUser, getEmployees);
router.get("/:id", verifyUser, getEmployee);
// router.get("/:id", verifyUser, getEmployee);
router.put("/:id", verifyUser, updateEmployee);
router.get("/department/:id", verifyUser, fetchEmployeesByDepId);
export default router;
