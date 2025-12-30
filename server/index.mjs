import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./db/db.mjs";
import authRoutes from "./routes/auth.mjs";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
