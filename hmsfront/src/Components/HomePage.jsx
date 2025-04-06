import React, { useState } from 'react';
import AddPatient from './AddPatient';
import ViewPatients from './ViewPatients';

const AdminPanel = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const counts = {
    patients: 27,
    doctors: 12,
    receptionists: 5
  };

  const handleSelect = (module) => {
    setActiveModule(module);
    setActiveComponent(null);
    setDropdownOpen(false);
  };

  const renderModuleButtons = () => {
    if (activeModule === 'patients') {
      return (
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-6 py-2 rounded-xl text-white shadow-md transition-all duration-300 ${activeComponent === 'add' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}
            onClick={() => setActiveComponent('add')}
          >
            ➕ Add Patient
          </button>
          <button
            className={`px-6 py-2 rounded-xl text-white shadow-md transition-all duration-300 ${activeComponent === 'view' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={() => setActiveComponent('view')}
          >
            👁️ Show Patients
          </button>
        </div>
      );
    }
    return null;
  };

  const getModuleBackground = () => {
    switch (activeModule) {
      case 'patients':
        return 'bg-green-50';
      case 'doctors':
        return 'bg-purple-50';
      case 'receptionists':
        return 'bg-pink-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${getModuleBackground()}`}>
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 border border-indigo-100">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8 drop-shadow-md">🏥 Admin Dashboard</h2>

        <div className="flex justify-center gap-6 mb-6 relative">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
            >
              📊 Select Module
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-lg z-10 border border-gray-200">
                <button
                  className="w-full text-left px-5 py-3 hover:bg-indigo-50 text-gray-700 font-medium"
                  onClick={() => handleSelect('patients')}
                >👨‍⚕️ Patients ({counts.patients})</button>
                <button
                  className="w-full text-left px-5 py-3 hover:bg-indigo-50 text-gray-700 font-medium"
                  onClick={() => handleSelect('doctors')}
                >🩺 Doctors ({counts.doctors})</button>
                <button
                  className="w-full text-left px-5 py-3 hover:bg-indigo-50 text-gray-700 font-medium"
                  onClick={() => handleSelect('receptionists')}
                >👩‍💼 Receptionists ({counts.receptionists})</button>
              </div>
            )}
          </div>
        </div>

        {renderModuleButtons()}

        <div className="rounded-2xl shadow-inner p-6 bg-white mt-4">
          {activeModule === 'patients' && activeComponent === 'add' && <AddPatient />}
          {activeModule === 'patients' && activeComponent === 'view' && <ViewPatients />}

          {activeModule === 'doctors' && (
            <p className="text-center text-purple-600 text-xl font-medium">🩺 Doctors component coming soon...</p>
          )}
          {activeModule === 'receptionists' && (
            <p className="text-center text-pink-600 text-xl font-medium">👩‍💼 Receptionists component coming soon...</p>
          )}

          {!activeModule && (
            <p className="text-center text-gray-400 text-lg">⬆️ Select an option above to begin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;