import React, { useState } from "react";
import Swal from "sweetalert2";
import DoctorsService from "../DoctorsService"; 

const AddDoctor = () => {
  const [doctorData, setDoctorData] = useState({
    name: "",
    specialization: "",
    contact: "",
    availability: ""
  });

  const handleInputChange = (e) => {
    setDoctorData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();

    // Debugging to check the state of doctorData
    console.log("Doctor Data Submitted: ", doctorData);

    if (!doctorData.name.trim()) {
      Swal.fire("Validation Error", "Please enter doctor's name.", "warning");
      return;
    }

    if (doctorData.name.charAt(0) !== doctorData.name.charAt(0).toUpperCase()) {
      Swal.fire("Validation Error",  "Doctors First letter  must be capitalized.", "warning");
      return;
    }

    if (!doctorData.specialization.trim()) {
      Swal.fire("Validation Error", "Please enter specialization.", "warning");
      return;
    }

    if (!doctorData.contact.trim()) {
      Swal.fire("Validation Error", "Please enter a valid mobile number.", "warning");
      return;
    }

    if (!/^\d{10}$/.test(doctorData.contact)) {
      Swal.fire("Validation Error", "Mobile number must be 10 digits.", "warning");
      return;
    }

    if (!doctorData.availability.trim()) {
      Swal.fire("Validation Error", "Please enter availability.", "warning");
      return;
    }

    // API call to add doctor
    DoctorsService.CreateDoctor(doctorData)
      .then((res) => {
        Swal.fire({
          title: "Doctor Added!",
          text: res.data || "New doctor has been successfully added.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          position: "center"
        });

        // Reset the form
        setDoctorData({
          name: "",
          specialization: "",
          contact: "",
          availability: ""
        });
      })
      .catch((err) => {
        console.error("Error while adding doctor:", err);
        Swal.fire({
          title: "Failed!",
          text: "Something went wrong while adding doctor.",
          icon: "error"
        });
      });
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h4 className="text-center mb-3 fw-semibold text-primary">➕ Add New Doctor</h4>
        <form onSubmit={handleAddDoctor}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              name="name" 
              value={doctorData.name} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Specialization</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              name="specialization" 
              value={doctorData.specialization} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Contact</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              name="contact" 
              value={doctorData.contact} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Availability</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              name="availability" 
              value={doctorData.availability} 
              onChange={handleInputChange} 
            />
          </div>
          <button type="submit" className="btn btn-success w-100 py-2">Add Doctor</button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
