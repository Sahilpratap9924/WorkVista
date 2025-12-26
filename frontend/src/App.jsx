import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import AuthContext from "./context/authContext.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBasedRoutes from "./utils/RoleBasedRoutes.jsx";
import AdminSummary from "./components/AdminSummary.jsx";
import DepartmentList from "./components/Departments/DepartmentList.jsx";
import AddDepartment from "./components/Departments/AddDepartment.jsx";
import EditDepartment from "./components/Departments/EditDepartment.jsx";
import EmployeeList from "./components/Employee/employeeList.jsx";
import AddEmployee from "./components/Employee/addEmployee.jsx";
import View from "./components/Employee/view.jsx";
import Edit from "./components/Employee/Edit.jsx";
import AddSalary from "./components/salary/Add.jsx";
import ViewSalary from "./components/salary/View.jsx";
import SummaryCard from "./components/EmployeeDashboard/Summary.jsx";
import LeaveList from "./components/leave/List.jsx";
import AddLeave from "./components/leave/Add.jsx";
import Setting from "./components/EmployeeDashboard/Setting.jsx"
import Table from "./components/leave/Table.jsx";
import Details from "./components/leave/Details.jsx";
import Attendance from "./components/attendance/Attendance.jsx";
import AttendanceReport from "./components/attendance/AttendanceReport.jsx";

function App() {

  return (
    <AuthContext>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={"admin"}>
              <AdminDashboard />
            </RoleBasedRoutes>           
          </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>
            <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
            <Route path="/admin-dashboard/add-departments" element={<AddDepartment />}></Route>
            <Route path="/admin-dashboard/departments/:id" element={<EditDepartment />}></Route>
            <Route path="/admin-dashboard/employees" element={<EmployeeList />}></Route>
            <Route path="/admin-dashboard/add-employees" element={<AddEmployee />}></Route>
            <Route path="/admin-dashboard/employees/:id" element={<View />}></Route>
            <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>
            <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>
            <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
            <Route path="/admin-dashboard/leaves" element={<Table />}></Route>  
            <Route path="/admin-dashboard/leaves/:id" element={<Details />}></Route> 
            <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>
            <Route path="/admin-dashboard/setting" element={<Setting />}></Route>
            <Route path="/admin-dashboard/attendance" element={<Attendance />}></Route>
            <Route path="/admin-dashboard/attendance-report" element={<AttendanceReport />}></Route>

          </Route>
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoutes>           
          </PrivateRoutes>
          
          }>
            <Route index element={<SummaryCard />}></Route>
            <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
            <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
            <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
            <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
            <Route path="/employee-dashboard/setting" element={<Setting />}></Route>

          </Route>
      </Routes>
      </BrowserRouter>
    </AuthContext> 
  )
}

export default App
