import Employee from "../models/Employee.mjs";
import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "user already registered in emp" });
    }

    const rawPassword = password || "Employee@123";
    const hashPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: "",
    });
    const savedUser = await newUser.save();
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();
    return res.status(200).json({
      success: true,
      message: "Employee added successfully",
    });
  } catch (error) {
    console.error("ADD EMPLOYEE ERROR:", error);

    // mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    // duplicate key error (email / employeeId)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Email or Employee ID already exists",
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees Server Error" });
  }
};
const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("GET EMPLOYEE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        salary,
        department,
      }
    );
    if (!updatedEmployee || !updatedUser) {
      return res.status(400).json({
        success: false,
        error: "Failed to update employee",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Update Employee Server Error",
    });
  }
};
const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;

  try {
    const employees = await Employee.find({ department: id });

    if (!employees) {
      return res.status(404).json({
        success: false,
        error: "EmployeedepId error",
      });
    }

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("GET EMPLOYEES BY DEPARTMENT ID ERROR:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
};
