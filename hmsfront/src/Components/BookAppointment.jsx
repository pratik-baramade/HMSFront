import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DoctorsService from "../DoctorsService";
import PatientsService from "../PatientsService";
import AppointmentService from "../AppointmentService";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    time: "",
    status: "Pending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    DoctorsService.getDoctors()
      .then((res) => {
        console.log("doctor data:",res.data);
        
        setDoctors(res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  
    PatientsService.getPatients()
      .then((res) => {
        console.log("patients data:",res.data);
        setPatients(res.data);
      })
      .catch((err) => {
        console.error("Error fetching patients:", err);
      });
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const payload = {
      ...formData,
      patient_id: parseInt(formData.patient_id),
      doctor_id: parseInt(formData.doctor_id),
    };
  
    AppointmentService.CreateAppointment(payload)
      .then(() => {
        Swal.fire("Success", "Appointment booked successfully!", "success");
        setFormData({
          patient_id: "",
          doctor_id: "",
          appointment_date: "",
          time: "",
          status: "Pending",
        });
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        Swal.fire("Error", "Could not book appointment", "error");
      });
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
   <option key={pat.patientId} value={pat.patientId}>
   {pat.patientId}-{pat.name} 
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
    <option key={doc.doctorid} value={doc.doctorid}>
   {doc.doctorid}- {doc.name} 
  </option>
  
  ))}
</select>


            </div>

            <div className="col-md-6">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                className="form-control"
                name="appointment_date"
                value={formData.appointment_date}
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
              <button type="submit" className="btn btn-success px-4 mt-2" >
                Book Now
              </button>
            </div>


            
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
