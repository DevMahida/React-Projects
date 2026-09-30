import React from "react";

function DoctorList({ users }) {
   
   return (
      <>
         {/* sort */}
         <section className="mt-5">
            <div className="container bg-cs-register p-3 ps-4 rounded-4 position-relative z-3">
               {/* filter bar */}
               <div className="d-flex align-items-center justify-content-between">
                  {/* available */}
                  <div>
                     <p className="text-lightGreen m-0 d-flex gap-3 align-items-center">
                        <span className="h4 m-0 text-highlight">05</span>
                        <span>Distinguished Senoir Specialists</span>
                        <span className='cs-badge px-3 border-0 rounded-1'>Ranked #1 to #5</span>
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* list */}
         <section className="mt-4">
            <div className="container-md">
               <div className="row">
                  {[...users]
                     .sort((a, b) => {
                        return b.experience - a.experience;
                     })
                     .slice(0, 5)
                     .map((items, key) => (
                        <div key={key} className="col-12 g-3">
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
                                    <h2>{items.name}</h2>

                                    {/* qualification */}
                                    <p className="text-lightGreen ls-3px">
                                       {items.qualification}
                                    </p>

                                    {/* experince and location */}
                                    <div className="d-flex gap-1 gap-lg-4 flex-wrap">
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
                                    <p className="h2 text-end">
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

                                 <div>
                                    <button className="btn-highlighted m-0 w-250px pe-3 d-flex align-items-center">
                                       <span className="flex-grow-1">
                                          Check Availability
                                       </span>{" "}
                                       <i className="ri-arrow-right-long-fill h5 m-0"></i>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
               </div>
            </div>
         </section>
      </>
   );
}

export default DoctorList;
