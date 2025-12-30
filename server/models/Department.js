import mongoose from "mongoose";
import Employee from "./Employee.mjs";
import Leave from "./Leave.js";
import Salary from "./Salary.js";
import User from "./user.mjs";

const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    try {
      const employees = await Employee.find({ department: this._id }).lean();

      if (!employees.length) return;

      const empIds = [];
      const userIds = [];

      for (const emp of employees) {
        if (emp._id) empIds.push(emp._id);
        if (emp.userId) userIds.push(emp.userId);
      }

      // delete dependent data
      await Leave.deleteMany({ employeeId: { $in: empIds } });
      await Salary.deleteMany({ employeeId: { $in: empIds } });

      // 🔥 THIS BLOCKS LOGIN
      if (userIds.length) {
        await User.deleteMany({ _id: { $in: userIds } });
      }

      await Employee.deleteMany({ department: this._id });
    } catch (error) {
      console.error("Department delete middleware error:", error);
      throw error;
    }
  }
);
const Department = mongoose.model("Department", departmentSchema);

export default Department;
