import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth.slice";
import { useNavigate, Link } from "react-router";

function Sidebar() {
   const { currentUser } = useSelector((state) => state.user);

   return (
      <aside className="text-light sidebar position-sticky border-end border-dark top-0 start-0 bottom-0 ">
         {/* logo - title */}
         <div className="p-3 d-flex align-items-center gap-3 border-bottom border-dark">
            {/* img */}
            <div>
               <img src="/favicon.png" alt="logo" width={"50px"} />
            </div>
            <div>
               <h2 className="m-0 h3">Clinova</h2>
               <p className="small m-0 text-cs-gray">HEALTH SYSTEM</p>
            </div>
         </div>

         {/* navs */}
         <div className="p-3">
            <ul className="nav flex-column">
               <li className="nav-item">
                  <Link
                     to={
                        currentUser.role == "doctor"
                           ? "/dashboard/doctor/home"
                           : "/dashboard/patient/home"
                     }
                     className="nav-link side-links gap-3 align-items-center"
                  >
                     <i className="ri-dashboard-line fs-5"></i>
                     <span>Dashboard</span>
                  </Link>
               </li>
               <li className="nav-item">
                  <Link
                     to={
                        currentUser.role == "doctor"
                           ? "/dashboard/doctor/manage-slots"
                           : "/dashboard/patient/find-doctors"
                     }
                     className="nav-link side-links gap-3 align-items-center"
                     href="#"
                  >
                     <i className="ri-timer-line fs-5"></i>
                     <span>
                        {currentUser.role == "doctor"
                           ? "Manage Slots"
                           : "Find Doctor"}
                     </span>
                  </Link>
               </li>
               <li className="nav-item">
                  <Link
                     to={
                        currentUser.role == "doctor"
                           ? "/dashboard/doctor/appointments"
                           : "/dashboard/patient/my-appointments"
                     }
                     className="nav-link side-links gap-3 align-items-center"
                  >
                     <i className="ri-calendar-event-line fs-5"></i>
                     <span>Appointments</span>
                  </Link>
               </li>
            </ul>
         </div>
      </aside>
   );
}

export default Sidebar;
