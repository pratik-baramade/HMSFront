import { useState } from 'react';
import './App.css';
import lifelineLogo from './assets/lifeline.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoPlayer from './Components/VideoPlayer';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AdminPanel from './Pages/AdminPanel';
import PatientDashboard from './Pages/PatientDashboard';
import BookAppointment from './Components/BookAppointment';
import DoctorDashboard from './Pages/DoctorDashboard';

import PatientsLogin from './LoginPages/PatientsLogin';
import DoctorLogin from './LoginPages/DoctorLogin';
import ReceptionistLogin from './LoginPages/ReceptionistLogin';
import EditPatientsProfile from './Components/EditPatientProfile';
import ViewBill from './Components/ViewBill';
import ViewAppointments from './Components/ViewAppointments';
import ViewSchedule from './Components/ViewSchedule';
import EditDoctor from './Components/EditDOctor';
import ManagePatients from './Components/ManagePatients';
import WritePrescription from './Components/WritePrescription';
import ViewPharmacy from './Components/ViewPharmacy';
import PatientPrescriptions from './Components/PatientPrescriptions';
import MedicalHistory from './Components/MedicalHistory';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ReceptionistDashboard from './Pages/ReceptionistDashboard';
import AddPatient from './Components/AddPatient';
import ViewPatients from './Components/ViewPatients';
import ViewAppointmentsReceptionist from './Components/ViewAppointmentsReceptionist';
import Swal from 'sweetalert2';
import Patientbill from './Components/patientbill';
import ViewTests from './Components/ViewTests';
import AddTest from './Components/AddTest';
import Billing from './Components/Billing';
import InvoicePage from './Components/InvoicePage';
import ShowPrescription from './Components/ShowPrescription';
import UpdatePatient from './Components/UpdatePatient';
import AdminLogin from './Pages/AdminLogin';


function App() {
  const [count, setCount] = useState(0);
  const userType = localStorage.getItem("userType"); // Get user type from localStorage


  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = '/';
      }
    });
  };
  
  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
     

        {/* Main Content */}
        <div className="slide container-fluid px-4" style={{ minHeight: "calc(100vh - 80px)", paddingTop: '5px' }}>
          <Routes>
            
            <Route path='/' element={<VideoPlayer />} />
            <Route path="/update-patient/:id" element={<UpdatePatient />} />
            <Route path='/patientslogin' element={<PatientsLogin />} />
            <Route path='/doctorlogin' element={<DoctorLogin />} />
            <Route path='/admin'element={<AdminLogin/>}/>
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path='/ReceptionistLogin' element={<ReceptionistLogin />} />
            <Route path='/admin' element={<AdminPanel />} />
            <Route path='/viewDoctors' element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<ViewAppointments />} />
            <Route path="/doctor/schedule" element={<ViewSchedule />} />
            <Route path="/doctor/profile" element={<EditDoctor />} />
            <Route path="/doctor/patients" element={<ManagePatients />} />
            <Route path="doctor/prescriptions" element={<WritePrescription />} />
            <Route path='/user' element={<PatientDashboard />} />
            <Route path="/user/profile" element={<EditPatientsProfile />} />
            <Route path='/user/book-appointment' element={<BookAppointment />} />
            <Route path='/user/bills' element={<ViewBill />} />
            <Route path='/user/prescriptions' element={<PatientPrescriptions />} />
            <Route path='/user/history' element={<MedicalHistory />} />
            <Route path='/user/dashboard' element={<PatientDashboard/>}/>
            <Route path='/receptionist/dashboard' element={<ReceptionistDashboard />} />
            <Route path="/receptionist/add-patient" element={<AddPatient />} />
            <Route path="/receptionist/view-patients" element={<ViewPatients />} />
            <Route path='/register-patient' element={<AddPatient/>}/>
            <Route path="/receptionist/schedule-appointment" element={<BookAppointment />} />
            <Route path="/receptionist/view-appointments" element={<ViewAppointmentsReceptionist />} />
            <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
            <Route path='/patient/dashboard' element={<PatientDashboard />} />
            <Route path="/receptionist/view-billing" element={<Billing/>}/>
            <Route path='/receptionist/view-test' element={<ViewTests/>}/>
            <Route path="/receptionist/add-test" element={<AddTest/>}/>
            <Route path="/invoice/:billId" element={<InvoicePage/>} />
            <Route path='/doctor/dashboard' element={<DoctorDashboard/>}/>
            <Route path='/doctor/writeprescription' element={<WritePrescription/>}/>
            <Route path='/receptionist/prescription' element={<ShowPrescription/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
