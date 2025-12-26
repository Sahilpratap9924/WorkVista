import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
} from "react-icons/fa";

const Sidebar = () => {
    const {user}=useAuth();
  const styles = {
    sidebar: {
      width: "260px",
      height: "100vh",
      backgroundColor: "#1f2933",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0, // 🔑 prevents overlap
    },
    header: {
      backgroundColor: "#0d9488",
      height: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      fontWeight: "700",
    },
    nav: {
      marginTop: "16px",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "6px",
      transition: "background 0.2s",
    },
    active: {
      backgroundColor: "#14b8a6",
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>Employee MS</div>

      <nav style={styles.nav}>
        <NavLink
          to="/employee-dashboard"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
          end
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaUsers /> My Profile
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaBuilding /> Leaves
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaCalendarAlt /> Salary
        </NavLink>


        <NavLink
          to="/employee-dashboard/setting"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaCogs /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
