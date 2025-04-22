import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import CheckupService from "../CheckupService";


const PatientPrescriptions = () => {
    const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setPatientId(user.id || user.patient_id); // make sure this matches your localStorage
    }
  }, []);

  useEffect(() => {
    if (patientId) {
      CheckupService.showPrescriptionByID(patientId)
        .then((res) => {
            console.log("✅ Prescription response:", res.data);
          setPrescriptions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch prescriptions:", err);
          setLoading(false);
        });
    }
  }, [patientId]);
  const handleBack = () => {
    navigate("/user/dashboard"); 
  };
  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-4">🩺 Your Prescriptions</h3>
      <button className="btn btn-outline-primary mb-3" onClick={handleBack}>
  ← Back to Dashboard
</button>

      {loading ? (
        <div className="text-center">
          <div className="d-flex justify-content-center align-items-center">
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
<p className="text-center mt-2">Loading prescriptions...</p>

        </div>
      ) : prescriptions.length === 0 ? (
        <div className="alert alert-info">No prescriptions found.</div>
      ) : (
        <div className="row">
          {prescriptions.map((pres, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-header bg-success text-white">
                  Appointment ID: {pres.appointment_id}
                </div>
                <div className="card-body">    
                  <p><strong>Patient Name:</strong> {pres.patientName}</p>
                  <p><strong>Symptoms:</strong> {pres.symptoms}</p>
                  <p><strong>Medicines:</strong> {pres.medicine}</p>
                  <p><strong>Tests Suggested:</strong> {pres.tests_suggested}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;
