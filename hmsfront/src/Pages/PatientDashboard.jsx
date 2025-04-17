import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaFileInvoice, FaUserEdit, FaNotesMedical, FaPills, FaSignOutAlt, FaUserCircle, FaCommentDots } from "react-icons/fa";

const PatientDashboard = () => {

  const [patientName, setPatientName] = useState("patients");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log("Stored user:", user);
        if (user) {
          setPatientName(user.Name || user.name || user.username || "Patient");
        }
        
        
      } catch (e) {
        console.error("Invalid user data in localStorage", e);
      }
    }
  }, []);
  


  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-info text-white p-4" style={{ width: "250px" }}>
        <div className="text-center mb-4">
          <FaUserCircle size={60} />
          <h5 className="mt-2">Welcome, {patientName}</h5>
        </div>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <NavLink to="/user/book-appointment" className="nav-link text-white">
              <FaCalendarAlt className="me-2" /> Book Appointment
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/bills" className="nav-link text-white">
              <FaFileInvoice className="me-2" /> View Bills
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/prescriptions" className="nav-link text-white">
              <FaPills className="me-2" /> Prescriptions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/history" className="nav-link text-white">
              <FaNotesMedical className="me-2" /> Medical History
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/profile" className="nav-link text-white">
              <FaUserEdit className="me-2" /> Edit Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/feedback" className="nav-link text-white">
              <FaCommentDots className="me-2" /> Feedback
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
        <h2 className="text-primary mb-4">📋 Dashboard Overview</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Upcoming Appointments</h5>
              <p>No appointments yet.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Last Prescription</h5>
              <p>No prescriptions found.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow rounded p-3">
              <h5>Outstanding Bills</h5>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h5 className="text-secondary">Health Tips 💡</h5>
          <ul>
            <li>Stay hydrated and eat a balanced diet.</li>
            <li>Exercise regularly and get enough sleep.</li>
            <li>Always take your prescribed medications on time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
