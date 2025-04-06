import React, { useState, useEffect } from 'react';
import AddPatient from './AddPatient';
import ViewPatients from './ViewPatients';
import PatientsService from '../PatientsService';

const AdminPanel = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);

  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    receptionists: 0,
  });

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const res = await PatientsService.getPatients();
        setCounts((prev) => ({
          ...prev,
          patients: res.data.length,
        }));
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatientCount();
  }, []);

  const handleModuleClick = (module) => {
    setActiveModule(module);
    setActiveComponent(null); // reset component view
  };

  const renderModuleButtons = () => {
    if (activeModule === 'patients') {
      return (
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          <button
            className={`btn px-4 py-2 rounded-3 shadow-sm text-white ${activeComponent === 'add' ? 'bg-primary' : 'bg-dark'}`}
            onClick={() => setActiveComponent('add')}
          >
            Add Patient
          </button>
          <button
            className={`btn px-4 py-2 rounded-3 shadow-sm text-white ${activeComponent === 'view' ? 'bg-primary' : 'bg-dark'}`}
            onClick={() => setActiveComponent('view')}
          >
             Show Patients
          </button>
        </div>
      );
    }
    return null;
  };

  const getModuleBackground = () => {
    switch (activeModule) {
      case 'patients':
        return 'bg-success-subtle';
      case 'doctors':
        return 'bg-purple-100';
      case 'receptionists':
        return 'bg-pink-100';
      default:
        return 'bg-light';
    }
  };

  return (
    <div className={`p-4 rounded-4 ${getModuleBackground()} shadow-sm`} style={{ minHeight: '100vh' }}>
      <h2 className="text-center text-primary fw-bold mb-4">🏥 Admin Dashboard</h2>

      {/* Tab-Like Module Selector */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <button
          onClick={() => handleModuleClick('patients')}
          className={`btn fw-semibold px-4 py-2 rounded-3 shadow-sm text-black ${activeModule === 'patients' ? 'bg-success' : 'bg-success'}`}
        >
           Patients ({counts.patients})
        </button>
        <button
          onClick={() => handleModuleClick('doctors')}
          className={`btn fw-semibold px-4 py-2 rounded-3 shadow-sm text-black ${activeModule === 'doctors' ? 'bg-purple' : 'bg-purple-100'}`}
          style={{ backgroundColor: activeModule === 'doctors' ? '#6f42c1' : '#e0d4f5' }}
        >
           Doctors ({counts.doctors})
        </button>
        <button
          onClick={() => handleModuleClick('receptionists')}
          className={`btn fw-semibold px-4 py-2 rounded-3 shadow-sm text-black ${activeModule === 'receptionists' ? 'bg-pink' : 'bg-pink-100'}`}
          style={{ backgroundColor: activeModule === 'receptionists' ? '#d63384' : '#fcdde9' }}
        >
           Receptionists ({counts.receptionists})
        </button>
      </div>

      {renderModuleButtons()}

      {/* Content Box */}
      <div className="p-4 bg-white border rounded-4 shadow">
        {activeModule === 'patients' && activeComponent === 'add' && <AddPatient />}
        {activeModule === 'patients' && activeComponent === 'view' && <ViewPatients />}

        {activeModule === 'doctors' && (
          <p className="text-center text-purple fw-semibold">🩺 Doctors component coming soon...</p>
        )}
        {activeModule === 'receptionists' && (
          <p className="text-center text-danger fw-semibold">👩‍💼 Receptionists component coming soon...</p>
        )}
        {!activeModule && (
          <p className="text-center text-muted">⬆️ Please select a module to begin.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
