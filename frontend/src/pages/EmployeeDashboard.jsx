import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import SummaryCard from '../components/EmployeeDashboard/Summary.jsx';


const EmployeeDashboard = () => {
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
      <Sidebar />
      <div style={styles.content}>
        <Navbar />
        {/* <div style={{marginTop:"10px"}}>
          <SummaryCard />
        </div>
         */}
        <div style={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
