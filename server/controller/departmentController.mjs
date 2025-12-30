import Department from "../models/Department.mjs";
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({
      dep_name,
      description,
    });
    await newDep.save();
    return res.status(201).json({
      success: true,
      message: "Department added successfully",
      Department: newDep,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add department Server Error" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get departments Server Error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const departments = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department: departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get departments Server Error" });
  }
};
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(
      { _id: id },
      { dep_name, description },
      { new: true }
    );
    return res.status(200).json({ success: true, updatedDepartment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update department Server Error" });
  }
};
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    await department.deleteOne(); // ✅ triggers middleware

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
      department,
    });
  } catch (error) {
    console.error("Delete Department Error:", error);
    return res.status(500).json({
      success: false,
      error: "Delete Department Server Error",
    });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
