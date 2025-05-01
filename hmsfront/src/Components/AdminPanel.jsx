import React, { useState } from 'react';
import AddPatient from './AddPatient';
import ViewPatients from './ViewPatients';

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Admin Panel</h2>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-success" onClick={() => setActiveComponent('add')}>Add Patient</button>
        <button className="btn btn-info" onClick={() => setActiveComponent('view')}>Show Patients</button>
      </div>
      <div className="card shadow p-3">
        {
          activeComponent === 'add' ? <AddPatient /> :
          activeComponent === 'view' ? <ViewPatients /> :
          <p className="text-center text-muted">Select an option above to begin.</p>
        }
      </div>
    </div>
  );
};

export default AdminPanel;
