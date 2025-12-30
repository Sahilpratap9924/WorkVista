import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    userId: user?._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
      return;
    }

    try {
      const response = await axios.put(
        "https://work-vista-lua88.vercel.app/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("password changed successfully");
  localStorage.removeItem("token");
  navigate("/login");
}

    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(
          error.response.data.message ||
            error.response.data.error ||
            "Password change failed"
        );
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  /* ================= STYLES ================= */

  const styles = {
    container: {
      maxWidth: "768px",
      width: "384px",
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
    error: {
      color: "#ef4444",
      marginBottom: "16px",
      fontSize: "14px",
    },
    field: {
      marginBottom: "16px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      display: "block",
      marginBottom: "4px",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
    },
    buttonWrapper: {
      marginTop: "16px",
    },
    button: {
      width: "100%",
      backgroundColor: "#0d9488",
      color: "#ffffff",
      fontWeight: "700",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  /* ========================================== */

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Change Password</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>Old Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.buttonWrapper}>
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
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
