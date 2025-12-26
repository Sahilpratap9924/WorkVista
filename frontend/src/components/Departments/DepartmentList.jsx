import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper.jsx";
import axios from "axios";
const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const onDepartmentDelete = ()=>{
    fetchDepartments();
    
  }
  const fetchDepartments = async () => {
      setDepLoading(true);
      try{
        const response = await axios.get("http://localhost:5000/api/departments",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
          let sno=1;
          const data=await response.data.departments.map((dep)=>(
            {
              _id:dep._id,
              sno:sno++,
              dep_name:dep.dep_name,
              action:(<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
            }
          ))
          setDepartments(data);
          setFilteredDepartments(data);
        }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }
      finally{
        setDepLoading(false);
      }
    };
  useEffect(() => {
    fetchDepartments();
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
    },
    button: {
      padding: "6px 16px",
      backgroundColor: "#0d9488", // teal-600
      color: "#ffffff",
      borderRadius: "4px",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
    bottom:{
      marginTop:"10px"
    }
  };
  const filterDepartments = (e) => {
    const records=departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  }

  return (
    <>{depLoading ? <div>loading...</div> :
    <div style={styles.container}>
      <div style={styles.titleWrapper}>
        <h3 style={styles.title}>Manage Departments</h3>
      </div>

      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="Search departments..."
          onChange={filterDepartments}
          style={styles.input}
        />

        <Link to="/admin-dashboard/add-departments" style={styles.button}>
          Add Department
        </Link>
      </div>
      <div style={styles.bottom}>
        <DataTable columns={columns} data={filteredDepartments} pagination/>
      </div>
    </div>
    }</>
  );
  
};

export default DepartmentList;