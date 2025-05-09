import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaFileInvoice, FaUserEdit, FaNotesMedical, FaPills, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2"; // ✅ IMPORTANT: Import Swal!
import Logout from "./Logout";
import BookAppointment from "../Components/BookAppointment";
import ViewBill from "../Components/ViewBill";
import PatientPrescriptions from "../Components/PatientPrescriptions"; 
import MedicalHistory from "../Components/MedicalHistory";
import EditPatientsProfile from "../Components/EditPatientProfile";
import PatientsLogin from "../LoginPages/PatientsLogin"; // Not really needed to render manually
import NavigationButtons from "../Components/NavigationButtons";
const PatientDashboard = () => {
  const [patientName, setPatientName] = useState("Patient");
  const [selectedPage, setSelectedPage] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user) {
          setPatientName(user.Name || user.name || user.username || "Patient");
        }
      } catch (e) {
        console.error("Invalid user data in localStorage", e);
      }
    }
  }, []);

  const handleNavClick = (page) => {
    if (page === "logout") {
      // Show SweetAlert confirmation
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("user"); // Clear user info
          navigate("/patientslogin"); // Redirect to Patient login page
        }
      });
    } else {
      setSelectedPage(page);
    }
  };

  return (<>
  <div>
     <Logout/>
    </div>
    <div className="d-flex min-vh-100 " style={{marginTop: "80px" }}>
      
      
      {/* Sidebar */}
      <div className="bg-primary text-white p-4 px-5 " style={{ width: "250px",marginTop: "10px" }}
      >
        <div className="text-center mb-4">
          <FaUserCircle size={60} />
          <h5 className="mt-2">Welcome, {patientName}</h5>
        </div>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <button onClick={() => handleNavClick("appointments")} className="nav-link text-white btn btn-link">
              <FaCalendarAlt className="me-2" /> Book Appointment
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavClick("bills")} className="nav-link text-white btn btn-link">
              <FaFileInvoice className="me-2" /> View Bills
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavClick("prescriptions")} className="nav-link text-white btn btn-link">
              <FaPills className="me-2" /> Prescriptions
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavClick("history")} className="nav-link text-white btn btn-link">
              <FaNotesMedical className="me-2" /> Medical History
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavClick("profile")} className="nav-link text-white btn btn-link">
              <FaUserEdit className="me-2" /> Edit Profile
            </button>
          </li>
       
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "50px", paddingTop: "80px" }}>
        <h2 className="text-primary mb-4">Patient Dashboard</h2>

        {/* Conditionally Render the selected page content */}
        {selectedPage === "home" && (
          <div className="row g-4">
            <div className="col-md-4">
              <div className=" shadow rounded p-3">
                <h5>Upcoming Appointments</h5>
                <p>No appointments yet.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className=" shadow rounded p-3">
                <h5>Last Prescription</h5>
                <p>No prescriptions found.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className=" shadow rounded p-3">
                <h5>Outstanding Bills</h5>
                <p>₹0.00</p>
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
        )}

        {selectedPage === "appointments" && <BookAppointment />}
        {selectedPage === "bills" && <ViewBill />}
        {selectedPage === "prescriptions" && <PatientPrescriptions />}
        {selectedPage === "history" && <MedicalHistory />}
        {selectedPage === "profile" && <EditPatientsProfile />}
        {/* No need to render PatientsLogin manually here */}
      </div>
      </div>
    
    </>
  );
};

export default PatientDashboard;
