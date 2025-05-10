

import React, { useState, useEffect } from 'react';


import ViewPharmacy from '../Components/ViewPharmacy';
import ViewTests from '../Components/ViewTests';
import AddPatient from '../Components/AddPatient';
import ViewPatients from '../Components/ViewPatients';
import PatientsService from '../PatientsService';
import AddDoctor from '../Components/AddDoctor';
import ViewDoctors from '../Components/ViewDoctors';
import DoctorsService from '../DoctorsService';
import AddReceptionis from '../AddReceptionis';
import ReceptionisService from '../ReceptionisService';
import ViewReceptionists from '../ViewReceptionists';
import Logout from './Logout';
import TotalAmount from '../Components/TotalAmount';

const AdminPanel = () => {
  const [activeModule, setActiveModule] = useState('home');
  const [subModule, setSubModule] = useState('');
  
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    receptionists: 0,
  });

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const patientRes = await PatientsService.getPatients();
        const doctorRes = await DoctorsService.getDoctors();
        const receptionistRes = await ReceptionisService.getReceptionis();
        setCounts({
          patients: patientRes.data.length,
          doctors: doctorRes.data.length,
          receptionists: receptionistRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
  

    fetchPatientCount();
  }, []);


  useEffect(() => {
    // When activeModule changes, reset subModule
    setSubModule('');
  }, [activeModule]);

  const renderSidebar = () => (
    <div
      className="bg-primary text-white p-3"
      style={{ width: '250px', height: '100vh', borderRight: '2px solid #ddd' }}
    >
      <h3 className="mb-4 text-center">Admin Dashboard</h3>
      <ul className="list-unstyled">
        <li className="menu-item p-2" onClick={() => setActiveModule('patients')}>
          Patients
          {activeModule === 'patients' && (
            <ul className="list-unstyled ps-3">
              <li className="p-2" onClick={() => setSubModule('addPatient')}>Add Patient</li>
              <li className="p-2" onClick={() => setSubModule('viewPatients')}>View Patients</li>
            </ul>
          )}
        </li>
        
        <li className="menu-item p-2" onClick={() => setActiveModule('doctors')}>
          Doctors
          {activeModule === 'doctors' && (
            <ul className="list-unstyled ps-3">
              <li className="p-2" onClick={() => setSubModule('addDoctor')}>Add Doctor</li>
              <li className="p-2" onClick={() => setSubModule('viewDoctors')}>View Doctors</li>
            </ul>
          )}
        </li>

        <li className="menu-item p-2" onClick={() => setActiveModule('receptionists')}>
          Receptionists
          {activeModule === 'receptionists' && (
            <ul className="list-unstyled ps-3">
              <li className="p-2" onClick={() => setSubModule('addReceptionist')}>Add Receptionist</li>
              <li className="p-2" onClick={() => setSubModule('viewReceptionists')}>View Receptionists</li>
            </ul>
          )}
        </li>

        <li className="menu-item p-2" onClick={() => setActiveModule('pharmacy')}>
          Pharmacy
          {activeModule === 'pharmacy' && (
            <ul className="list-unstyled ps-3">
              <li className="p-2" onClick={() => setSubModule('viewPharmacy')}>View Pharmacy</li>
            </ul>
          )}
        </li>

        <li className="menu-item p-2" onClick={() => setActiveModule('tests')}>
          Lab Tests
          {activeModule === 'tests' && (
            <ul className="list-unstyled ps-3">
              <li className="p-2" onClick={() => setSubModule('viewTests')}>View Lab Tests</li>
            </ul>
          )}
        </li>

         <li className="menu-item p-2" onClick={() => setActiveModule('TotalAmount')}>
          Check Bank Balanace
          {activeModule === 'TotalAmount' && (
            <ul className="list-unstyled ps-3">
              <li className="p-2" onClick={() => setSubModule('TotalAmount')}>Total Amount</li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );

  const renderContent = () => {
    switch (subModule) {
      case 'addPatient':
        return <AddPatient />;
      case 'viewPatients':
        return <ViewPatients />;
      case 'addDoctor':
        return <AddDoctor />;
      case 'viewDoctors':
        return <ViewDoctors />;
      case 'addReceptionist':
        return <AddReceptionis />;
      case 'viewReceptionists':
        return <ViewReceptionists />;
      case 'viewPharmacy':
        return <ViewPharmacy />;
      case 'viewTests':
        return <ViewTests />;
        case 'TotalAmount':
          return <TotalAmount/>
      default:
   return (
  <div className="container mt-5">
    <div className=" p-5 rounded-lg shadow-lg">
      <h2 className="text-center display-4 mb-4 animate__animated animate__fadeIn">Welcome to the Admin Dashboard</h2>
      <p className="text-center mb-5">Manage Patients, Doctors, Receptionists, Pharmacy, and Lab Tests easily from here.</p>
      
      {/* Stats Section */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h1 className="h5 text-secondary">Total Patients</h1>
            <p className="display-3 text-primary">{counts.patients}
</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="h5 text-secondary">Total Doctors</h3>
            <p className="display-3 text-primary"> {counts.doctors}
</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="h5 text-secondary">Total Receptionists</h3>
            <p className="display-3 text-primary">   {counts.receptionists}
</p>
          </div>
        </div>
      </div>
      
     
      
    </div>
  </div>
);


    }
  };

  return (<>
  <div>
    <Logout/>
  </div>
    <div className="d-flex " style={{marginTop:"90px"}}>
      {renderSidebar()}
      <div className="flex-grow-1 p-4">
        {renderContent()}
      </div>
    </div>
  </>);
};

export default AdminPanel;
