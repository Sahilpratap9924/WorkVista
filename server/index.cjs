require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.cjs");

let app;

async function createApp() {
  if (app) return app;

  const _app = express();

  await connectDB();

  _app.use(cors());
  _app.use(express.json());

  const { default: authRoutes } = await import("./routes/auth.js");
  const { default: departmentRoutes } = await import("./routes/Department.js");
  const { default: employeeRoutes } = await import("./routes/employee.js");
  const { default: salaryRoutes } = await import("./routes/salary.js");
  const { default: leaveRoutes } = await import("./routes/leave.js");
  const { default: settingRoutes } = await import("./routes/setting.js");
  const { default: dashboardRoutes } = await import("./routes/dashboard.js");
  const { default: attendanceRoutes } = await import("./routes/attendance.js");

  _app.use("/api/auth", authRoutes);
  _app.use("/api/departments", departmentRoutes);
  _app.use("/api/employee", employeeRoutes);
  _app.use("/api/salary", salaryRoutes);
  _app.use("/api/leave", leaveRoutes);
  _app.use("/api/setting", settingRoutes);
  _app.use("/api/dashboard", dashboardRoutes);
  _app.use("/api/attendance", attendanceRoutes);

  _app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app = _app;
  return app;
}

module.exports = async (req, res) => {
  const app = await createApp();
  return app(req, res);
};
