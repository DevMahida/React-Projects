import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   changeAvailability,
   changeStatus,
   fetchAppointment,
   fetchSlots,
} from "../../../features/appointment.slice";
import { fetchDoctors } from "../../../features/auth.slice";

function PatientAppointment() {
   useEffect(() => {
      document.title = "My Appointments";
   }, []);

   const dispatch = useDispatch();
   const { currentUser } = useSelector((state) => state.user);
   const { appointments } = useSelector((state) => state.appointment);
   const { doctors } = useSelector((state) => state.user);
   const { slots } = useSelector((state) => state.appointment);

   const DoctorName = (docID) => {
      const doctor = doctors.find((item) => item.id === docID);

      return doctor?.name || "unknown";
   };

   const cancelAppointment = async (appointment) => {
      try {
         const doctorSlots = await dispatch(
            fetchSlots(appointment.doctorID),
         ).unwrap();

         const slot = doctorSlots.find(
            (item) => item.id === appointment.slotID,
         );

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
               status: "cancelled",
            }),
         ).unwrap();
      } catch (error) {
         console.error("Could not cancel appointment:", error);
      }
   };

   useEffect(() => {
      if (currentUser?.id) {
         dispatch(fetchAppointment(currentUser.id));
      }
      dispatch(fetchDoctors());
   }, [dispatch, currentUser?.id]);

   return (
      <>
         <section className="text-white m-4">
            {/* title */}
            <h3>
               My <span className="text-highlight">Appointments</span>
            </h3>

            <div className=" table-responsive overflow-auto mt-4">
               <table className="table table-dark custom-table">
                  <thead>
                     <tr>
                        <th scope="col">Appointment ID</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {appointments.length == 0 ? (
                        <tr>
                           <td colSpan={5}>No Data</td>
                        </tr>
                     ) : (
                        appointments.map((items, key) => (
                           <tr key={key}>
                              <td>{items.id}</td>
                              <td>{DoctorName(items.doctorID)}</td>
                              <td>{items.date}</td>
                              <td>{items.time}</td>
                              <td
                                 className={`text-capitalize 
                                  ${
                                     items.status == "confirmed" ||
                                     items.status == "completed"
                                        ? "text-highlight"
                                        : "text-danger"
                                  }`}
                              >
                                 {items.status}
                              </td>
                              <td>
                                 <button
                                    className="btn btn-outline-danger"
                                    onClick={() => cancelAppointment(items)}
                                    disabled={
                                       items.status == "rejected" ||
                                       items.status == "cancelled" ||
                                       items.status == "completed"
                                          ? true
                                          : false
                                    }
                                 >
                                    Cancel
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </section>
      </>
   );
}

export default PatientAppointment;
