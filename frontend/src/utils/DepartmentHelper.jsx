import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({_id, onDepartmentDelete}) => {
  const styles = {
    container: {
      display: "flex",
      gap: "12px", // space-x-3
    },
    editBtn: {
      padding: "4px 12px", // px-3 py-1
      backgroundColor: "#0d9488", // teal-600
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    deleteBtn: {
      padding: "4px 12px",
      backgroundColor: "#dc2626", // red-600
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
  };
  const navigate = useNavigate(); 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    if (!confirmDelete) return;
    try{
        const response = await axios.delete(`https://work-vista-lua88.vercel.app/api/departments/${id}`,{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
            onDepartmentDelete();
        }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }
  }
  return (
    <div style={styles.container}>
      <button style={styles.editBtn}
      onClick={()=>
        navigate(`/admin-dashboard/departments/${_id}`)
      }>Edit</button>
      <button style={styles.deleteBtn} onClick={()=>handleDelete(_id)}>Delete</button>
    </div>
  );
};