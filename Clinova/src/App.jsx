import { useState } from "react";
import { Route, Routes } from "react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/RegisterUser";
import Home from "./pages/Home";
import Specialists from "./pages/Specialists";
import Login from "./pages/Login";
import PatientDashboard from "./components/Dashboard/patient/PatientDashboard";

import Protected from "./utils/Protected";
import DashboardHome from "./components/Dashboard/dcotor/DashboardHome";
import DashboardLayout from "./pages/DashboardLayout";
import ManageSlots from "./components/Dashboard/dcotor/ManageSlots";
import ProtectedHome from "./utils/ProtectedHome";

import FindDoctor from "./components/Dashboard/patient/FindDoctor";
import PatientAppointment from "./components/Dashboard/patient/patientAppointment";
import Appointments from "./components/Dashboard/dcotor/Appointments";
import Update from "./components/Dashboard/patient/Update";

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
                  {/* patient */}
                  <Route path="/dashboard/patient">
                     <Route
                        path="/dashboard/patient/home"
                        element={<PatientDashboard />}
                     />
                     <Route
                        path="/dashboard/patient/find-doctors"
                        element={<FindDoctor />}
                     />
                     <Route
                        path="/dashboard/patient/my-appointments"
                        element={<PatientAppointment />}
                     />

                     <Route path={`/dashboard/patient/update-profile/:id`} element={<Update/>}/>
                  </Route>

                  {/* doctor */}
                  <Route path="/dashboard/doctor" element={<ProtectedHome />}>
                     <Route
                        path="/dashboard/doctor/home"
                        element={<DashboardHome />}
                     />
                     <Route
                        path="/dashboard/doctor/manage-slots"
                        element={<ManageSlots />}
                     />

                     <Route path="/dashboard/doctor/appointments" element={<Appointments/>}/>
                  </Route>
               </Route>
            </Route>
         </Routes>
      </>
   );
}

export default App;
