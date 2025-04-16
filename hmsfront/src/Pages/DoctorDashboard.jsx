import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserMd, FaCalendarCheck, FaUserInjured, FaPrescriptionBottleAlt, FaClock, FaUserEdit, FaSignOutAlt } from "react-icons/fa";

const DoctorDashboard = () => {
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-primary text-white p-4" style={{ width: "250px" }}>
        <div className="text-center mb-4">
          <FaUserMd size={60} />
          <h5 className="mt-2">Welcome, Doctor</h5>
        </div>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <NavLink to="/doctor/appointments" className="nav-link text-white">
              <FaCalendarCheck className="me-2" /> View Appointments
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/doctor/patients" className="nav-link text-white">
              <FaUserInjured className="me-2" /> Manage Patients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/doctor/prescriptions" className="nav-link text-white">
              <FaPrescriptionBottleAlt className="me-2" /> Write Prescriptions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/doctor/schedule" className="nav-link text-white">
              <FaClock className="me-2" /> View Schedule
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/doctor/profile" className="nav-link text-white">
              <FaUserEdit className="me-2" /> Edit Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/logout" className="nav-link text-white">
              <FaSignOutAlt className="me-2" /> Logout
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="text-success mb-4">🩺 Doctor Dashboard</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Today's Appointments</h5>
              <p>You have 3 appointments today.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Pending Prescriptions</h5>
              <p>2 prescriptions need to be filled.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Patient Follow-ups</h5>
              <p>1 follow-up scheduled this week.</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h5 className="text-secondary">Practice Tips 🧠</h5>
          <ul>
            <li>Review patient history before each appointment.</li>
            <li>Keep prescriptions clear and updated.</li>
            <li>Use EHR effectively for better patient care.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
