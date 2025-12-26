import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext.jsx";

const SummaryCard = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        padding: "18px 24px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        maxWidth: "600px",
        marginBottom: "24px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #0d9488, #14b8a6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: "26px",
          flexShrink: 0,
        }}
      >
        <FaUser />
      </div>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#6b7280",
            marginBottom: "4px",
          }}
        >
          Welcome Back
        </span>

        <span
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "0.3px",
          }}
        >
          {user?.name || "User"}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
