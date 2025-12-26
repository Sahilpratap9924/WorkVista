import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const {user} = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.employeeId
        .toLowerCase()
        .includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  /* ================= STYLES ================= */

  const containerStyle = {
    overflowX: "auto",
    padding: "20px",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const inputStyle = {
    border: "1px solid #d1d5db",
    padding: "4px 8px",
    borderRadius: "6px",
    marginBottom: "15px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    color: "#374151",
  };

  const theadStyle = {
    backgroundColor: "#f9fafb",
    textTransform: "uppercase",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
  };

  const thStyle = {
    padding: "12px 24px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "12px 24px",
    borderBottom: "1px solid #e5e7eb",
  };

  const rowStyle = {
    backgroundColor: "#ffffff",
  };

  /* ========================================== */

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading ...</div>
      ) : (
        <div style={containerStyle}>
          <h2 style={titleStyle}>Salary History</h2>

          <input
            type="text"
            placeholder="Search by Employee ID"
            style={inputStyle}
            onChange={filterSalaries}
          />

          {filteredSalaries.length > 0 ? (
            <table style={tableStyle}>
              <thead style={theadStyle}>
                <tr>
                  <th style={thStyle}>SNO</th>
                  <th style={thStyle}>Employee ID</th>
                  <th style={thStyle}>Salary</th>
                  <th style={thStyle}>Allowance</th>
                  <th style={thStyle}>Deductions</th>
                  <th style={thStyle}>Total Salary</th>
                  <th style={thStyle}>Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr key={salary._id} style={rowStyle}>
                    <td style={tdStyle}>{sno++}</td>
                    <td style={tdStyle}>
                      {salary.employeeId.employeeId}
                    </td>
                    <td style={tdStyle}>{salary.basicSalary}</td>
                    <td style={tdStyle}>{salary.allowances}</td>
                    <td style={tdStyle}>{salary.deductions}</td>
                    <td style={tdStyle}>{salary.netSalary}</td>
                    <td style={tdStyle}>
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Records</div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
