import React from "react";
import { useAuth } from "../context/authContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "48px",
      backgroundColor: "#0d9488",
      padding: "0 20px",
      color: "#ffffff",
      flexShrink: 0,
    },
    text: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    button: {
      padding: "4px 16px",
      backgroundColor: "#0f766e",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
  };

  return (
    <div style={styles.navbar}>
      <p style={styles.text}>Welcome {user?.name}</p>
      <button style={styles.button} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
