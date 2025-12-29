require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/db.js").default;

const authRoutes = require("./routes/auth.js");
const departmentRoutes = require("./routes/Department.js");
const employeeRoutes = require("./routes/employee.js");
const salaryRoutes = require("./routes/salary.js");
const leaveRoutes = require("./routes/leave.js");
const settingRoutes = require("./routes/setting.js");
const dashboardRoutes = require("./routes/dashboard.js");
const attendanceRoutes = require("./routes/attendance.js");

const app = express();
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);

module.exports = app;
