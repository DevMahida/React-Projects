import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   changeAvailability,
   changeStatus,
   fetchAppointmentDoc,
   fetchSlots,
} from "../../../features/appointment.slice";
import { fetchPatient } from "../../../features/auth.slice";

function Appointments() {
   useEffect(() => {
      document.title = "My Appointments";
   }, []);

   const dispatch = useDispatch();

   const { currentUser } = useSelector((state) => state.user);
   const { appointments } = useSelector((state) => state.appointment);
   const { patient } = useSelector((state) => state.user);
   const { slots } = useSelector((state) => state.appointment);

   const patientData = (patientID) => {
      const Patient = patient.find((item) => item.id === patientID);

      return Patient || "unknown";
   };

   const acceptAppointment = async (appointment) => {
      let slot = slots.find((item) => item.id == appointment.slotID);
      //change slot availibility
      try {
         if (slot) {
            await dispatch(
               changeAvailability({
                  slotID: slot.id,
                  available: false,
               }),
            ).unwrap();
         }

         await dispatch(
            changeStatus({
               appointmentID: appointment.id,
               status: "confirmed",
            }),
         ).unwrap();

         const competingAppointments = appointments.filter(
            (item) =>
               item.id !== appointment.id &&
               item.slotID === appointment.slotID &&
               item.status === "pending",
         );

         for (const competing of competingAppointments) {
            await dispatch(
               changeStatus({
                  appointmentID: competing.id,
                  status: "rejected",
               }),
            ).unwrap();
         }
      } catch (error) {
         console.error("Could not accept appointment:", error);
      }
   };

   const completeAppointment = async (appointment) => {
      let slot = slots.find((item) => item.id == appointment.slotID);
      try {
         if (slot) {
            await dispatch(
               changeAvailability({
                  slotID: slot.id,
                  available: true,
               }),
            ).unwrap();
         }

         await dispatch(
            changeStatus({
               appointmentID: appointment.id,
               status: "completed",
            }),
         ).unwrap();
      } catch (error) {
         console.error("Could not complete appointment:", error);
      }
   };

   const rejectAppointment = async (appointment) => {
      let slot = slots.find((item) => item.id == appointment.slotID);
      try {
         if (slot) {
            await dispatch(
               changeAvailability({
                  slotID: slot.id,
                  available: true,
               }),
            ).unwrap();
         }

         await dispatch(
            changeStatus({
               appointmentID: appointment.id,
               status: "rejected",
            }),
         ).unwrap();
      } catch (error) {
         console.error("Could not reject appointment:", error);
      }
   };

   useEffect(() => {
      if (currentUser?.id) {
         dispatch(fetchAppointmentDoc(currentUser.id));
      }
      dispatch(fetchPatient());
   }, [dispatch]);

   useEffect(() => {
      if (currentUser?.id) {
         dispatch(fetchSlots(currentUser?.id));
      }
   }, [dispatch]);

   return (
      <>
         <section className="text-white m-4">
            {/* title */}
            <h3>
               My <span className="text-highlight">Appointments</span>
            </h3>

            {/* appointments */}
            <div>
               {appointments.length == 0 ? (
                  <div>No Appointments</div>
               ) : (
                  appointments.map((items, key) => (
                     <div
                        className="bg-dark px-4 py-3 mt-3 rounded-3"
                        key={key}
                     >
                        {/* data */}
                        <div className="d-flex justify-content-between align-items-center">
                           {/* patient detials*/}
                           <div>
                              <h3 className="m-0">
                                 {patientData(items.patientID).name}
                              </h3>
                              <span className="small text-cs-gray d-block">
                                 {patientData(items.patientID).email}
                              </span>
                              <span className="small text-cs-gray">
                                 {patientData(items.patientID).mNumber}
                              </span>
                           </div>

                           {/* appointment data */}
                           <div>
                              <p className="m-0">
                                 Date:{" "}
                                 <span className="text-cs-gray">
                                    {items.date}
                                 </span>
                              </p>
                              <p className="m-0">
                                 Date:{" "}
                                 <span className="text-cs-gray">
                                    {items.time}
                                 </span>
                              </p>
                              <p className="m-0 text-capitalize">
                                 Status:{" "}
                                 <span
                                    className={
                                       items.status == "confirmed" ||
                                       items.status == "completed"
                                          ? "text-highlight"
                                          : "text-danger"
                                    }
                                 >
                                    {items.status}
                                 </span>
                              </p>
                           </div>
                        </div>

                        {/* reason - btns */}

                        <div className="mt-2 bg-header px-4 py-3 rounded-3 d-flex justify-content-between align-items-center">
                           {/* reason */}
                           <div>
                              <span>{items.reason}</span>
                           </div>
                           <div className="d-flex gap-3">
                              <button
                                 className="btn btn-outline-cs-highlighted"
                                 onClick={
                                    items.status == "pending"
                                       ? () => acceptAppointment(items)
                                       : () => completeAppointment(items)
                                 }
                                 disabled={
                                    items.status == "cancelled" ||
                                    items.status == "completed" ||
                                    items.status == "rejected"
                                       ? true
                                       : false
                                 }
                              >
                                 {items.status == "pending"
                                    ? "Accept"
                                    : "Complete"}
                              </button>
                              <button
                                 className="btn btn-outline-danger"
                                 onClick={() => rejectAppointment(items)}
                                 disabled={
                                    items.status == "confirmed" ||
                                    items.status == "cancelled" ||
                                    items.status == "completed" ||
                                    items.status == "rejected"
                                       ? true
                                       : false
                                 }
                              >
                                 Reject
                              </button>
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </section>
      </>
   );
}

export default Appointments;
