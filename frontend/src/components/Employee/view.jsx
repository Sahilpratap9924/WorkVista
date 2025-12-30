import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://work-vista-lua88.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee");
      }
    };
    fetchEmployee();
  }, [id]);

  const styles = {
    container: {
      maxWidth: "768px",        // max-w-3xl
      margin: "40px auto",      // mx-auto mt-10
      backgroundColor: "#fff",
      padding: "32px",          // p-8
      borderRadius: "6px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: "24px",         // text-2xl
      fontWeight: "700",        // font-bold
      marginBottom: "32px",     // mb-8
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

  return (
    <>
      {employee ? (
        <div style={styles.container}>
          <h2 style={styles.heading}>Employee Details</h2>

          <div style={styles.grid}>
            <div>
              <img
                src={`https://work-vista-lua88.vercel.app/uploads/${employee.userId.profileImage}`}
                alt="Employee"
                style={styles.image}
              />
            </div>

            <div>
              <div style={styles.row}>
                <p style={styles.label}>Name:</p>
                <p style={styles.value}>{employee.userId.name}</p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Employee ID:</p>
                <p style={styles.value}>{employee.employeeId}</p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Date of Birth:</p>
                <p style={styles.value}>
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Gender:</p>
                <p style={styles.value}>{employee.gender}</p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Department:</p>
                <p style={styles.value}>
                  {employee.department?.dep_name}
                </p>
              </div>

              <div style={styles.row}>
                <p style={styles.label}>Marital Status:</p>
                <p style={styles.value}>{employee.maritalStatus}</p>
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

export default View;
