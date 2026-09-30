import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function PatientDashboard() {
   const patient = useSelector((state) => state.patient.users);

   const navigate = useNavigate();

   useEffect(() => {
      if (!patient) {
         navigate("/login");
      }
   }, [patient, navigate]);

   if (!patient) return null;

   return (
      <div>
         <h1>Welcome Patient, {patient.name}</h1>
      </div>
   );
}

export default PatientDashboard;
