// src/PrivateRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

// This component will check if the user is logged in
const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage

  // If the user is logged in, render the requested route
  // Otherwise, redirect to the login page
  return user ? element : <Navigate to="/patientslogin" />;
};

export default PrivateRoute;
