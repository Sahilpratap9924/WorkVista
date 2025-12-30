import React, { useEffect,useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { getEmployees } from "../../utils/EmployeeHelper";

const Add = () => {
    const navigate=useNavigate();
    const [salary,setSalary]=useState({
        employeeId:null,
        basicSalary:0,
        allowances:0,
        deductions:0,
        payDate:null,
    });
    const [departments,setDepartments]=useState(null)
    const [employees,setEmployees]=useState([]);
    useEffect(() => {
            const getDepartments=async ()=>{
            const departments= await fetchDepartments()
            setDepartments(departments)
            };
            getDepartments();
    
        },[]);
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
  const { name, value } = e.target;
    setSalary((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
};

  const handleSubmit= async (e)=>{
    e.preventDefault();

    try{
            const response = await axios.post(
  `https://work-vista-lua88.vercel.app/api/salary/add`,
  salary,
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
  const handleDepartment=async(e)=>{
    const emps=await getEmployees(e.target.value);
    setEmployees(emps);

  }

  return (
    <>{departments ? (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Salary</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.grid}>
            <div>
            <label style={styles.label} >Department</label>
            <select style={styles.input} name="department" onChange={handleDepartment} required>
              <option value="">Select Department</option>
              {departments.map(dep=>(
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
            </div>
            {/* {Employee} */}
            <div>
            <label style={styles.label} >Employee</label>
            <select style={styles.input} name="employeeId" onChange={handleChange} required>
              <option value="">Select Employee</option>
              {employees.map(emp=>(
                <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
              ))}
            </select>
            </div>
          <div>
            <label style={styles.label}>Basic Salary</label>
            <input type="number" name="basicSalary" placeholder="Basic Salary" onChange={handleChange} style={styles.input} required />
          </div>
          <div>
            <label style={styles.label} >Allowances</label>
            <input type="number" name="allowances" placeholder="Allowances" style={styles.input} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label} >Deductions</label>
            <input type="number" name="deductions" placeholder="Deductions" style={styles.input} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label} >Pay Date</label>
            <input type="date" name="payDate" style={styles.input} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" style={styles.button}>
          Add Salary
        </button>
      </form>
    </div>): <div>Loading ...</div>}</>
  );
};

export default Add;
