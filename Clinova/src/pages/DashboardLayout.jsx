import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";
import Main from "../components/Dashboard/Main";

function DashboardLayout() {
   const navigate = useNavigate();
   const location = useLocation();
   const { currentUser } = useSelector((state) => state.user);

   useEffect(() => {
      if (!currentUser || location.pathname !== "/dashboard") return;

      if (currentUser.role == "doctor") {
         navigate("/dashboard/doctor/home", { replace: true });
      }

      if (currentUser.role == "patient") {
         navigate("/dashboard/patient/home", { replace: true });
      }
   }, [currentUser, location.pathname, navigate]);

   if (!currentUser) return null;

   return (
      <div className="position-relative dashboardLayout">
         <Sidebar />
         <div className="d-flex flex-column flex-grow-1">
            <Header />
            <Main />
         </div>
      </div>
   );
}

export default DashboardLayout;
