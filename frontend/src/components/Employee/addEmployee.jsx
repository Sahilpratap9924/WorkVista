import React, { useEffect,useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
    const navigate=useNavigate();
    const [departments,setDepartments]=useState([])
    const [formData, setFormData] = useState({
  department: "",
});

    useEffect(() => {
        const getDepartments=async ()=>{
        const departments= await fetchDepartments()
        setDepartments(departments)
        };
        getDepartments();

    },[])
  const styles = {
    container: {
      maxWidth: "896px", // max-w-4xl
      margin: "40px auto",
      backgroundColor: "#ffffff",
      padding: "32px",
      borderRadius: "6px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "24px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "4px",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
    },
    button: {
      width: "100%",
      marginTop: "24px",
      backgroundColor: "#0d9488",
      color: "#ffffff",
      fontWeight: "700",
      padding: "8px 16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
    },
  };
  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (files) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const formDataobj=new FormData();
    Object.keys(formData).forEach((key)=>{
        formDataobj.append(key,formData[key]);
    });

    try{
            const response = await axios.post(
  "https://work-vista-lua88.vercel.app/api/employee/add",
  formDataobj,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

            if(response.data.success){
                navigate("/admin-dashboard/employees");
            }
    
    
        }catch (error) {
  console.error(
    "Add Employee Error:",
    error.response?.data || error.message
  );

  alert(
    error.response?.data?.error || "Failed to add employee"
  );
}


  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Employee</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Name</label>
            <input type="text" name="name" onChange={handleChange} placeholder="Insert Name" style={styles.input} required/>
          </div>

          <div>
            <label style={styles.label}>Email</label>
            <input type="email" onChange={handleChange} name="email" placeholder="Insert Email" style={styles.input} required/>
          </div>

          <div>
            <label style={styles.label}>Employee ID</label>
            <input type="text" name="employeeId" onChange={handleChange} placeholder="Insert Employee ID" style={styles.input} required />
          </div>

          <div>
            <label style={styles.label}>Date of Birth</label>
            <input type="date" name="dob" onChange={handleChange} style={styles.input} required />
          </div>

          <div>
            <label style={styles.label}>Gender</label>
            <select style={styles.input} name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>

            </select>
          </div>

          <div>
            <label style={styles.label}>Marital Status</label>
            <select style={styles.input} name="maritalStatus" placeholder="Marital Status" onChange={handleChange} required>
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            </select>
          </div>

          <div>
            <label style={styles.label}>Designation</label>
            <input type="text" name="designation" placeholder="Insert Designation"onChange={handleChange} style={styles.input} required />
          </div>

          <div>
            <label style={styles.label} >Department</label>
            <select style={styles.input} name="department" value={formData.department} onChange={handleChange} required>

              <option value="">Select Department</option>
              {departments.map(dep=>(
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label} >Salary</label>
            <input type="number" name="salary" placeholder="Insert Salary" style={styles.input} onChange={handleChange} required />
          </div>

          <div>
            <label style={styles.label}>Password</label>
            <input type="password" name="password" placeholder="********" style={styles.input} onChange={handleChange} required />
          </div>

          <div>
            <label style={styles.label}>Role</label>
            <select style={styles.input} name="role" onChange={handleChange} required>
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>

            </select>
          </div>

          <div>
            <label style={styles.label}>Upload Image</label>
            <input type="file" name="profileImage" accept="image/*" style={styles.input} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" style={styles.button}>
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
