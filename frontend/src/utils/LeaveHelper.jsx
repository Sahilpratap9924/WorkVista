import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getStatusBadge} from "../components/leave/Table.jsx"

/* ================= TABLE COLUMNS ================= */

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "150px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "150px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "170px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "100px",
  },
  {
    name: "Status",
    selector: (row) => getStatusBadge(row.status),
    width: "120px",
  },
  {
    name: "Action",
    cell: (row) => row.action,
    center: true,
  },
];

/* ================= ACTION BUTTON ================= */

export const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  const styles = {
    button: {
      padding: "6px 16px",
      backgroundColor: "#14b8a6", // teal-500
      borderRadius: "6px",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
  };

  return (
    <button
      style={styles.button}
      onClick={() => handleView(_id)}
      onMouseEnter={(e) =>
        (e.target.style.backgroundColor = "#0d9488") // teal-600
      }
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = "#14b8a6")
      }
    >
      View
    </button>
  );
};
