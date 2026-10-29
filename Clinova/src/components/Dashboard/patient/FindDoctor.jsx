import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../../features/auth.slice";
import {
   changeAvailability,
   createAppointment,
   fetchSlots,
} from "../../../features/appointment.slice";
import { toast } from "react-toastify";

function FindDoctor() {
   const dispatch = useDispatch();
   const { currentUser } = useSelector((state) => state.user);

   const { doctors } = useSelector((state) => state.user);
   const { slots } = useSelector((state) => state.appointment);

   // display date and time

   // date selection
   const currentDate = new Date();
   const today = [
      currentDate.getFullYear(),
      String(currentDate.getMonth() + 1).padStart(2, "0"),
      String(currentDate.getDate()).padStart(2, "0"),
   ].join("-");

   const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-GB", {
         day: "2-digit",
         month: "short",
         year: "numeric",
      }).format(new Date(`${date}T00:00:00`));
   };

   const formatTime = (time) => {
      return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
         hour: "numeric",
         minute: "2-digit",
      });
   };

   // filter option
   const [selecetdSpecialization, setSelectedSpecialization] = useState(-1);

   const filteredDoctors = doctors.filter((doctor) => {
      return selecetdSpecialization == -1
         ? true
         : doctor.specialization == selecetdSpecialization;
   });

   // search option
   const [findDoctor, setFindDoctor] = useState("");
   const FindDoctor = filteredDoctors.filter((doctor) => {
      const matchName = doctor.name
         .toLowerCase()
         .includes(findDoctor.trim().toLowerCase());

      return matchName;
   });

   // pagination option
   const [start, setStart] = useState(0);
   const [end, setEnd] = useState(4);
   const [currentPage, setCurrentPage] = useState(1);

   const increamentSlice = 4;
   let totalPages = Math.ceil(FindDoctor.length / increamentSlice);

   const [selecetdDoctor, setSelectedDoctor] = useState();

   const prevPage = () => {
      setStart(start - increamentSlice);
      setEnd(end - increamentSlice);
      setCurrentPage(currentPage - 1);
   };

   const nextPage = () => {
      setStart(start + increamentSlice);
      setEnd(end + increamentSlice);
      setCurrentPage(currentPage + 1);
   };

   const initialData = {
      slotID: "",
      reason: "",
   };

   // appointment
   const [appointment, setAppointment] = useState(initialData);

   const handleChange = (e) => {
      setAppointment((item) => ({
         ...item,
         [e.target.name]: e.target.value,
      }));
   };

   const BookAppointment = async () => {
      if (!appointment.slotID) {
         toast.error("Please select a slot!");
         return;
      }

      let slot = slots.find((item) => item.id == appointment.slotID);

      if (!slot || !slot.available) {
         toast.error("Selected slot is no longer available!");
         return;
      }

      let data = {
         patientID: currentUser.id,
         doctorID: slot.doc_id,
         slotID: slot.id,
         date: formatDate(slot.date),
         time: `${formatTime(slot.Stime)} - ${formatTime(slot.Etime)}`,
         status: "pending",
         reason: appointment.reason,
         createAt: formatDate(today),
      };

      let res = await dispatch(createAppointment(data));

      if (res.meta.requestStatus == "fulfilled") {
         await dispatch(
            changeAvailability({
               slotID: slot.id,
               available: false,
            }),
         );
         toast.success("Appiontment request has been sent!!");
      } else {
         toast.error("Error accoured");
      }

      setAppointment(initialData);
   };

   // available slots
   const availableSlots = slots.filter(
      (slot) => slot.available === true && slot.date >= today,
   );

   useEffect(() => {
      document.title = "Find Doctors";
      dispatch(fetchDoctors());
   }, [dispatch]);

   useEffect(() => {
      if (selecetdDoctor) {
         dispatch(fetchSlots(selecetdDoctor));
      }
   }, [dispatch, selecetdDoctor]);

   return (
      <>
         {/* view */}
         <section className="px-4">
            {/* title */}
            <div className="container text-light my-4">
               <h2>
                  Find <span className="text-highlight">Doctors</span>
               </h2>
            </div>

            {/* searching - sorting */}
            <div className="container my-3 p-3 bg-cs-register rounded-4 form">
               <div className="d-flex gap-3">
                  <input
                     className="form-control"
                     type="search"
                     name="search"
                     id="search"
                     value={findDoctor}
                     onChange={(e) => setFindDoctor(e.target.value)}
                     placeholder="Search Doctors by name"
                  />

                  <select
                     className="form-select"
                     name="specialization"
                     id="specialization"
                     value={selecetdSpecialization}
                     onChange={(e) => setSelectedSpecialization(e.target.value)}
                  >
                     {/* options */}
                     <>
                        <option value="-1">All Specialization</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Endocrinologist">Endocrinologist</option>
                        <option value="ENT Specialist">ENT Specialist</option>
                        <option value="Gastroenterologist">
                           Gastroenterologist
                        </option>
                        <option value="General Physician">
                           General Physician
                        </option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Ophthalmologist">Ophthalmologist</option>
                        <option value="Orthopedic">Orthopedic</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Pulmonologist">Pulmonologist</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                        <option value="Urologist">Urologist</option>
                     </>
                  </select>
               </div>
            </div>

            {/* display doctors */}
            <div className="container">
               <div className="row g-2">
                  {FindDoctor.length == 0 ? (
                     <h2 className="text-white text-center">No Data</h2>
                  ) : (
                     FindDoctor.slice(start, end).map((items, keys) => (
                        <div key={keys} className="col-xl-6">
                           <div className="doctor-card bg-cs-register text-white p-4 rounded-4">
                              {/* detial and pricing */}
                              <div className="d-flex gap-4">
                                 {/* pfp */}
                                 <div>
                                    <img
                                       className="image"
                                       src={items.image}
                                       alt="Doctor pfp"
                                    />
                                 </div>

                                 {/* data */}
                                 <div className="flex-grow-1">
                                    {/* name */}
                                    <h4>{items.name}</h4>

                                    {/* qualification */}
                                    <p className="text-lightGreen small ls-3px">
                                       {items.qualification}
                                    </p>

                                    {/* experince and location */}
                                    <div className="d-flex gap-1 flex-column flex-wrap small">
                                       {/* experince */}
                                       <div className="d-flex flex gap-1 text-lightGreen">
                                          <i className="ri-suitcase-fill"></i>
                                          {items.experience} Years of Exp.
                                       </div>
                                       {/* location */}
                                       <div className="d-flex gap-1 text-lightGreen">
                                          <i className="ri-building-fill"></i>{" "}
                                          {items.location}
                                       </div>
                                    </div>
                                 </div>

                                 {/* price */}
                                 <div>
                                    <span className="text-lightGreen">
                                       Consultation
                                    </span>
                                    <p className="h3 text-end">
                                       ${items.consultationFee}
                                    </p>
                                 </div>
                              </div>

                              {/* specialization and availabilities */}
                              <div className="mt-3 d-flex align-items-center justify-content-between">
                                 {/* specialization */}
                                 <p className="m-0 badge-lightGreen">
                                    {items.specialization}
                                 </p>

                                 {/* btn  */}
                                 <div>
                                    <button
                                       type="button"
                                       className="btn-highlighted m-0 w pe-2 d-flex align-items-center"
                                       data-bs-toggle="modal"
                                       data-bs-target="#exampleModal"
                                       onClick={() =>
                                          setSelectedDoctor(items.id)
                                       }
                                    >
                                       <span className="flex-grow-1">
                                          Available Slots
                                       </span>
                                       <i className="ri-arrow-right-long-fill h5 m-0"></i>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))
                  )}
               </div>
            </div>

            {/* pegination */}
            <div className="container mt-4 d-flex align-items-center justify-content-between ">
               {/* current page number */}
               <div className="text-white">
                  <span>
                     Showing Page{" "}
                     <span className="text-highlight">{currentPage}</span> of{" "}
                     {totalPages}
                  </span>
               </div>

               {/* pagination btns */}
               <div className="d-flex gap-3 justify-content-end">
                  <button
                     className="btn btn-dark"
                     onClick={prevPage}
                     disabled={currentPage == 1 ? true : false}
                  >
                     <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <button
                     className="btn btn-dark"
                     onClick={nextPage}
                     disabled={currentPage == totalPages ? true : false}
                  >
                     <i className="ri-arrow-right-s-line"></i>
                  </button>
               </div>
            </div>
         </section>

         {/* modal */}
         <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
         >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
               <div className="modal-content bg-header">
                  {/* modal header */}
                  <div className="modal-header">
                     <h2
                        className="modal-title text-white fs-5"
                        id="exampleModalLabel"
                     >
                        Available Slots
                     </h2>
                     <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     ></button>
                  </div>

                  {/* modal body */}
                  <div className="modal-body">
                     {availableSlots.length == 0
                        ? "No Slots Available"
                        : availableSlots.map((item) => (
                             <div className="text-white mb-3" key={item.id}>
                                <p className="">{formatDate(item.date)}</p>

                                {/* radio btn */}
                                <div className="ms-4">
                                   <input
                                      type="radio"
                                      className="btn-check"
                                      name="slotID"
                                      value={item.id}
                                      id={item.id}
                                      checked={appointment.slotID === item.id}
                                      onChange={handleChange}
                                      autoComplete="off"
                                   />
                                   <label
                                      className="btn btn-outline-cs-highlighted "
                                      htmlFor={item.id}
                                   >
                                      {formatTime(item.Stime)} -
                                      {formatTime(item.Etime)}
                                   </label>
                                </div>
                             </div>
                          ))}

                     {/* reason */}
                     <div className="form">
                        <label className="text-white fs-5" htmlFor="reason">
                           Reason:
                        </label>
                        <textarea
                           className="form-control "
                           name="reason"
                           value={appointment.reason}
                           id="reason"
                           cols="30"
                           rows="10"
                           onChange={handleChange}
                        ></textarea>
                     </div>
                  </div>

                  {/* modal footer */}
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn-highlighted w-250px"
                        onClick={BookAppointment}
                        data-bs-dismiss="modal"
                     >
                        Book Appointment
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default FindDoctor;
