import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
  const {user} = useAuth();
  const [leaves, setLeaves] = useState(null);
  let sno = 1;
  const {id} = useParams();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      alert(error?.response?.data?.error || "Server Error");
    }
  };

  useEffect(() => {
    if (user?._id) fetchLeaves();
  }, [user]);
  if(!leaves){
    return <div>Loading...</div>
  }

  /* ================= STYLES ================= */

  const styles = {
    page: {
      backgroundColor: "#f3f4f6",
      minHeight: "100vh",
      padding: "30px",
    },
    card: {
      maxWidth: "1100px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      padding: "24px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    },
    title: {
      textAlign: "center",
      fontSize: "26px",
      fontWeight: "700",
      color: "#111827",
      marginBottom: "20px",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    input: {
      padding: "8px 14px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      outline: "none",
      fontSize: "14px",
      width: "240px",
    },
    button: {
      padding: "8px 18px",
      backgroundColor: "#0d9488",
      color: "#ffffff",
      borderRadius: "6px",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const thStyle = {
    padding: "12px",
    backgroundColor: "#f9fafb",
    textAlign: "left",
    fontSize: "13px",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
  };

  const tdStyle = {
    padding: "12px",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
  };

  const rowHover = {
    transition: "background-color 0.2s",
  };

  /* ================= JSX ================= */

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h3 style={styles.title}>Manage Leaves</h3>

        <div style={styles.topBar}>
          <input
            type="text"
            placeholder="Search leaves..."
            style={styles.input}
          />
          {user.role === "employee" &&

          <Link to="/employee-dashboard/add-leave" style={styles.button}>
            Add Leave
          </Link>
}
        </div>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>Leave Type</th>
              <th style={thStyle}>From</th>
              <th style={thStyle}>To</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr
                  key={leave._id}
                  style={rowHover}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ffffff")
                  }
                >
                  <td style={tdStyle}>{sno++}</td>
                  <td style={tdStyle}>{leave.leaveType}</td>
                  <td style={tdStyle}>
                    {new Date(leave.fromDate).toLocaleDateString()}
                  </td>
                  <td style={tdStyle}>
                    {new Date(leave.toDate).toLocaleDateString()}
                  </td>
                  <td style={tdStyle}>{leave.reason}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor:
                          leave.status === "Approved"
                            ? "#dcfce7"
                            : leave.status === "Rejected"
                            ? "#fee2e2"
                            : "#fef3c7",
                        color:
                          leave.status === "Approved"
                            ? "#166534"
                            : leave.status === "Rejected"
                            ? "#991b1b"
                            : "#92400e",
                      }}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={tdStyle} colSpan="6">
                  No leave records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
