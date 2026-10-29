import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { updateUser } from "../../../features/auth.slice";
import { toast } from "react-toastify";

function Update() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { currentUser } = useSelector((state) => state.user);

   const initialData = {
      name: currentUser?.name,
      email: currentUser?.email,
      mNumber: currentUser?.mNumber,
      location: currentUser?.location,
   };

   const [updateFields, setUpdateFields] = useState(initialData);

   const handleUpdate = (e) => {
      setUpdateFields({ ...updateFields, [e.target.name]: e.target.value });
   };

   const submitUpdate = async (e) => {
      e.preventDefault();

      if (!currentUser?.id) {
         toast.error("User information is unavailable");
         return;
      }

      let res = {
         id: currentUser.id,
         name: updateFields.name,
         email: updateFields.email,
         mNumber: updateFields.mNumber,
         location: updateFields.location,
      };

      try {
         await dispatch(updateUser(res)).unwrap();

         toast.success("Profile updated successfully!");
         navigate("/dashboard/patient/home");
      } catch (error) {
         toast.error(error || "Unable to update profile");
      }
   };

   return (
      <>
         {/* back-btn title  */}
         <section className="mt-4 text-white">
            <div className="container">
               {/* back btn */}
               <div className="mb-3">
                  <Link
                     className="text-decoration-none hover text-white fs-2"
                     to="/dashboard/patient/home"
                  >
                     <i className="ri-arrow-left-s-line"></i>
                  </Link>
               </div>

               {/* title */}
               <div className="ms-5">
                  <h2>
                     Update <span className="text-highlight">Profile</span>
                  </h2>
               </div>
            </div>
         </section>

         <section>
            <div className="container">
               <form
                  className=" ms-5 my-4 p-3 rounded-3 form bg-dark text-white"
                  method="post"
                  onSubmit={submitUpdate}
               >
                  {/* name */}
                  <div>
                     <label className=" text-white h2" htmlFor="name">
                        Name:
                     </label>
                     <input
                        className="form-control mt-0"
                        type="text"
                        name="name"
                        id="name"
                        value={updateFields.name}
                        onChange={handleUpdate}
                        required
                     />
                  </div>

                  {/* email */}
                  <div className="mt-3">
                     <label className=" text-white h2" htmlFor="email">
                        Email:
                     </label>
                     <input
                        className="form-control mt-0"
                        type="email"
                        name="email"
                        id="email"
                        value={updateFields.email}
                        onChange={handleUpdate}
                        required
                     />
                  </div>

                  {/* mobile number */}
                  <div className="mt-3">
                     <label className=" text-white h2" htmlFor="mNumber">
                        Mobile Number:
                     </label>
                     <input
                        className="form-control mt-0"
                        type="text"
                        name="mNumber"
                        id="mNumber"
                        maxLength={10}
                        minLength={10}
                        value={updateFields.mNumber}
                        onChange={handleUpdate}
                        required
                     />
                  </div>

                  {/* location */}
                  <div className="mt-3">
                     <label className=" text-white h2" htmlFor="location">
                        Location:
                     </label>
                     <textarea
                        className="form-control m-0"
                        type="text"
                        name="location"
                        id="location"
                        value={updateFields.location}
                        onChange={handleUpdate}
                        required
                     />
                  </div>

                  {/* btn */}
                  <div className="mt-4">
                     <button
                        type="submit"
                        className="btn btn-outline-cs-highlighted"
                     >
                        Update
                     </button>
                  </div>
               </form>
            </div>
         </section>
      </>
   );
}

export default Update;
