import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes/auth.js";
import connectDB from "./db/db.js";
import departmentRoutes from "./routes/Department.js";
import employeeRoutes from "./routes/employee.js";
import salaryRoutes from "./routes/salary.js";
import leaveRoutes from "./routes/leave.js";
import settingRoutes from "./routes/setting.js";
import dashboardRoutes from "./routes/dashboard.js";
import attendanceRoutes from "./routes/attendance.js";

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", router);
app.use("/uploads", express.static("public/uploads"));
app.use("/api/departments", departmentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log(
  "listen called, server:",
  server && typeof server.address === "function"
);
