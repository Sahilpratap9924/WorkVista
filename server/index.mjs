import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./db/db.mjs";
import authRoutes from "./routes/auth.mjs";
import departmentRoutes from "./routes/Department.mjs";
import employeeRoutes from "./routes/employee.mjs";
import salaryRoutes from "./routes/salary.mjs";
import leaveRoutes from "./routes/leave.mjs";
import settingRoutes from "./routes/setting.mjs";
import dashboardRoutes from "./routes/dashboard.mjs";
import attendanceRoutes from "./routes/attendance.mjs";

const app = express();

await connectDB();

app.use(
  cors({
    origin: "https://work-vista-rx7j.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
