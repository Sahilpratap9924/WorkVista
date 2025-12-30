import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { EmployeeButtons } from '../../utils/EmployeeHelper.jsx'
import { columns } from '../../utils/EmployeeHelper.jsx'
const EmployeeList = () => {
    const [employees,setEmployees]=React.useState([]);
    const [empLoading, setEmpLoading] = React.useState(false);
    const [filteredEmployees, setFilteredEmployees] = React.useState([]);
    useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try{
        const response = await axios.get("https://work-vista-lua88.vercel.app/api/employee",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
          let sno=1;
          const data=await response.data.employees.map((emp)=>(
            {
              _id:emp._id,
              sno:sno++,
              dep_name: emp.department?.dep_name || "No Department",
              name:emp.userId.name,
              dob:new Date(emp.dob).toDateString(),
              profileImage:<img
  src={`https://work-vista-lua88.vercel.app/uploads/${emp.userId.profileImage}`}
  alt="Profile"
  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
/>
,
              action:(<EmployeeButtons _id={emp._id}/>)
            }
          ))
          setEmployees(data);
          setFilteredEmployees(data);
          
        }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }
      finally{
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);
    const styles = {
    container: {
      padding: "20px",
        
    },
    titleWrapper: {
      textAlign: "center",
      marginBottom: "16px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "700",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
    },
    input: {
      padding: "4px 16px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
      marginBottom: "10px"
    },
    button: {
      padding: "6px 16px",
      backgroundColor: "#0d9488", // teal-600
      color: "#ffffff",
      borderRadius: "4px",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "10px"
      
    },
    bottom:{
      marginTop:"10px"
    }
  };
  const customStyles = {
  headCells: {
    style: {
      fontWeight: "700",   
      fontSize: "14px",
    },
  },
};
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm) ||
      (emp.dep_name || "").toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div style={styles.container}>
        <div style={styles.titleWrapper}>
        <h3 style={styles.title}>Manage Employees</h3>
      </div>

      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="Search employees..."
          onChange={handleFilter}
          style={styles.input}
        />

        <Link to="/admin-dashboard/add-employees" style={styles.button}>
          Add Employee
        </Link>
      </div>
      <DataTable columns={columns} data={filteredEmployees} customStyles={customStyles} pagination/>
      
    </div>
  )
}

export default EmployeeList
