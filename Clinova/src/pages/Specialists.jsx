import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../features/auth.slice";
import Header from "../components/home/Header";
import Title from "../components/home/Title";
import DoctorList from "../components/home/DoctorList";

function Specialists() {

   const dispatch = useDispatch();
   const { doctors } = useSelector((state) => state.user);
   
   useEffect(() => {
      document.title = "Top Specialists"
      dispatch(fetchDoctors());
   },[dispatch]);
   return (
      <div>
         <Header />
         <main className="bg-cs-primary p-2 p-md-5">

            <Title />

            {/* doctor list - */}
            <DoctorList users={doctors} />
         </main>
      </div>
   );
}

export default Specialists;
