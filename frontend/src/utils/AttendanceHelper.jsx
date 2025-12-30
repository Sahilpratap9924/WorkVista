import { useState,useEffect } from "react";
import axios from "axios";
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
    width: "150px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // if status exists, show badge; else show buttons
    setIsEditing(status == null);
  }, [status]);

  const markEmployee = async (newStatus) => {
    try {
      const response = await axios.put(
        `https://work-vista-lua88.vercel.app/api/attendance/update/${employeeId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setIsEditing(false); // switch to badge view
        statusChange();     // refresh table
      }
    } catch (error) {
      alert("Failed to update attendance");
    }
  };

  const displayStatus =
    typeof status === "object" ? status?.status : status;

  /* ================= STYLES ================= */

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "6px 14px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
      color: "#ffffff",
    },
    presentBtn: { backgroundColor: "#22c55e" },
    absentBtn: { backgroundColor: "#ef4444" },
    sickBtn: { backgroundColor: "#6b7280" },
    leaveBtn: {
      backgroundColor: "#eab308",
      color: "#000000",
    },
    statusBadge: {
      minWidth: "90px",
      padding: "6px 0",
      borderRadius: "6px",
      textAlign: "center",
      fontWeight: "600",
      fontSize: "13px",
      cursor: "pointer",
      userSelect: "none",
    },
    presentStatus: { backgroundColor: "#16a34a", color: "#fff" },
    absentStatus: { backgroundColor: "#dc2626", color: "#fff" },
    sickStatus: { backgroundColor: "#4b5563", color: "#fff" },
    leaveStatus: { backgroundColor: "#facc15", color: "#000" },
  };

  const getStatusStyle = () => {
    switch (displayStatus) {
      case "Present":
        return { ...styles.statusBadge, ...styles.presentStatus };
      case "Absent":
        return { ...styles.statusBadge, ...styles.absentStatus };
      case "Sick":
        return { ...styles.statusBadge, ...styles.sickStatus };
      case "Leave":
        return { ...styles.statusBadge, ...styles.leaveStatus };
      default:
        return styles.statusBadge;
    }
  };

  /* ================= UI ================= */

  return (
    <div style={styles.container}>
      {isEditing ? (
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, ...styles.presentBtn }}
            onClick={() => markEmployee("Present")}
          >
            Present
          </button>

          <button
            style={{ ...styles.button, ...styles.absentBtn }}
            onClick={() => markEmployee("Absent")}
          >
            Absent
          </button>

          <button
            style={{ ...styles.button, ...styles.sickBtn }}
            onClick={() => markEmployee("Sick")}
          >
            Sick
          </button>

          <button
            style={{ ...styles.button, ...styles.leaveBtn }}
            onClick={() => markEmployee("Leave")}
          >
            Leave
          </button>
        </div>
      ) : (
        <div
          style={getStatusStyle()}
          onDoubleClick={() => setIsEditing(true)}
          title="Double click to edit attendance"
        >
          {displayStatus}
        </div>
      )}
    </div>
  );
};
