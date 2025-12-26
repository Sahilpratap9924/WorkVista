import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {AiOutlineFileText} from "react-icons/ai"

const AdminSidebar = () => {
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
          to="/admin-dashboard"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
          end
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaUsers /> Employee
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaBuilding /> Department
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaCalendarAlt /> Leave
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaMoneyBillWave /> Salary
        </NavLink>
        <NavLink
          to="/admin-dashboard/attendance"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaRegCalendarAlt /> Attendance
        </NavLink>
        <NavLink
          to="/admin-dashboard/attendance-report"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <AiOutlineFileText /> Attendance Report
        </NavLink>

        <NavLink
          to="/admin-dashboard/setting"
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

export default AdminSidebar;
