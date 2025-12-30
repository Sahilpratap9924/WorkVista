import React, { useEffect,useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

const Edit = () => {
    const navigate=useNavigate();
    const [employee,setEmployee]=useState({
        name:'',
        maritalStatus:'',
        designation:'',
        salary:0,
        department:''
    });
    const [departments,setDepartments]=useState(null)
    const {id} = useParams();
    useEffect(() => {
            const getDepartments=async ()=>{
            const departments= await fetchDepartments()
            setDepartments(departments)
            };
            getDepartments();
    
        },[]);
    useEffect(() => {
        const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://work-vista-lua88.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
            const employee = response.data.employee
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
          }));
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee");
      }
    };
    fetchEmployee();

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
  const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
};

  const handleSubmit= async (e)=>{
    e.preventDefault();

    try{
            const response = await axios.put(
  `https://work-vista-lua88.vercel.app/api/employee/${id}`,
  employee,
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
    <>{departments && employee ? (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Name</label>
            <input type="text" value={employee.name} name="name" onChange={handleChange} placeholder="Insert Name" style={styles.input} required/>
          </div>

          <div>
            <label style={styles.label}>Marital Status</label>
            <select style={styles.input} value={employee.maritalStatus} name="maritalStatus" placeholder="Marital Status" onChange={handleChange} required>
              <option>Select Marital Status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
            </select>
          </div>

          <div>
            <label style={styles.label}>Designation</label>
            <input type="text" value={employee.designation} name="designation" placeholder="Insert Designation"onChange={handleChange} style={styles.input} required />
          </div>
          <div>
            <label style={styles.label} >Salary</label>
            <input type="number" value={employee.salary} name="salary" placeholder="Insert Salary" style={styles.input} onChange={handleChange} required />
          </div>
        </div>
        <div style={{gridColumn: "span 2 / span 2"}}
>
            <label style={styles.label} >Department</label>
            <select style={styles.input} value={employee.department} name="department" onChange={handleChange} required>
              <option value="">Select Department</option>
              {departments.map(dep=>(
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
        </div>

        <button type="submit" style={styles.button}>
          Edit Employee
        </button>
      </form>
    </div>): <div>Loading ...</div>}</>
  );
};

export default Edit;
