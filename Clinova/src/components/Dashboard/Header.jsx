import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth.slice";
import { useNavigate, Link } from "react-router";

import patientPFP from "../../assets/user.png";

function Header() {
   const { currentUser } = useSelector((state) => state.user);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/login", { replace: true });
   };

   return (
      <>
         <header className="bg-cs-primary Header position-sticky top-0 border-bottom border-dark z-3">
            {/* profile */}
            <div className="dropdown text-end">
               
               {/* icon */}
               <span
                  className="d-inline-block"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  <img
                     className={
                        currentUser.role == "doctor"
                           ? "profileDoctor"
                           : "profilePatient"
                     }
                     src={currentUser.image ? currentUser.image : patientPFP}
                     alt="user picture"
                  />
               </span>
               
               {/* modal */}
               <ul className="dropdown-menu p-1">
                  <li className="p-1">
                     <button
                        className="dropdown-item cs-btn logoutBtn rounded-2"
                        onClick={handleLogout}
                     >
                        <i className="ri-logout-box-r-line text-danger fs-5"></i>
                        <span>Logout</span>
                     </button>
                  </li>
               </ul>
            </div>
         </header>
      </>
   );
}

export default Header;
