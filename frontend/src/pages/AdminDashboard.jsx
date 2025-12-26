import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import Navbar from "../components/Navbar.jsx";

const AdminDashboard = () => {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const styles = {
    layout: {
      display: "flex",
      height: "100vh",
      width: "100%",
      overflow: "hidden",
    },
    content: {
      flex: 1,
      display: "flex",
      minHeight: "100dvh",
      flexDirection: "column",
      backgroundColor: "#f3f4f6",
    },
    outlet: {
      flex: 1,
      minHeight: "100dvh",
      overflowY: "auto",
      padding: "16px",
    },
  };

  return (
    <div style={styles.layout}>
      <AdminSidebar />
      <div style={styles.content}>
        <Navbar />
        <div style={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
