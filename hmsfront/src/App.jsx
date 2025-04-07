import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import lifelineLogo from './assets/lifeline.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import VideoPlayer from './Components/VideoPlayer';
import {BrowserRouter,Routes,Route,NavLink}from "react-router-dom";

import ViewPatients from './Components/ViewPatients';
import AdminPanel from './Components/AdminPanel';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <div className="Wrapper">
      <div className='row bg-info'>
        <div className='col-2'>
       

<img src={lifelineLogo} alt="Lifeline Logo" className="img-fluid pt-2 ps-3" width={70}  />

        </div>
    <div className='menu col'>
    <ul className="list-inline d-flex justify-content-center"> 
    <li className="list-inline-item p-3" ><NavLink to="/" className="navlink text-decoration-none text-white" id='n'>HOME</NavLink></li>
    <li className="list-inline-item p-3 "><NavLink to="/add" className="navlink text-decoration-none text-white" id='n'>Admin</NavLink></li>
    <li className="list-inline-item p-3 "><NavLink to="/viewDoctours" className="navlink text-decoration-none text-white" id='n'>Doctors</NavLink></li>
    <li className="list-inline-item p-3 "><NavLink to="/User" className="navlink text-decoration-none text-white" id='n'>User</NavLink></li>
    <li className="list-inline-item p-3 "><NavLink to="/About" className="navlink text-decoration-none text-white" id='n'  >About</NavLink></li>
  </ul>
  </div>
  </div>
  
  </div>
  <div className="slide container">

  <Routes>
    <Route path='/' element={<VideoPlayer/> }/>
    <Route path='/add'element={<AdminPanel/>}/>
    <Route path='//viewDoctours'element={<ViewPatients/>}/>
    <Route path='/user'element={<h1>User</h1>}/>
    <Route path='/About'element={<h1>About</h1>}/>
    <Route/>
    <Route/>

  </Routes>
  </div>
    </BrowserRouter>
      {/* <HomePage/> */}
    </>
  )
}

export default App
