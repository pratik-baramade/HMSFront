import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import lifelineLogo from "../assets/lifeline.png";
import Swal from "sweetalert2";
import { FiLogOut } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Logout() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <div className="Wrapper position-fixed mb-3" style={{ width: "97%" }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
          <div className="container-fluid">
             {/* Previous & Next Arrows */}
                        <div className="d-flex align-items-center mx-3">
                          <button
                            className="btn btn-outline-light me-2"
                            onClick={() => navigate(-1)}
                            title="Go Back"
                          >
                            <FaArrowLeft />
                          </button>
                          <button
                            className="btn btn-outline-light"
                            onClick={() => navigate(1)}
                            title="Go Forward"
                          >
                            <FaArrowRight />
                          </button>
                        </div>
            {/* Logo */}
            <NavLink className="navbar-brand d-flex align-items-center" to="/">
              <img
                src={lifelineLogo}
                alt="Lifeline Logo"
                width="50"
                height="50"
                className="d-inline-block align-text-top me-2"
              />
              <span className="fw-bold fs-4">Lifeline Hospital</span>
            </NavLink>

            {/* Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link fw-semibold"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      Swal.fire({
                        title: "Are you sure?",
                        text: "Do you want to logout?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, logout!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          localStorage.clear();
                          Swal.fire(
                            "Logged out!",
                            "You have been successfully logged out.",
                            "success"
                          );
                          navigate("/");
                        }
                      });
                    }}
                  >  <FiLogOut className="me-1" />
                    Logout
                  </NavLink>
                </li>
              </ul>
              {/* Login Dropdown */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
