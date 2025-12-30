import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  const [summary,setSummary] = useState(null)

  useEffect(()=>{
    const fetchSummary = async ()=>{
      try{const summary = await axios.get(`https://work-vista-lua88.vercel.app/api/dashboard/summary`,{
          headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
        
        })
        setSummary(summary.data);

      }
      catch(error){
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error.message);

      }
    }
    fetchSummary();

  },[])
  if(!summary){
    return <div>Loading...</div>
  }
  const styles = {
    container: {
      padding: "24px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "700",
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
      marginTop: "24px",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
      marginTop: "24px",
    },
    section: {
      marginTop: "48px",
    },
    centerHeading: {
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "700",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Section */}
      <h3 style={styles.heading}>Dashboard Overview</h3>

      <div style={styles.grid3}>
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="#0d9488" // teal
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="#ca8a04" // yellow
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Total Salary"
          number={summary.totalSalary}
          color="#16a34a" // green
        />
      </div>

      {/* Leave Section */}
      <div style={styles.section}>
        <h4 style={styles.centerHeading}>Leave Details</h4>

        <div style={styles.grid2}>
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="#0d9488"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="#16a34a"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="#ca8a04"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="#dc2626"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
