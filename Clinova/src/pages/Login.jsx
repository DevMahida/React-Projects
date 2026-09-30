import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../features/auth.slice";

function Login() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      document.title = "Clinova Login";
   }, []);

   const initialData = {
      email: "",
      password: "",
      role: "",
   };

   const [formData, setFormData] = useState(initialData);

   const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      let res = await dispatch(loginUser(formData)).unwrap();
      console.log(res);

      navigate("/dashboard", { replace: true });
   };

   const [passwordVisible, setPasswordVisible] = useState("ri-eye-fill");
   const handlePasswordVisibility = () => {
      if (passwordVisible == "ri-eye-fill") {
         setPasswordVisible("ri-eye-off-fill");
      } else {
         setPasswordVisible("ri-eye-fill");
      }
   };

   return (
      <div className="login d-flex justify-content-center align-items-center">
         <div className="z-2 bg-login p-4 rounded-3">
            {/* title */}
            <div>
               {/* back btn */}
               <div className="mt-5 mb-3 d-flex align-items-center">
                  <Link className="text-decoration-none back fs-4" to="/">
                     <i className="ri-arrow-left-long-line"></i>
                  </Link>
               </div>

               <h1 className="text-white text-center ls-3px">
                  <span className="text-highlight">
                     <i className="ri-first-aid-kit-fill"></i>
                  </span>{" "}
                  Clinova
               </h1>
               <p className="text-lightGreen h4 text-center">
                  Secure Portal Access
               </p>
               <p className="text-white-50 text-center">
                  Enter your credentials to continue to your dashboard
               </p>
            </div>

            <form className="form mt-4" onSubmit={handleSubmit} method="POST">
               {/* email */}
               <div>
                  <label className="text-lightGreen ls-3px" htmlFor="email">
                     Email
                  </label>
                  <input
                     className="form-control"
                     type="email"
                     name="email"
                     id="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="john123@gmail.com"
                  />
               </div>

               {/* password */}
               <div className="mt-3 position-relative overflow-hidden">
                  <label className="ls-3px text-lightGreen" htmlFor="password">
                     Password
                  </label>

                  <input
                     className="form-control"
                     type={
                        passwordVisible == "ri-eye-fill" ? "password" : "text"
                     }
                     id="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Enter your password"
                     required
                  />

                  <span
                     className="eye-btn text-secondary"
                     onClick={handlePasswordVisibility}
                  >
                     <i className={passwordVisible}></i>
                  </span>
               </div>

               {/* btn */}
               <div className="text-center mt-3">
                  <button type="submit" className="btn-highlighted">
                     Login
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Login;
