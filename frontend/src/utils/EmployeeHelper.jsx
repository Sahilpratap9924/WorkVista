import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "120px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "150px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const fetchDepartments = async () => {
      let departments
      try{
        const response = await axios.get("https://work-vista-lua88.vercel.app/api/departments",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
            departments=response.data.departments
          
        }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      } 
      return departments
    };
    //Employee for salary form
    export const getEmployees = async (id) => {
      let employees
      try{
        const response = await axios.get(`https://work-vista-lua88.vercel.app/api/employee/department/${id}`,{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
            employees=response.data.employees
          
        }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      } 
      return employees
    };
    export const EmployeeButtons = ({_id}) => {
  const styles = {
    container: {
      display: "flex",
      gap: "12px", // space-x-3
    },
    editBtn: {
      padding: "4px 12px", // px-3 py-1
      backgroundColor: "#0000ff", // teal-600
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    viewBtn: {
      padding: "4px 12px",
      backgroundColor: "#0d9488", // red-600
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    salaryBtn: {
    padding: "4px 12px",
    backgroundColor: "#068722ff",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",              
    alignItems: "center",          
    justifyContent: "center",      
},

    leaveBtn: {
      padding: "4px 12px",
      backgroundColor: "#dc2626", // red-600
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
  };
  const navigate = useNavigate(); 
  return (
    <div style={styles.container}>
      <button style={styles.viewBtn}
      onClick={()=>
        navigate(`/admin-dashboard/employees/${_id}`)
      }>View</button>
      <button onClick={()=>navigate(`/admin-dashboard/employees/edit/${_id}`)} style={styles.editBtn}>Edit</button>
      <button style={styles.salaryBtn} onClick={()=>navigate(`/admin-dashboard/employees/salary/${_id}`)}>Salary</button>
      <button style={styles.leaveBtn}
      onClick={()=>navigate(`/admin-dashboard/employees/leaves/${_id}`)}>Leave</button>
    </div>
  );
};