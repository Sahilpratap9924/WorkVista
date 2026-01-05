import express from "express";
import verifyUser from "../middleware/authMiddleware.mjs";
import {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
} from "../controller/employeeController.mjs";

const router = express.Router();

router.post("/add", upload.single("profileImage"), verifyUser, addEmployee);

router.get("/department/:id", verifyUser, fetchEmployeesByDepId);

router.get("/", verifyUser, getEmployees);
router.get("/:id", verifyUser, getEmployee);

router.put("/:id", verifyUser, updateEmployee);

export default router;
