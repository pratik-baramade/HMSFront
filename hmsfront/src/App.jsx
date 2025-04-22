import { useState } from 'react'
import './App.css'
import lifelineLogo from './assets/lifeline.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoPlayer from './Components/VideoPlayer';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AdminPanel from './Pages/AdminPanel';
import PatientDashboard from './Pages/PatientDashboard';
import BookAppointment from './Components/BookAppointment';
import DoctorDashboard from './Pages/DoctorDashboard';
import AboutUs from './Pages/AboutUs';
import Login from './Components/Login';
import PatientsLogin from './LoginPages/PatientsLogin';
import DoctorLogin from './LoginPages/DoctorLogin';
import ReceptionistLogin from './LoginPages/ReceptionistLogin';
import EditPatientsProfile from './Components/EditPatientProfile';
import ViewBill from './Components/ViewBill'
import ViewAppointments from './Components/ViewAppointments';
import ViewSchedule from './Components/ViewSchedule';
import EditDoctor from './Components/EditDOctor';
import ManagePatients from './Components/ManagePatients';
import WritePrescription from './Components/WritePrescription';
import ViewPharmacy from './Components/ViewPharmacy';
import PatientPrescriptions from './Components/PatientPrescriptions';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
        <div className="Wrapper">
          <div className="row align-items-center bg-info shadow-sm px-3 py-2 ">
            <div className="col-md-2 col-3 d-flex align-items-center">
              <img src={lifelineLogo} alt="Lifeline Logo" className="img-fluid" width={60} />
            </div>
            <div className="col-md-10 col-9">
              <ul className="list-inline d-flex justify-content-center m-0 flex-wrap">
             

                <li className="list-inline-item p-2">
                  <NavLink to="/" className="text-white fw-bold text-decoration-none navlink">🏠 HOME</NavLink>
                </li>
                <li className="list-inline-item p-2">
                  <NavLink to="/admin" className="text-white fw-bold text-decoration-none navlink">🛠️ Admin</NavLink>
                </li>
                <li className="list-inline-item p-2">
                  <NavLink to="/doctorlogin" className="text-white fw-bold text-decoration-none navlink">🩺 Doctors</NavLink>
                </li>
                <li className="list-inline-item p-2">
                  <NavLink to="/patientslogin" className="text-white fw-bold text-decoration-none navlink"> Patients</NavLink>
                </li>

                <li className="list-inline-item p-2">
                  <NavLink to="/ReceptionistLogin" className="text-white fw-bold text-decoration-none navlink"> Receptionist</NavLink>
                </li>
                <li className="list-inline-item p-2">
                  <NavLink to="/About" className="text-white fw-bold text-decoration-none navlink">ℹ️ About</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}

        <div className="slide container-fluid px-4 " style={{ minHeight: "calc(100vh - 80px)",  paddingTop:'50px'}}>
 <Routes>
  <Route path='/' element={<VideoPlayer />} />
  <Route path="/login" element={<Login />} />
  <Route path='/patientslogin' element={<PatientsLogin/>}/>
  <Route path='/doctorlogin' element={<DoctorLogin/>}/>
  <Route path='/ReceptionistLogin' element={<ReceptionistLogin/>}/>
  <Route path='/admin' element={<AdminPanel />} />
  <Route path='/viewDoctors' element={<DoctorDashboard />} />
  <Route path="/doctor/appointments" element={<ViewAppointments />} />
  <Route path="/doctor/schedule" element={<ViewSchedule/>}/>
  <Route path="/doctor/profile" element={<EditDoctor/>}/>
  {/* <Route path="/doctor/patients" element={<ViewPatients />} /> */}

  <Route path="/doctor/patients" element={<ManagePatients />} />
  <Route path="doctor/prescriptions" element={<WritePrescription />} />
 
  <Route path='/user' element={<PatientDashboard />} />
  <Route path="/user/profile" element={<EditPatientsProfile/>}/>
  <Route path='/user/book-appointment' element={<BookAppointment />} />
  <Route path='/user/bills' element={<ViewBill/>}/>
  <Route path='/user/prescriptions' element={<PatientPrescriptions/>}/>
  <Route path='user/dashboard' element={<PatientDashboard/>}/>
  <Route path="/logout" element={<PatientsLogin/>}/>
  <Route path='/receptionist/dashboard' element={<h1 className="text-center text-secondary">👤 Receptionist Panel Coming Soon</h1>} />
  <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
  <Route path='/patient/dashboard' element={<PatientDashboard />} />
  <Route path="/patientdashboard" element={<PatientDashboard />} />
  <Route path='/About' element={<AboutUs/>} />
</Routes>


       
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
