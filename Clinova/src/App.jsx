import { useState } from "react";
import { Route, Routes } from "react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/RegisterUser";
import Home from "./pages/Home";
import Specialists from "./pages/Specialists";
import Login from "./pages/Login";
// import PatientDashboard from "./components/Dashboard/PatientDashboard/PatientDashboard";

import Protected from "./utils/Protected";
import DashboardHome from "./components/Dashboard/DashboardHome";
import DashboardLayout from "./pages/DashboardLayout";

function App() {
   return (
      <>
         <ToastContainer
            autoClose={3000}
            theme="dark"
            className="my-toast-container"
            toastClassName="my-toast"
         />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/specialists" element={<Specialists />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<Protected />}>
               <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route path="/dashboard/patient" element={<h1>Patient</h1>} />
                  <Route path="/dashboard/doctor">
                     <Route path="/dashboard/doctor/home" element={<DashboardHome /> }/>
                     <Route path="/dashboard/doctor/manage-slots" element={<h1>Manage Slots</h1> }/>
                  </Route>
               </Route>
            </Route>
         </Routes>
      </>
   );
}

export default App;
