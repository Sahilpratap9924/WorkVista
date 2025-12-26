import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  const styles = {
    card: {
      display: "flex",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
    },
    iconBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.875rem", // text-3xl
      color: "#ffffff",
      paddingLeft: "16px",
      paddingRight: "16px",
      backgroundColor: color, // dynamic color
    },
    content: {
      paddingLeft: "16px",
      paddingTop: "4px",
      paddingBottom: "4px",
    },
    text: {
      fontSize: "1.125rem", // text-lg
      fontWeight: 600,
    },
    number: {
      fontSize: "1.25rem", // text-xl
      fontWeight: 700,
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.iconBox}>
        {icon}
      </div>

      <div style={styles.content}>
        <p style={styles.text}>{text}</p>
        <p style={styles.number}>{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
