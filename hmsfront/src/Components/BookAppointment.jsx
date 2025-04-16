import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import DoctorsService from "../DoctorsService";
import PatientsService from "../PatientsService";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    Appointment_date: "",
    time: "",
    Status: "Pending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    DoctorsService.getDoctors().then((res) => setDoctors(res.data));
    PatientsService.getPatients().then((res) => setPatients(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/appointments", formData)
      .then(() => {
        Swal.fire("Success", "Appointment booked successfully!", "success");
        setFormData({
          patient_id: "",
          doctor_id: "",
          Appointment_date: "",
          time: "",
          
        });
      })
      .catch(() => Swal.fire("Error", "Could not book appointment", "error"));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-primary text-center mb-4">🗓️ Book Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Patient</label>
              <select
                className="form-select"
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Patient</option>
                {patients.map((pat) => (
                  <option key={pat.patient_id} value={pat.patient_id}>
                    {pat.name} 
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Doctor</label>
              <select
                className="form-select"
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.doctor_id} value={doc.doctor_id}>
                     {doc.name} - {doc.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                className="form-control"
                name="Appointment_date"
                value={formData.Appointment_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success px-4 mt-2">
                Book Now
              </button>
            </div>


            <div className="col-12 text-center">
            <button type="button" className="btn btn-danger px-4 mt-2 me-2  text-black" onClick={() => navigate("/user")}>Back</button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
