import React, { useEffect, useState } from "react";
import CheckupService from "../CheckupService";
import { useNavigate } from "react-router-dom";

const MedicalHistory = () => {
    const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setPatientId(user.patient_id || user.id);
    }
  }, []);

  useEffect(() => {
    if (patientId) {
      CheckupService.showPrescriptionByID(patientId)
        .then((res) => {
          console.log("Medical History response:", res.data);
          setHistory(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch medical history", err);
        });
    }
  }, [patientId]);


  const handleBack = () => {
    navigate("/user/dashboard"); 
  };
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Your Medical History</h3>
      <button className="btn btn-outline-primary mb-3" onClick={handleBack}>
  ← Back to Dashboard
</button>
      {history.length === 0 ? (
        <p>No medical history found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Appointment ID</th>
              <th>Symptoms</th>
              <th>Medicine</th>
              <th>Tests Suggested</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item.checkupid}>
                <td>{index + 1}</td>
                <td>{item.appointment_id}</td>
                <td>{item.symptoms}</td>
                <td>{item.medicine}</td>
                <td>{item.tests_suggested}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MedicalHistory;
