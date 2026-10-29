import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { fetchAppointmentDoc } from "../../../features/appointment.slice";

function DashboardHome() {
   useEffect(() => {
      document.title = "Dashboard";
   }, []);

   const { currentUser } = useSelector((state) => state.user);
   const { appointments } = useSelector((state) => state.appointment);

   const currentDate = new Date();
   const minimumDate = [
      currentDate.getFullYear(),
      String(currentDate.getMonth() + 1).padStart(2, "0"),
      String(currentDate.getDate()).padStart(2, "0"),
   ].join("-");

   // display date and time
   const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-GB", {
         day: "2-digit",
         month: "short",
         year: "numeric",
      }).format(new Date(`${date}T00:00:00`));
   };

   const PendingAppointment = appointments.filter(
      (appointment) => appointment.status == "pending" ?? appointment,
   );
   const ConfirmedAppointment = appointments.filter(
      (appointment) => appointment.status == "confirmed" ?? appointment,
   );
   const CompletedAppointment = appointments.filter(
      (appointment) => appointment.status == "completed" ?? appointment,
   );
   const TodayAppointment = appointments.filter(
      (appointment) =>
         (appointment.date == formatDate(minimumDate) &&
            appointment.status == "confirmed") ??
         appointment,
   );

   console.log("Today:- ", TodayAppointment);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (currentUser?.id) {
         dispatch(fetchAppointmentDoc(currentUser?.id));
      }
   }, [dispatch]);

   return (
      <>
         {/* welcome */}
         <section>
            <div className="container mt-3">
               <h2 className="display-5 fw-bold text-white">
                  Welcome to Clinova,{" "}
                  <span className="text-highlight">{currentUser.name}</span>
               </h2>
            </div>
         </section>

         {/* view profile */}
         <section className="text-white">
            <div className="container">
               <div className="bg-dark p-4 mt-5 rounded-3 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                  {/* pfp and data */}
                  <div className="d-flex gap-3">
                     {/* pfp */}
                     <span
                        className="d-inline-block"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                     >
                        <img
                           className={"profileDoctor profileDoctorDashboard"}
                           src={currentUser.image}
                           alt="user picture"
                        />
                     </span>

                     {/* name, email, location */}
                     <div className="d-flex flex-column mt">
                        <h2>{currentUser.name}</h2>
                        <span className="text-cs-gray">
                           {currentUser.email}
                        </span>
                        <span className="text-cs-gray">
                           Location: {currentUser.location}
                        </span>
                     </div>
                  </div>

                  {/* experience, qualification, specialization */}
                  <div className="d-flex flex-column me-5">
                     <span className="text-cs-gray mb-1">
                        Experience:{" "}
                        <span className="text-white">
                           {currentUser.experience} Years
                        </span>
                     </span>
                     <span className="text-cs-gray mb-1">
                        Qualification:{" "}
                        <span className="text-white">
                           {currentUser.qualification}
                        </span>
                     </span>
                     <span className="text-cs-gray">
                        Specialization:{" "}
                        <span className="text-white">
                           {currentUser.specialization}
                        </span>
                     </span>
                  </div>
               </div>
            </div>
         </section>

         {/* cards */}
         <section className="my-3">
            <div className="container">
               <div className="row g-3">
                  {/* pending request */}
                  <div className="col-lg-4">
                     <div className="bg-dark p-2 rounded-3 text-white position-relative">
                        <Link
                           className="position-absolute top-0 bottom-0 start-0 end-0"
                           to="/dashboard/doctor/appointments"
                        ></Link>
                        <h4 className="m-0 text-center">Pending Request</h4>
                        <p className="text-center my-3 display-5 text-danger">
                           {PendingAppointment.length}
                        </p>
                     </div>
                  </div>

                  {/* confirmed request  */}
                  <div className="col-lg-4">
                     <div className="bg-dark p-2 rounded-3 text-white position-relative">
                        <Link
                           className="position-absolute top-0 bottom-0 start-0 end-0"
                           to="/dashboard/doctor/appointments"
                        ></Link>
                        <h4 className="m-0 text-center">Confirmed Request</h4>
                        <p className="text-center my-3 display-5 ">
                           {ConfirmedAppointment.length}
                        </p>
                     </div>
                  </div>

                  {/* completed request */}
                  <div className="col-lg-4">
                     <div className="bg-dark p-2 rounded-3 text-white position-relative">
                        <Link
                           className="position-absolute top-0 bottom-0 start-0 end-0"
                           to="/dashboard/doctor/appointments"
                        ></Link>
                        <h4 className="m-0 text-center">Compeleted Request</h4>
                        <p className="text-center my-3 display-5">
                           {CompletedAppointment.length}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* today's appointments */}
         <section className="my-3">
            <div className="container Appointment bg-dark p-3 rounded-3 text-white">
               <h2>Today's Appointment</h2>

               <div className="row g-3 mt-4">
                  {TodayAppointment.length == 0 ? (
                     <p className="text-center">No Appointments Today</p>
                  ) : (
                     TodayAppointment.map((items, key) => (
                        <div key={key} className="col-12">
                           <div className="bg-header rounded-3 p-3">
                              <div className="d-flex justify-content-between">
                                 <p className="text-cs-gray">
                                    Date:{" "}
                                    <span className="text-white">
                                       {items.date}
                                    </span>
                                 </p>
                                 <p className="text-cs-gray">
                                    Time:{" "}
                                    <span className="text-white">
                                       {items.time}
                                    </span>
                                 </p>
                              </div>
                              <div className="text-cs-gray">
                                 <span>Purpose:</span>
                                 <p className="text-white">{items.reason}</p>
                              </div>
                           </div>
                        </div>
                     ))
                  )}
               </div>
            </div>
         </section>
      </>
   );
}

export default DashboardHome;
