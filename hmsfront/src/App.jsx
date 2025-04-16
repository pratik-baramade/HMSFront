import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import lifelineLogo from './assets/lifeline.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import VideoPlayer from './Components/VideoPlayer';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AddPatient from './Components/AddPatient';
import ViewPatients from './Components/ViewPatients';
import AdminPanel from './Components/AdminPanel';




function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
        <div className="Wrapper">
          <div className="row align-items-center bg-info shadow-sm px-3 py-2">
            <div className="col-md-2 col-3 d-flex align-items-center">
              <img src={lifelineLogo} alt="Lifeline Logo" className="img-fluid" width={60} />
            </div>
            <div className="col-md-10 col-9">
              <ul className="list-inline d-flex justify-content-center m-0 flex-wrap">
              {/* <li className="list-inline-item p-2">
                 <NavLink to="/login" className="text-white fw-bold text-decoration-none navlink">🔐 Login</NavLink>
              </li> */}

                <li className="list-inline-item p-2">
                  <NavLink to="/" className="text-white fw-bold text-decoration-none navlink">🏠 HOME</NavLink>
                </li>
                <li className="list-inline-item p-2">
                  <NavLink to="/add" className="text-white fw-bold text-decoration-none navlink">🛠️ Admin</NavLink>
                </li>
                <li className="list-inline-item p-2">
                  <NavLink to="/viewDoctours" className="text-white fw-bold text-decoration-none navlink">🩺 Doctors</NavLink>
                </li>
                <li className="list-inline-item p-2">
                  <NavLink to="/User" className="text-white fw-bold text-decoration-none navlink">👤 User</NavLink>
                </li>
                <li className="list-inline-item p-2">
                  <NavLink to="/About" className="text-white fw-bold text-decoration-none navlink">ℹ️ About</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="slide container-fluid px-4"
  style={{
    paddingTop: '50px',       // <-- Push down the content
    minHeight: 'calc(100vh - 80px)',
  }}>
        <Routes>
           <Route path='/' element={<VideoPlayer />} />
           <Route path='/add' element={<AdminPanel />} />
           <Route path="/viewDoctors" element={<h1 className="text-center text-secondary">👨‍⚕️ Doctors Panel Coming Soon</h1>} />
           <Route path="/user" element={<h1 className="text-center text-secondary">👤 User Panel Coming Soon</h1>} />
           <Route path="/about" element={<h1 className="text-center text-secondary">ℹ️ About Page Coming Soon</h1>} />

           
</Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
