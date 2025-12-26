import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../context/authContext.jsx"

const Add = () => {
    const {user}=useAuth()
    const [leave,setLeave]=useState({
        userId:user._id,

    })
  const handleChange = (e) => {
    const {name,value}=e.target
    setLeave((prevState)=>({...prevState,[name]:value}))
  };
  const navigate=useNavigate();
  const handeSubmit =async(e)=>{
    e.preventDefault();
    try {
        const response = await axios.post(
          `http://localhost:5000/api/leave/add`,leave,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate(`/employee-dashboard/leaves/${user._id}`)
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee");
      }

  }

  const styles = {
    container: {
      maxWidth: "896px", // max-w-4xl
      margin: "40px auto",
      backgroundColor: "#ffffff",
      padding: "32px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "24px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151", // gray-700
      marginBottom: "4px",
    },
    input: {
      padding: "8px",
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    textarea: {
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      padding: "8px",
      minHeight: "80px",
    },
    button: {
      width: "100%",
      marginTop: "24px",
      backgroundColor: "#0d9488", // teal-600
      color: "#ffffff",
      fontWeight: "700",
      padding: "10px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Request for Leave</h2>

      <form onSubmit={handeSubmit}>
        <div style={styles.formGroup}>
          {/* Leave Type */}
          <div>
            <label style={styles.label}>Leave Type</label>
            <select
              name="leaveType"
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* Dates */}
          <div style={styles.grid2}>
            <div>
              <label style={styles.label}>From Date</label>
              <input
                type="date"
                name="fromDate"
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div>
              <label style={styles.label}>To Date</label>
              <input
                type="date"
                name="toDate"
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={styles.label}>Description</label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#0f766e")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#0d9488")
          }
        >
          Request Leave
        </button>
      </form>
    </div>
  );
};

export default Add;
