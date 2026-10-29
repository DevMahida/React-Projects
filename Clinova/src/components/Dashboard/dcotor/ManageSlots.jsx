import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   createSlot,
   deleteSlot,
   fetchSlots,
} from "../../../features/appointment.slice";
import { toast } from "react-toastify";

function ManageSlots() {
   useEffect(() => {
      document.title = "Manage Slots";
   }, []);

   const dispatch = useDispatch();
   const { currentUser } = useSelector((state) => state.user);
   const { slots } = useSelector((state) => state.appointment);

   // date selection
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

   const formatTime = (time) => {
      return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
         hour: "numeric",
         minute: "2-digit",
      });
   };

   const initialData = {
      date: "",
      Stime: "",
      Etime: "",
   };

   const [slotFields, setSlotFields] = useState(initialData);

   const handleSlotChange = (e) => {
      setSlotFields({ ...slotFields, [e.target.name]: e.target.value });
   };

   const handleAddSlot = async () => {
      // e.preventDefault();

      if (
         slotFields.date == "" ||
         slotFields.Stime == "" ||
         slotFields.Etime == ""
      ) {
         toast.error("Please Fill all Fields!");
         return;
      }

      let data = {
         doc_id: currentUser.id,
         date: slotFields.date,
         Stime: slotFields.Stime,
         Etime: slotFields.Etime,
         available: true,
      };

      let res = await dispatch(createSlot(data));     

      if (res.meta.requestStatus == 'fulfilled') {
         toast.success("Slots is added.")
      }else{
         toast.error("Error accoured");
      }

      setSlotFields(initialData);
   };

   const handleSlotDelete = (item) => {
      if (item.available === false) {
         toast.error("Cannot delete a booked slot!");
         return;
      }

      dispatch(deleteSlot(item));

      toast.success("Slot deleted ");
   };

   useEffect(() => {
   if (currentUser?.id) {
      dispatch(fetchSlots(currentUser.id));
   }
}, [dispatch, currentUser?.id]);

   return (
      <>
         {/* heading - add slots */}
         <section className=" text-light p-3 mt-3">
            <div className="container">
               <div className="row justify-content-between">
                  {/* heading and data */}
                  <div className="col-8">
                     <div>
                        <h2>Manage Availability & Clinic Hours</h2>
                        <p className="text-cs-gray">
                           Manage your weekly availability and appointment time
                           slots for a seamless booking experience.
                        </p>
                     </div>
                  </div>
                  <div className="col-4">
                     <div className="text-end">
                        <button
                           className="btn-highlighted"
                           data-bs-toggle="modal"
                           data-bs-target="#manageSlots"
                        >
                           + Add Slots
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* view slots */}
         <section>
            <div className="container">
               <table className="table table-dark custom-table">
                  <thead>
                     <tr>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Date</th>
                        <th className="status-column" scope="col">
                           Status
                        </th>
                        <th scope="col">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {slots.length == 0 ? (
                        <tr>
                           <td className="text-center" colSpan={`5`}>
                              No Data
                           </td>
                        </tr>
                     ) : (
                        [...slots]
                           .sort((a, b) => a.date.localeCompare(b.date))
                           .map((item, key) => (
                              <tr key={key}>
                                 <td>{formatTime(item.Stime)}</td>
                                 <td>{formatTime(item.Etime)}</td>
                                 <td>{formatDate(item.date)}</td>
                                 <td>
                                    <div
                                       className={`text-center
                                       ${
                                          item.available === true
                                             ? "text-highlight"
                                             : "text-danger "
                                       }
                                    `}
                                    >
                                       <i className="ri-checkbox-blank-circle-fill"></i>
                                    </div>
                                 </td>
                                 <td>
                                    <button
                                       className="btn btn-outline-danger"
                                       onClick={() => handleSlotDelete(item)}
                                       disabled={item.available === false ? true : false}
                                    >
                                       <i className="ri-delete-bin-2-fill"></i>
                                    </button>
                                 </td>
                              </tr>
                           ))
                     )}
                  </tbody>
               </table>
            </div>
         </section>

         {/* Modal */}
         <div
            className="modal fade "
            id="manageSlots"
            tabIndex="-1"
            aria-labelledby="manageSlots"
            aria-hidden="true"
         >
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content bg-header text-light">
                  {/* header */}
                  <div className="modal-header">
                     <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add Slots
                     </h1>
                     <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     ></button>
                  </div>

                  {/* body */}
                  <div className="modal-body">
                     <form method="post">
                        {/* date */}
                        <div>
                           <label htmlFor="date">Date:</label>
                           <input
                              type="date"
                              className="form-control mt-1"
                              name="date"
                              value={slotFields.date}
                              onChange={handleSlotChange}
                              id="date"
                              min={minimumDate}
                              required
                           />
                        </div>
                        {/* start time */}
                        <div className="mt-3">
                           <label htmlFor="Stime">Start Time</label>
                           <input
                              type="time"
                              className="form-control mt-1"
                              name="Stime"
                              value={slotFields.Stime}
                              onChange={handleSlotChange}
                              id="Stime"
                              required
                           />
                        </div>
                        {/* end time */}
                        <div className="mt-3">
                           <label htmlFor="Etime">End Time</label>
                           <input
                              type="time"
                              className="form-control mt-1"
                              name="Etime"
                              value={slotFields.Etime}
                              onChange={handleSlotChange}
                              id="Etime"
                              required
                           />
                        </div>
                     </form>
                  </div>

                  {/* footer */}
                  <div className="modal-footer">
                     <button
                        type="button"
                        onClick={handleAddSlot}
                        className="btn-highlighted"
                        data-bs-dismiss="modal"
                     >
                        + Add Slot
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default ManageSlots;
