import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }

      const response = await axios.get(
        `http://localhost:5000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prev) => ({
            ...prev,
            ...response.data.groupData,
          }));
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoadMore = () => {
    setSkip((prev) => prev + limit);
  };

  /* ================= STYLES ================= */

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "40px",
      backgroundColor: "#ffffff",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "26px",
      fontWeight: "700",
      marginBottom: "30px",
    },
    filterBox: {
      marginBottom: "25px",
    },
    filterTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "6px",
    },
    dateInput: {
      padding: "6px 10px",
      border: "1px solid #ccc",
      backgroundColor: "#f3f4f6",
      borderRadius: "4px",
      fontSize: "14px",
    },
    dateHeading: {
      fontSize: "20px",
      fontWeight: "600",
      marginTop: "25px",
    },
    table: {
      width: "100%",
      marginTop: "12px",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#f3f4f6",
      fontWeight: "600",
      padding: "10px",
      border: "1px solid #ccc",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    loadMoreBtn: {
      marginTop: "30px",
      padding: "8px 18px",
      border: "1px solid #ccc",
      backgroundColor: "#f3f4f6",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      borderRadius: "4px",
    },
    loading: {
      fontSize: "16px",
      fontWeight: "500",
    },
  };

  /* ================= UI ================= */

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Attendance Report</h2>

      <div style={styles.filterBox}>
        <h2 style={styles.filterTitle}>Filter By Date</h2>
        <input
          type="date"
          style={styles.dateInput}
          onChange={(e) => {
            setSkip(0);
            setDateFilter(e.target.value);
          }}
        />
      </div>

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        Object.entries(report).map(([date, record]) => (
          <div key={date}>
            <h2 style={styles.dateHeading}>{date}</h2>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>S No</th>
                  <th style={styles.th}>Employee ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {record.map((data, i) => (
                  <tr key={data.employeeId}>
                    <td style={styles.td}>{i + 1}</td>
                    <td style={styles.td}>{data.employeeId}</td>
                    <td style={styles.td}>{data.employeeName}</td>
                    <td style={styles.td}>{data.departmentName}</td>
                    <td style={styles.td}>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      <button style={styles.loadMoreBtn} onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default AttendanceReport;
