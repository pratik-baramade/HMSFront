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
    
      // Optional: Reset form after submission
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
    
      setsms(""); // clear old messages if needed
    })
    
      .catch((res) => {
        setsms(res.data || "Error adding patient");
      });
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h4 className="text-center mb-3 fw-semibold text-primary">➕ Add New Patient</h4>
        <form onSubmit={ShowPaitients}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control form-control-sm" id="name" name="name" value={PData.name} onChange={Universalhand} />
          </div>
          <div className="mb-2">
            <label htmlFor="date" className="form-label">DOB</label>
            <input type="date" className="form-control form-control-sm" id="date" name="dob" value={PData.dob} onChange={Universalhand} />
          </div>
          <div className="mb-2">
            <label htmlFor="gender" className="form-label">Gender</label>
            <input type="text" className="form-control form-control-sm" id="gender" name="gender" value={PData.gender} onChange={Universalhand} />
          </div>
          <div className="mb-2">
            <label htmlFor="m" className="form-label">Marital Status</label>
            <input type="text" className="form-control form-control-sm" id="m" name="maritalstatus" value={PData.maritalstatus} onChange={Universalhand} />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control form-control-sm" id="email" name="email" value={PData.email} onChange={Universalhand} />
          </div>
          <div className="mb-2">
            <label htmlFor="mobailenumber" className="form-label">Mobile Number</label>
            <input type="text" className="form-control form-control-sm" id="mobailenumber" name="mobailenumber" value={PData.mobailenumber} onChange={Universalhand} />
          </div>
          <div className="mb-2">
            <label htmlFor="wpnumber" className="form-label">Whatsapp Number</label>
            <input type="text" className="form-control form-control-sm" id="wpnumber" name="wpnumber" value={PData.wpnumber} onChange={Universalhand} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea className="form-control form-control-sm" id="address" name="address" value={PData.address} onChange={Universalhand} rows={2}></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100 py-2">Add Patient</button>
          {sms && <p className="text-center mt-3 text-success fw-medium">{sms}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
