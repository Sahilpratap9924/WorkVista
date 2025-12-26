import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;
    const totalSalary =
      parseInt(basicSalary) +
      parseInt(allowances || 0) -
      parseInt(deductions || 0);
    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });
    const savedSalary = await newSalary.save();
    return res.status(201).json({
      success: true,
      message: "Salary added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Add salary Server Error",
    });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;
    let salary;
    if (role === "admin") {
      salary = await Salary.find({ employeeId: id }).populate(
        "employeeId",
        "employeeId"
      );
    } else {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res.status(200).json({
      success: true,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get salary Server Error",
    });
  }
};

export { addSalary, getSalary };
