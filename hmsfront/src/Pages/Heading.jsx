import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import lifelineLogo from "../assets/lifeline.png"; // Adjust path if needed

export default function Heading() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <div className="Wrapper position-fixed" style={{ width: "97%", zIndex: 1050 }}>
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
                  <NavLink className="nav-link fw-semibold" to="/">
                    🏠 Home
                  </NavLink>
                </li>

                {/* Login Dropdown */}
                <li className="nav-item dropdown border-5">
                  <a
                    className="nav-link dropdown-toggle btn btn-success fw-semibold text-white"
                    href="#"
                    id="loginDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    🔐 Login
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown">
                    <li><NavLink className="dropdown-item" to="/patientslogin">👤 Patient</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/doctorlogin">🩺 Doctor</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/ReceptionistLogin">💼 Receptionist</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/admin">🛠️ Admin</NavLink></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
