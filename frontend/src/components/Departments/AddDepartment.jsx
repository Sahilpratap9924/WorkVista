import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const [Department,setDepartment]=useState({
        dep_name:"",
        description:""
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setDepartment({
            ...Department,
            [name]:value
        })
    }
  const styles = {
    container: {
      maxWidth: "768px",      // max-w-3xl
      margin: "40px auto",    // mx-auto mt-10
      backgroundColor: "#ffffff",
      padding: "32px",        // p-8
      borderRadius: "6px",    // rounded-md
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // shadow-md
      width: "384px",         // w-96
    },
    heading: {
      fontSize: "24px",       // text-2xl
      fontWeight: "700",      // font-bold
      marginBottom: "24px",   // mb-6
    },
    label: {
      fontSize: "14px",       // text-sm
      fontWeight: "500",      // font-medium
      color: "#374151",       // text-gray-700
      display: "block",
      marginBottom: "4px",
    },
    input: {
      width: "100%",
      padding: "8px",         // p-2
      border: "1px solid #d1d5db", // border-gray-300
      borderRadius: "6px",
      outline: "none",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      outline: "none",
      fontSize: "14px",
      resize: "vertical",
    },
    fieldSpacing: {
      marginTop: "12px",      // mt-3
    },
    button: {
      width: "100%",
      marginTop: "24px",      // mt-6
      backgroundColor: "#0d9488", // bg-teal-600
      color: "#ffffff",
      fontWeight: "700",
      padding: "8px 16px",    // py-2 px-4
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
    },
  };
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        const response=await axios.post("https://work-vista-lua88.vercel.app/api/departments/add", Department,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success){
            navigate("/admin-dashboard/departments");
        }


    }catch (error) {
  console.error("Add Department Error:", error.response?.data || error.message);
  alert("Failed to add department");
}

  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Department</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dep_name" style={styles.label}>
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            placeholder="Enter Dep Name"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.fieldSpacing}>
          <label htmlFor="dep-description" style={styles.label}>
            Department Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>

        <button type="submit" style={styles.button}>
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
