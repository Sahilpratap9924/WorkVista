import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Details = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee");
      }
    };
    fetchLeave();
  }, [id]);

  const styles = {
    container: {
      maxWidth: "768px",        // max-w-3xl
      margin: "30px auto",      // mx-auto mt-10
      backgroundColor: "#fff",
      padding: "30px",          // p-8
      borderRadius: "6px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: "24px",         // text-2xl
      fontWeight: "700",        // font-bold
      marginBottom: "28px",     // mb-8
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",              // gap-6
    },
    image: {
      width: "288px",           // w-72
      borderRadius: "100%",      // rounded-full
      border: "1px solid #e5e7eb",
    },
    row: {
      display: "flex",
      gap: "12px",              // space-x-3
      marginBottom: "20px",     // mb-5
      alignItems: "center",
    },
    label: {
      fontSize: "18px",         // text-lg
      fontWeight: "700",        // font-bold
    },
    value: {
      fontWeight: "500",        // font-medium
    },
  };
  const getStatusBadge = (status) => {
  const baseStyle = {
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "700",
    display: "inline-block",
    textAlign: "center",
    minWidth: "100px",
  };

  if (status === "Approved") {
    return (
      <span
        style={{
          ...baseStyle,
          backgroundColor: "#dcfce7",
          color: "#166534",
        }}
      >
        Approved
      </span>
    );
  }

  if (status === "Rejected") {
    return (
      <span
        style={{
          ...baseStyle,
          backgroundColor: "#fee2e2",
          color: "#991b1b",
        }}
      >
        Rejected
      </span>
    );
  }

  return (
    <span
      style={{
        ...baseStyle,
        backgroundColor: "#fef3c7",
        color: "#92400e",
      }}
    >
      Pending
    </span>
  );
};

const changeStatus = async(id,status)=>{
    try {
        const response = await axios.put(
          `http://localhost:5000/api/leave/${id}`,{status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/admin-dashboard/leaves")
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching status employee");
      }
}


  return (
    <>
      {leave ? (
        <div style={styles.container}>
          <h2 style={styles.heading}>Leave Details</h2>

          <div style={styles.grid}>
            <div>
              <img
                src={`http://localhost:5000/uploads/${leave.employeeId.userId.profileImage}`}
                alt="Employee"
                style={styles.image}
              />
            </div>

            <div>
              <div style={styles.row}>
                <p style={styles.label}>Name:</p>
                <p style={styles.value}>{leave.employeeId.userId.name}</p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Employee ID:</p>
                <p style={styles.value}>{leave.employeeId.employeeId}</p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>LeaveType:</p>
                <p style={styles.value}>
                  {leave.leaveType}
                </p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Reason:</p>
                <p style={styles.value}>{leave.reason}</p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Department:</p>
                <p style={styles.value}>
                  {leave.employeeId.department.dep_name}
                </p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Start Date:</p>
                <p style={styles.value}>{new Date(leave.fromDate).toLocaleDateString()}</p>
              </div>
              <div style={styles.row}>
                <p style={styles.label}>End Date:</p>
                <p style={styles.value}>{new Date(leave.toDate).toLocaleDateString()}</p>
              </div>
              <div style={styles.row}>
  <p style={styles.label}>
    {leave.status === "Pending" ? "Action:" : "Status:"}
  </p>

  {leave.status === "Pending" ? (
    <div style={{ display: "flex", gap: "8px" }}>
      <button
        style={{
          padding: "6px 14px",
          backgroundColor: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
        onClick={()=>changeStatus(leave._id,"Approved")}
      >
        Approve
      </button>

      <button
        style={{
          padding: "6px 14px",
          backgroundColor: "#dc2626",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
        onClick={()=>changeStatus(leave._id,"Rejected")}
        
      >
        Reject
      </button>
    </div>
  ) : (
    getStatusBadge(leave.status)
  )}
</div>

              
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Details;
