import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorsService from '../DoctorsService';
import Swal from 'sweetalert2';

const EditDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: '',
    availability: ''
  });

  const navigate = useNavigate();



  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission to update doctor's profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const doctorId = storedUser.id;

    try {
      // Send updated data to the backend (assuming you have the updateDoctor method in DoctorsService)
      await DoctorsService.updateDoctor(doctorId, formData);

      // Update doctor info in localStorage
      localStorage.setItem('user', JSON.stringify({ id: doctorId, ...formData }));

      Swal.fire('Success', 'Profile updated successfully!', 'success');
      navigate('/doctor/dashboard');
    } catch (error) {
      Swal.fire('Error', 'Failed to update profile.', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow bg-light">
        <h5 className="text-primary mb-3">Edit Your Profile</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="specialization"
              className="form-control"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="contact"
              className="form-control"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="availability"
              className="form-control"
              placeholder="Availability"
              value={formData.availability}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success me-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/doctor/dashboard")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctor;
