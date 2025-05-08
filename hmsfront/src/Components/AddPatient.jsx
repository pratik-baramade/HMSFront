import React, { useState } from "react";
import PatientsService from "../PatientsService";
import Swal from "sweetalert2";

const AddPatient = () => {
  const [PData, SetPatients] = useState({
    name: "",
    dob: "",
    gender: "",
    maritalstatus: "",
    email: "",
    mobailenumber: "", 
    wpnumber: "",
    address: ""
  });

  const [sms, setsms] = useState("");

  const Universalhand = (e) => {
    SetPatients(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const ShowPaitients = (e) => {
    e.preventDefault();
    if (!PData.name.trim()) {
      Swal.fire("Validation Error", "Please enter patient's name.", "warning");
      return;
    }
    if (PData.name.charAt(0) !== PData.name.charAt(0).toUpperCase()) {
      Swal.fire("Validation Error", "First letter of the name must be capitalized.", "warning");
      return;
    }

    // DOB validation
    if (!PData.dob) {
      Swal.fire("Validation Error", "Please select patient's Date of Birth.", "warning");
      return;
    }
    const selectedDOB = new Date(PData.dob);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (selectedDOB > currentDate) {
      Swal.fire("Validation Error", "Date of Birth cannot be in the future.", "warning");
      return;
    }

    // Gender validation
    if (!PData.gender.trim()) {
      Swal.fire("Validation Error", "Please enter gender.", "warning");
      return;
    }

    // Marital status validation
    if (!PData.maritalstatus.trim()) {
      Swal.fire("Validation Error", "Please enter marital status.", "warning");
      return;
    }

    // Email validation
    if (!PData.email.trim()) {
      Swal.fire("Validation Error", "Please enter email.", "warning");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PData.email)) {
      Swal.fire("Validation Error", "Please enter a valid email address.", "warning");
      return;
    }
    if (!PData.email.endsWith('.com')) {
      Swal.fire("Validation Error", "The email must end with .com.", "warning");
      return;
    }
    if (/\d/.test(PData.email.charAt(0))) {
      Swal.fire("Validation Error", "The first character of the email cannot be a number.", "warning");
      return;
    }
    if (PData.email.startsWith("@")) {
      Swal.fire("Validation Error", "Invalid email format.", "warning");
      return;
    }

    // Mobile number validation
    if (!PData.mobailenumber.trim()) { // updated to match the state
      Swal.fire("Validation Error", "Please enter a valid mobile number.", "warning");
      return;
    }
    if (!/^\d{10}$/.test(PData.mobailenumber)) { // updated to match the state
      Swal.fire("Validation Error", "Mobile number must be 10 digits.", "warning");
      return;
    }

    // WhatsApp number validation
    if (!PData.wpnumber.trim()) {
      Swal.fire("Validation Error", "Please enter WhatsApp number.", "warning");
      return;
    }
    if (!/^\d{10}$/.test(PData.wpnumber)) {
      Swal.fire("Validation Error", "WhatsApp number must be 10 digits.", "warning");
      return;
    }

    // Address validation
    if (!PData.address.trim()) {
      Swal.fire("Validation Error", "Please enter address.", "warning");
      return;
    }

    // Submit the form
    PatientsService.CreatePatients(PData)
      .then((res) => {
        Swal.fire({
          title: "Patient Added!",
          text: res.data || "New patient has been successfully added.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          position: "center"
        });

        // Reset the form after submission
        SetPatients({
          name: "",
          dob: "",
          gender: "",
          maritalstatus: "",
          email: "",
          mobailenumber: "",
          wpnumber: "",
          address: ""
        });

        setsms(""); // Clear old messages if needed
      })
      .catch((err) => {
        setsms(err.data || "Error adding patient");
      });
  };

  return (
    <div className="patientcontainer mt-4 d-flex justify-content-center ">
      <div className="card shadow-sm p-3" style={{ maxWidth: "100%", width: "100%", height:"500px" }}>
        <h4 className="text-center mb-3 fw-semibold text-primary">➕ Add New Patient</h4>
        <form onSubmit={ShowPaitients}>
          <div className="row">
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control form-control-sm p-2" id="name" name="name" value={PData.name} onChange={Universalhand} />
            </div>
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input type="date" className="form-control form-control-sm p-2" id="dob" name="dob" value={PData.dob} onChange={Universalhand} />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="gender" className="form-label">Gender</label>
              <input type="text" className="form-control form-control-sm p-2" id="gender" name="gender" value={PData.gender} onChange={Universalhand} />
            </div>
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="maritalstatus" className="form-label">Marital Status</label>
              <input type="text" className="form-control form-control-sm p-2" id="maritalstatus" name="maritalstatus" value={PData.maritalstatus} onChange={Universalhand} />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" className="form-control form-control-sm p-2" id="email" name="email" value={PData.email} onChange={Universalhand} />
            </div>
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="mobailenumber" className="form-label">Mobile Number</label>
              <input type="text" className="form-control form-control-sm p-2" id="mobailenumber" name="mobailenumber" value={PData.mobailenumber} onChange={Universalhand} />

            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="wpnumber" className="form-label">Whatsapp Number</label>
              <input type="text" className="form-control form-control-sm p-2" id="wpnumber" name="wpnumber" value={PData.wpnumber} onChange={Universalhand} />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea className="form-control form-control-sm" id="address" name="address" value={PData.address} onChange={Universalhand} rows={2}></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 py-2">Add Patient</button>
          {sms && <p className="text-center mt-3 text-success fw-medium">{sms}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
