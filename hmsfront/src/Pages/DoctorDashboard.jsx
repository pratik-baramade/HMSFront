import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUserInjured, FaPrescriptionBottleAlt, FaClock, FaUserEdit, FaSignOutAlt, FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import navigate
import Swal from "sweetalert2"; // Import SweetAlert2

// Import your doctor components here
import ViewAppointments from "../Components/ViewAppointments";
import ManagePatients from "../Components/ManagePatients"; 
import WritePrescription from "../Components/WritePrescription";
import ViewSchedule from "../Components/ViewSchedule";
import EditDoctor from "../Components/EditDOctor";
import Logout from "./Logout";

const DoctorDashboard = () => {
  const [doctorName, setDoctorName] = useState("Doctor");
  const [selectedPage, setSelectedPage] = useState("home");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user) {
          setDoctorName(user.Name || user.name || user.username || "Doctor");
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
          localStorage.removeItem("user"); // Clear user info if needed
          navigate("/doctorlogin"); // Redirect to doctor login page
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
      <div className="bg-primary text-white p-4" style={{ width: "250px" }}>
        <div className="text-center mb-4">
          <FaUserMd size={60} />
          <h5 className="mt-2">Welcome, {doctorName}</h5>
        </div>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <button onClick={() => handleNavClick("appointments")} className="nav-link text-white btn btn-link">
              <FaCalendarAlt className="me-2" /> View Appointments
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavClick("patients")} className="nav-link text-white btn btn-link">
              <FaUserInjured className="me-2" /> Manage Patients
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavClick("prescriptions")} className="nav-link text-white btn btn-link">
              <FaPrescriptionBottleAlt className="me-2" /> Write Prescriptions
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavClick("schedule")} className="nav-link text-white btn btn-link">
              <FaClock className="me-2" /> View Schedule
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
      <div className="flex-grow-1 p-4">
      <div className="sticky-header">
        <h2 className="text-primary mb-4">Doctor Dashboard</h2>

        {/* Conditionally Render Selected Page */}
        {selectedPage === "home" && (
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow rounded p-3">
                <h5>Today's Appointments</h5>
                <p>No appointments scheduled yet.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow rounded p-3">
                <h5>Pending Prescriptions</h5>
                <p>No pending prescriptions.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow rounded p-3">
                <h5>Upcoming Follow-ups</h5>
                <p>No follow-ups scheduled.</p>
              </div>
            </div>

            <div className="mt-5">
              <h5 className="text-secondary">Doctor Tips 🧠</h5>
              <ul>
                <li>Review patient records carefully before appointments.</li>
                <li>Update prescriptions clearly and timely.</li>
                <li>Stay updated with latest healthcare guidelines.</li>
              </ul>
            </div>
          </div>
        )}

        {selectedPage === "appointments" && <ViewAppointments />}
        {selectedPage === "patients" && <ManagePatients />}
        {selectedPage === "prescriptions" && <WritePrescription />}
        {selectedPage === "schedule" && <ViewSchedule />}
        {selectedPage === "profile" && <EditDoctor />}
      </div>
      </div>
    </div>
    </>
  );
};

export default DoctorDashboard;
