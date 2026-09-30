import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { createUser } from "../features/auth.slice";

function Register() {

   const navigate = useNavigate();
   

   useEffect(() => {
      document.title = "Patient Registration";
   }, []);

   const Dispatch = useDispatch();

   const initialData = {
      name: "",
      email: "",
      mNumber: "",
      location: "",
      password: "",
      CP: "",
   };

   const [fieldValue, setFieldValue] = useState(initialData);
   const [passwordVisible, setPasswordVisible] = useState("ri-eye-fill");
   const [CPVisble, setCPVisible] = useState("ri-eye-fill");
   const [error, setError] = useState("start");
   const [cpClass, setCpClass] = useState("");

   const handlePasswordVisibility = () => {
      if (passwordVisible == "ri-eye-fill") {
         setPasswordVisible("ri-eye-off-fill");
      } else {
         setPasswordVisible("ri-eye-fill");
      }
   };

   const handleCPVisibility = () => {
      if (CPVisble == "ri-eye-fill") {
         setCPVisible("ri-eye-off-fill");
      } else {
         setCPVisible("ri-eye-fill");
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      setFieldValue((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (isNaN(fieldValue.mNumber)) {
         alert("Please Enter Valid Number");
         return;
      }

      if (error == "error") {
         console.log(error);
         alert("Confirm Password and Password are not same");
         return;
      }

      console.log("checking");

      const payload = {
         name: fieldValue.name,
         email: fieldValue.email,
         mNumber: fieldValue.mNumber,
         location: fieldValue.location,
         password: fieldValue.password,
         role:'patient'
      };

      const result = await Dispatch(createUser(payload));

      if (createUser.fulfilled.match(result)) {
         toast.success("Account created successfully!");
      }
      if (createUser.rejected.match(result)) {
         toast.error(result.payload);
         return;
      }

      setFieldValue(initialData);

      navigate('/login');
   };

   useEffect(() => {
      if (fieldValue.password == "" || fieldValue.CP == "") {
         setCpClass("");
         setError("");
         return;
      }

      if (fieldValue.password !== fieldValue.CP) {
         setCpClass("border-danger ");
         setError("error");
      }
      if (fieldValue.password == fieldValue.CP) {
         setCpClass("border-highlighted ");
         setError("success");
      }
   }, [fieldValue.CP]);

   return (
      <div className="bg-cs-register">
         <div className="d-flex flex-nowrap">
            <div className="register"></div>

            <div className="p-5 text-white flex-grow-1">
               {/* back btn */}
               <div className="mt-5 mb-3 d-flex align-items-center">
                  <Link className="text-decoration-none back fs-4" to="/">
                     <i className="ri-arrow-left-long-line"></i>
                  </Link>
               </div>

               {/* title */}
               <div>
                  <h1>
                     <span className="text-highlight">Create</span> Account
                  </h1>
                  <p className="text-cs-secondary">
                     Enter your details to register to premium medical access.
                  </p>
               </div>

               {/* form */}
               <form
                  onSubmit={handleSubmit}
                  method="POST"
                  className="pt-5 pe-3 form overflow-x-hidden "
               >
                  <div>
                     <div className="row g-3">
                        {/* name */}
                        <div className="col-6">
                           <div>
                              <label htmlFor="Uname">Name</label>
                              <input
                                 className="form-control"
                                 type="text"
                                 id="Uname"
                                 name="name"
                                 value={fieldValue.name}
                                 onChange={handleChange}
                                 placeholder="John Doe"
                                 required
                              />
                           </div>
                        </div>

                        {/* email */}
                        <div className="col-6">
                           <div>
                              <label htmlFor="Uemail">Email</label>
                              <input
                                 className="form-control"
                                 type="email"
                                 id="Uemail"
                                 name="email"
                                 value={fieldValue.email}
                                 onChange={handleChange}
                                 placeholder="john@example.com"
                                 required
                              />
                           </div>
                        </div>

                        {/* Mobile Number */}
                        <div className="col-6">
                           <div>
                              <label htmlFor="m-number">Mobile Number</label>
                              <input
                                 className="form-control"
                                 type="tel"
                                 id="m-number"
                                 name="mNumber"
                                 value={fieldValue.mNumber}
                                 onChange={handleChange}
                                 placeholder="+91 XXXXX XXXXX"
                                 required
                              />
                           </div>
                        </div>

                        {/* Location */}
                        <div className="col-6">
                           <div>
                              <label htmlFor="location">Location</label>
                              <textarea
                                 className="form-control"
                                 id="location"
                                 name="location"
                                 value={fieldValue.location}
                                 onChange={handleChange}
                                 cols="30"
                                 rows="2"
                                 placeholder="eg. Adajan, Surat, Gujarat"
                                 required
                              ></textarea>
                           </div>
                        </div>

                        {/* password */}
                        <div className="col-6">
                           <div className="position-relative overflow-hidden">
                              <label htmlFor="password">Password</label>

                              <input
                                 className="form-control"
                                 type={
                                    passwordVisible == "ri-eye-fill"
                                       ? "password"
                                       : "text"
                                 }
                                 id="password"
                                 name="password"
                                 value={fieldValue.password}
                                 onChange={handleChange}
                                 placeholder="Enter your password"
                                 required
                              />

                              <span
                                 className="eye-btn"
                                 onClick={handlePasswordVisibility}
                              >
                                 <i className={passwordVisible}></i>
                              </span>
                           </div>
                        </div>

                        {/* confirm password */}
                        <div className="col-6">
                           <div className="position-relative overflow-hidden">
                              <label htmlFor="CP">Confirm Password</label>

                              <input
                                 className={`${cpClass} form-control`}
                                 type={
                                    CPVisble == "ri-eye-fill"
                                       ? "password"
                                       : "text"
                                 }
                                 id="CP"
                                 name="CP"
                                 value={fieldValue.CP}
                                 onChange={handleChange}
                                 placeholder="Please confirm your password"
                                 required
                              />

                              <span
                                 className="eye-btn"
                                 onClick={handleCPVisibility}
                              >
                                 <i className={CPVisble}></i>
                              </span>

                              <span className="small text-highlight">
                                 {error === "success" ? "Passwords Match" : ""}
                              </span>
                           </div>
                        </div>

                        {/* submit btn */}
                        <div className="mt-5 ">
                           <button className="btn-outline-highlighted">
                              Register
                           </button>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Register;
