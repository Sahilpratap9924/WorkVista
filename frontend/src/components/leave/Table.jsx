import React, { useEffect, useState } from "react";
import axios from "axios";
import { columns, LeaveButtons } from "../../utils/LeaveHelper.jsx";
import DataTable from "react-data-table-component";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves,setFilteredLeaves]=useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/leave/admin/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
        _id: leave._id,
        sno: sno++,
        employeeId: leave.employeeId?.employeeId || "N/A",
        name: leave.employeeId?.userId?.name || "N/A",
        leaveType: leave.leaveType,
        department: leave.employeeId?.department?.dep_name || "N/A",
        days:
    Math.ceil(
      (new Date(leave.toDate) - new Date(leave.fromDate)) /
        (1000 * 60 * 60 * 24)
    ) + 1,
  status: leave.status,
  action: <LeaveButtons _id={leave._id} />,
}));


        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      alert(
        error.response?.data?.error || "Failed to fetch leave data"
      );
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  /* ================= STYLES ================= */

  const styles = {
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
    buttonGroup: {
      display: "flex",
      gap: "8px",
    },
    button: {
      padding: "6px 12px",
      backgroundColor: "#0d9488",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
    },
  };



  /* ========================================== */
  const filterByInput = (e) =>{
    const data = leaves.filter((leave)=>leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredLeaves(data);

  }
  const filterByButton = (status) =>{
    const data = leaves.filter((leave)=>leave.status.toLowerCase().includes(status.toLowerCase()));
    setFilteredLeaves(data);

  }

  return (
    <>
      {filteredLeaves ? (
        <div>
          <h3 style={styles.title}>Manage Leaves</h3>

          <div style={styles.topBar}>
            <input
              type="text"
              placeholder="Search By Emp Id"
              style={styles.input}
              onChange={filterByInput}
            />

            <div style={styles.buttonGroup}>
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#0f766e")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#0d9488")
                }
                onClick={()=>filterByButton("Pending")}
              >
                Pending
              </button>

              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#0f766e")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#0d9488")
                }
                onClick={()=>filterByButton("Approved")}
              >
                Approved
              </button>

              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#0f766e")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#0d9488")
                }
                onClick={()=>filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <DataTable columns={columns} data={filteredLeaves} pagination />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
 export const getStatusBadge = (status) => {
  const baseStyle = {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
    display: "inline-block",
    minWidth: "80px",
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

export default Table;
