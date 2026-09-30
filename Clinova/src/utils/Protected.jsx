import { current } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

function Protected() {
   const { currentUser } = useSelector((state) => state.user);

   if (!currentUser) {
      return <Navigate to={`/login`} replace />;
   }

   // console.log("Protected", users);
   return <Outlet />;
}

export default Protected;
