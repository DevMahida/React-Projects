import React from "react";

function HeroSection() {
   return (
      <section className="Hero-Section border-bottom border-dark">
         <div className="container">
            <div className="d-flex align-items-center position-relative min-vh-100 z-3">
               <div>
                  {/* badge */}
                  <div className="mb-5 d-flex">
                     <span className="badge cs-badge d-flex align-items-center rounded-pill px-3 py-2">
                        <i className="ri-circle-fill small me-2"></i>
                        Next-Generation Healthcare
                     </span>
                  </div>

                  {/* Title */}
                  <div>
                     <h2 className="text-white display-3 fw-medium">
                        The Future of <br />{" "}
                        <span className="grediant">Personalized Care</span>
                     </h2>

                     <p className="text-lightGreen w-50 m-0 p-0 mt-5">
                        Experience premium medical excellence. We connect you
                        with world-className specialists and advanced
                        diagnostics, tailored precisely to your unique biology.
                     </p>
                  </div>

                  {/* search box */}
                  <div className="border Search border-dark border-2 rounded-4 ps-4 p-2 d-flex align-items-center gap-3 rounded-2 w-50 mt-5">
                     {/* search icon */}
                     <div className="d-flex align-items-center search-icon">
                        <label htmlFor="search">
                           <i className="fa-solid fa-magnifying-glass"></i>
                        </label>
                     </div>

                     {/* input field */}
                     <div className="flex-grow-1 d-flex align-items-center">
                        <input
                           className="form-control bg-transparent  text-white"
                           type="text"
                           id="search"
                           placeholder="Doctor, Speciality or Location..."
                        />
                     </div>

                     {/* find care btn */}
                     <div className="d-flex align-items-center">
                        <button className="btn-highlighted py-4 mt-0">
                           Find Care{" "}
                           <i className="ri-arrow-right-long-fill"></i>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HeroSection;
