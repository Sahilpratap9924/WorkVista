import Leave from "../models/Leave.js";
import Employee from "../models/Employee.mjs";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, fromDate, toDate, reason } = req.body;

    // validation
    if (!userId || !leaveType || !fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be provided",
      });
    }

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    await newLeave.save();

    return res.status(201).json({
      success: true,
      message: "Leave added successfully",
    });
  } catch (error) {
    console.error("Add Leave Error:", error);
    return res.status(500).json({
      success: false,
      error: "Add Leave Server Error",
    });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    if (role === "admin") {
      leaves = await Leave.find({ employeeId: id });
    } else {
      const employee = await Employee.findOne({ userId: id });

      leaves = await Leave.find({ employeeId: employee._id });
    }

    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.error("Get Leave Error:", error);
    return res.status(500).json({
      success: false,
      error: "Get Leave Server Error",
    });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name employeeId profileImage" },
        ],
      })
      .lean();

    // 🔥 FILTER BROKEN RECORDS
    const safeLeaves = leaves.filter(
      (l) => l.employeeId && l.employeeId.userId && l.employeeId.department
    );

    return res.status(200).json({
      success: true,
      leaves: safeLeaves,
    });
  } catch (error) {
    console.error("Admin Get Leaves Error:", error);
    return res.status(500).json({
      success: false,
      error: "Fetch Leave Server Error",
    });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name profileImage",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.error("Get Leave Error:", error);
    return res.status(500).json({
      success: false,
      error: "Get Leave Server Error",
    });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not Founded",
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Get Leave Error:", error);
    return res.status(500).json({
      success: false,
      error: "Leave Update Server Error",
    });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
