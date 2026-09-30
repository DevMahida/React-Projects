import React from "react";

function Title() {
   return (
      <>
         {/* title - subtitle */}
         <section className="mt-5 pt-5">
            <div className="container">
               <h2 className="display-4 text-white w-75 m-auto text-center fw-medium">
                  Top Specialists:
                  <span className="text-highlight">
                     {" "}
                     Distinguished Medical Faculty
                  </span>
               </h2>
               <p className="text-lightGreen text-center w-50 m-auto mt-4">
                  Consult with Clinova’s five most experienced department
                  chairs, senior fellows, and master clinicians, ranked by
                  decades of specialized clinical practice and procedural
                  volume.
               </p>
            </div>
         </section>
      </>
   );
}

export default Title;
