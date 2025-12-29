require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.cjs");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// 🔹 dynamically load ESM routes
(async () => {
  const { default: authRoutes } = await import("./routes/auth.js");
  const { default: departmentRoutes } = await import("./routes/Department.js");
  const { default: employeeRoutes } = await import("./routes/employee.js");
  const { default: salaryRoutes } = await import("./routes/salary.js");
  const { default: leaveRoutes } = await import("./routes/leave.js");
  const { default: settingRoutes } = await import("./routes/setting.js");
  const { default: dashboardRoutes } = await import("./routes/dashboard.js");
  const { default: attendanceRoutes } = await import("./routes/attendance.js");

  app.use("/api/auth", authRoutes);
  app.use("/api/departments", departmentRoutes);
  app.use("/api/employee", employeeRoutes);
  app.use("/api/salary", salaryRoutes);
  app.use("/api/leave", leaveRoutes);
  app.use("/api/setting", settingRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/attendance", attendanceRoutes);
})();

// optional health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
