import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../LoginPages/LogoutButton";
import {
  FaUserPlus,
  FaUsers,
  FaCalendarPlus,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaSignOutAlt,
  FaUserTie,
} from "react-icons/fa";

const ReceptionistDashboard = () => {
  const receptionist = JSON.parse(localStorage.getItem("user"));
  const receptionistName = receptionist?.name || "Receptionist";

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-info text-white p-4" style={{ width: "250px" }}>
        <div className="text-center mb-4">
          <FaUserTie size={60} />
          <h5 className="mt-2">Welcome, {receptionistName}</h5>
        </div>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <NavLink to="/receptionist/add-patient" className="nav-link text-white">
              <FaUserPlus className="me-2" /> Add Patient
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/receptionist/view-patients" className="nav-link text-white">
              <FaUsers className="me-2" /> View Patients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/receptionist/schedule-appointment" className="nav-link text-white">
              <FaCalendarPlus className="me-2" /> Schedule Appointment
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/receptionist/view-appointments" className="nav-link text-white">
              <FaCalendarAlt className="me-2" /> Manage Appointments
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/receptionist/view-billing" className="nav-link text-white">
              <FaFileInvoiceDollar className="me-2" /> View Billing/Prescriptions
            </NavLink>
          </li>
          <li className="nav-item">
            <LogoutButton redirectTo="/receptionistlogin" />
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="text-primary mb-4">📋 Receptionist Dashboard</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Patients Today</h5>
              <p>5 new patients registered today.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Appointments</h5>
              <p>3 appointments pending confirmation.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Bills Checked</h5>
              <p>7 patient bills reviewed today.</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h5 className="text-secondary">Reception Tips 💡</h5>
          <ul>
            <li>Always verify patient information before entry.</li>
            <li>Confirm appointment details with both patient and doctor.</li>
            <li>Maintain billing records accurately.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
