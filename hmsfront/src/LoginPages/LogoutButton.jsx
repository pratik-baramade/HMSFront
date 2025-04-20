import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const LogoutButton = ({ redirectTo }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      localStorage.clear(); // Clear session
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out.",
        timer: 1200,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate(redirectTo || "/");
      }, 1300);
    }
  };

  return (
    <button
      className="nav-link text-white bg-transparent border-0 text-start"
      onClick={handleLogout}
    >
      <FaSignOutAlt className="me-2" /> Logout
    </button>
  );
};

export default LogoutButton;
