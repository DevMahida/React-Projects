import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchAppointment } from "../../../features/appointment.slice";

function PatientDashboard() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { currentUser } = useSelector((state) => state.user);
   const { appointments } = useSelector((state) => state.appointment);

   console.log("Appointments:-", appointments);

   const currentDate = new Date();
   const today = [
      currentDate.getFullYear(),
      String(currentDate.getMonth() + 1).padStart(2, "0"),
      String(currentDate.getDate()).padStart(2, "0"),
   ].join("-");

   const convertDate = (dateString) => {
      const date = new Date(dateString);

      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
   };

   console.log("Date:-", today);

   const upcomingAppointments = appointments.filter(
      (appointment) =>
         (convertDate(appointment.date) >= today &&
            appointment.status == "confirmed") ??
         appointment,
   );

   const pastAppointments = appointments.filter(
      (appointment) =>
         (convertDate(appointment.date) < today &&
            appointment.status == "completed") ??
         appointment,
   );

   const cancelledAppointments = appointments.filter(
      (appointment) => appointment.status == "cancelled" ?? appointment,
   );

   const updatebtn = () => {
      navigate(`/dashboard/patient/update-profile/${currentUser.id}`)
   }

   useEffect(() => {
      if (currentUser?.id) {
         dispatch(fetchAppointment(currentUser?.id));
      }
   }, [dispatch]);

   return (
      <>
         {/* welcome  */}
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
               <div className="bg-dark p-4 mt-5 rounded-3 d-flex flex-wrap gap-3 justify-content-between align-items-baseline">
                  {/* pfp and data */}
                  <div className="d-flex gap-3">
                     {/* name, email */}
                     <div className="d-flex flex-column mt">
                        <h2>{currentUser.name}</h2>
                        <span className="text-cs-gray">
                           Email:{" "}
                           <span className="text-white">
                              {currentUser.email}
                           </span>
                        </span>
                     </div>
                  </div>

                  {/* Location, mobile number */}
                  <div className="d-flex flex-column me-5 gap-2">
                     <span className="text-cs-gray">
                        Location:{" "}
                        <span className="text-white">
                           {currentUser.location}
                        </span>
                     </span>
                     <span className="text-cs-gray">
                        Mobile Number:{" "}
                        <span className="text-white">
                           {currentUser.mNumber}
                        </span>
                     </span>

                     {/* btn */}
                     <div>
                        <button className="btn-highlighted" onClick={updatebtn}>Update</button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* appointments */}
         <section className="mt-5">
            <div className="container">
               <div className="row">
                  {/* upcoming appointments */}
                  <div className="col-lg-6">
                     <div className="bg-dark p-3 mb-3 rounded-3 text-white">
                        {/* title */}
                        <div>
                           <h3>
                              Upcoming{" "}
                              <span className="text-highlight">
                                 Appointments
                              </span>
                           </h3>
                        </div>

                        {/* upcoming appointments */}
                        <div className="row m-2 h-300 g-3 overflow-auto">
                           {upcomingAppointments.length == 0 ? (
                              <div className="text-center mt-3">
                                 <span>No Upcoming Appointments</span>
                              </div>
                           ) : (
                              upcomingAppointments.map((item, key) => (
                                 <div key={key} className="col-12">
                                    <div className="upcomingCard p-3 rounded-2 text-white">
                                       <p className="m-0">
                                          DoctorID:{" "}
                                          <span className="text-highlight">
                                             {item.doctorID}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Date:{" "}
                                          <span className="text-highlight">
                                             {item.date}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Time:{" "}
                                          <span className="text-highlight">
                                             {item.time}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Reason:{" "}
                                          <span className="text-highlight">
                                             {item.reason}
                                          </span>
                                       </p>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  </div>

                  {/* past appointments */}
                  <div className="col-lg-6">
                     <div className="bg-dark p-3 mb-3 rounded-3 text-white">
                        {/* title */}
                        <div>
                           <h3>
                              Past{" "}
                              <span className="text-highlight">
                                 Appointments
                              </span>
                           </h3>
                        </div>

                        {/* Past appointemts */}
                        <div className="row m-2 h-300 g-3 overflow-auto">
                           {pastAppointments.length == 0 ? (
                              <div className="text-center mt-3">
                                 <span>No Past Appointments</span>
                              </div>
                           ) : (
                              pastAppointments.map((item, key) => (
                                 <div key={key} className="col-12">
                                    <div className="upcomingCard p-3 rounded-2 text-white">
                                       <p className="m-0">
                                          DoctorID:{" "}
                                          <span className="text-highlight">
                                             {item.doctorID}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Date:{" "}
                                          <span className="text-highlight">
                                             {item.date}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Time:{" "}
                                          <span className="text-highlight">
                                             {item.time}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Reason:{" "}
                                          <span className="text-highlight">
                                             {item.reason}
                                          </span>
                                       </p>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  </div>

                  {/* cancelled appointments */}
                  <div className="col-lg-6">
                     <div className="bg-dark p-3 mb-3 rounded-3 text-white">
                        {/* title */}
                        <div>
                           <h3>
                              Cancelled{" "}
                              <span className="text-highlight">
                                 Appointments
                              </span>
                           </h3>
                        </div>

                        {/* Cancelled Appointments */}
                        <div className="row m-2 h-300 g-3 overflow-auto">
                           {cancelledAppointments.length == 0 ? (
                              <div className="text-center mt-3">
                                 <span>No cancelled Appointments</span>
                              </div>
                           ) : (
                              cancelledAppointments.map((item, key) => (
                                 <div key={key} className="col-12">
                                    <div className="upcomingCard p-3 rounded-2 text-white">
                                       <p className="m-0">
                                          DoctorID:{" "}
                                          <span className="text-highlight">
                                             {item.doctorID}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Date:{" "}
                                          <span className="text-highlight">
                                             {item.date}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Time:{" "}
                                          <span className="text-highlight">
                                             {item.time}
                                          </span>
                                       </p>
                                       <p className="m-0">
                                          Reason:{" "}
                                          <span className="text-highlight">
                                             {item.reason}
                                          </span>
                                       </p>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default PatientDashboard;
