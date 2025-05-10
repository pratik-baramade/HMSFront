import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import LogoutButton from "../LoginPages/LogoutButton";
import ViewScheduleReceptionist from "../Components/ViewScheduleRecipnest";
import ViewAllPrescription from "../Components/ViewAllPrescription";
import {
  FaUserPlus,
  FaUsers,
  FaCalendarPlus,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaSignOutAlt,
  FaUserTie,
} from "react-icons/fa";

// Import your components
import AddPatient from "../Components/AddPatient";
import ViewPatients from "../Components/ViewPatients";
import ViewSchedule from "../Components/ViewSchedule";
import ViewAppointmentsReceptionist from "../Components/ViewAppointmentsReceptionist";
import ViewBill from "../Components/ViewBill";
import ViewTests from "../Components/ViewTests";
import AddTest from "../Components/AddTest";
import Logout from "./Logout";
import Billing from "../Components/Billing";
import PatientPrescriptions from "../Components/PatientPrescriptions";
import ViewCertificates from "../Components/ViewCertificates ";



const ReceptionistDashboard = () => {
  const receptionist = JSON.parse(localStorage.getItem("user"));
  const receptionistName = receptionist?.name || "Receptionist";

  // State to keep track of the active component to display
  const [activeComponent, setActiveComponent] = useState("home");

  // Function to change the active component based on the clicked menu item
  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (<>
    <div>
      <Logout/>
    </div>
    <div className="d-flex min-vh-100 " style={{marginTop: "80px" }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-4" style={{ width: "250px" }}>
        <div className="text-center mb-4">
          <FaUserTie size={60} />
          <h5 className="mt-2">Welcome, {receptionistName}</h5>
        </div>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <NavLink
              to="#"
              className="nav-link text-white"
              onClick={() => handleMenuClick("addPatient")}
            >
              <FaUserPlus className="me-2" /> Add Patient
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className="nav-link text-white"
              onClick={() => handleMenuClick("viewPatients")}
            >
              <FaUsers className="me-2" /> View Patients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className="nav-link text-white"
              onClick={() => handleMenuClick("scheduleAppointment")}
            >
              <FaCalendarPlus className="me-2" /> Schedule Appointment
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className="nav-link text-white"
              onClick={() => handleMenuClick("viewAppointments")}
            >
              <FaCalendarAlt className="me-2" /> Manage Appointments
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="#" className="nav-link text-white"onClick={() => handleMenuClick("PatientPrescriptions")}>
            <FaCalendarPlus className="me-2" /> prescription
            </NavLink>
          </li>

           <li className="nav-item">
            <NavLink to="#" className="nav-link text-white"onClick={() => handleMenuClick("MedicalCertificate")}>
            <FaCalendarPlus className="me-2" /> MedicalCertificate
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="#" className="nav-link text-white" onClick={() => handleMenuClick("ViewBill")}>
              <FaFileInvoiceDollar className="me-2" /> View Billing/Prescriptions
            </NavLink>
          </li>

          {/* Test Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              id="testDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaFileInvoiceDollar className="me-2" />
              Test
            </a>
            <ul className="dropdown-menu" aria-labelledby="testDropdown">
              <li>
                <NavLink
                  to="#"
                  className="dropdown-item"
                  onClick={() => handleMenuClick("viewTest")}
                >
                  View Tests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="dropdown-item"
                  onClick={() => handleMenuClick("addTest")}
                >
                  Add Test
                </NavLink>
              </li>
            </ul>
          </li>

         
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="text-primary mb-4">📋 Receptionist Dashboard</h2>

        {/* Conditionally render components based on the activeComponent state */}
        {activeComponent === "home" && (
          <div className="row g-4">
            <div className="col-md-4">
              <div className=" shadow rounded p-3">
                <h5>Patients Today</h5>
                <p>5 new patients registered today.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className=" shadow rounded p-3">
                <h5>Appointments</h5>
                <p>3 appointments pending confirmation.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className=" shadow rounded p-3">
                <h5>Bills Checked</h5>
                <p>7 patient bills reviewed today.</p>
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
        )}

        {/* Conditionally render the components when the menu item is clicked */}
        {activeComponent === "addPatient" && <AddPatient />}
        {activeComponent === "viewPatients" && <ViewPatients />}
        {activeComponent === "scheduleAppointment" && <ViewScheduleReceptionist/>}
        {activeComponent === "viewAppointments" && <ViewAppointmentsReceptionist/>}
        {activeComponent === "viewBilling" && <ViewBill />}
        {activeComponent === "viewTest" && <ViewTests />}
        {activeComponent === "addTest" && <AddTest />}
        {activeComponent === "PatientPrescriptions" && <ViewAllPrescription/>}
        {activeComponent === "ViewBill" && <Billing />}  
        {activeComponent === "MedicalCertificate" && <ViewCertificates/>}  

      </div>
      </div>
   
    </>
  );
};

export default ReceptionistDashboard;
