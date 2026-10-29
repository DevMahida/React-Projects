import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

function ProtectedHome() {
  
   const navigate = useNavigate();

   useEffect(()=>{
      navigate('/dashboard/doctor/home',{replace: true});
   },[])

   return (
      <>
         <Outlet />
      </>
   );

}

export default ProtectedHome;