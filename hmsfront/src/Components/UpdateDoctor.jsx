import React, { useState, useEffect } from 'react';

const UpdateDoctor = ({ doctor, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: '',
    availability: ''
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || '',
        specialization: doctor.specialization || '',
        contact: doctor.contact || '',
        availability: doctor.availability || ''
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDoctor = {
      ...doctor,
      ...formData
    };
    onUpdate(updatedDoctor);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow bg-light">
        <h5 className="text-primary">Update Doctor</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="availability"
              placeholder="Availability"
              value={formData.availability}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success me-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctor;
