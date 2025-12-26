import React from "react";

const Navbar = () => {
  return (
    <>
      <style>{`
        .navbar {
          width: 100%;
          height: 56px;
          background: #14b8a6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1100;
        }
        .navbar-title {
          font-size: 22px;
          font-weight: bold;
          font-family: cursive;
        }
        .navbar-links {
          display: flex;
          gap: 24px;
        }
        .navbar-link {
          color: white;
          text-decoration: none;
          font-size: 16px;
          transition: text-decoration 0.2s;
        }
        .navbar-link:hover {
          text-decoration: underline;
        }
      `}</style>
      <div className="navbar">
        <div className="navbar-title">EMS</div>
        <div className="navbar-links">
          <a href="/admin-dashboard" className="navbar-link">Dashboard</a>
          <a href="/profile" className="navbar-link">Profile</a>
          <a href="/logout" className="navbar-link">Logout</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
