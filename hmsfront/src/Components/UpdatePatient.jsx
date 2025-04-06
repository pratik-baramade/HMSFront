import React, { useState, useEffect } from "react";

const UpdatePatient = ({ patient, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...patient });

  useEffect(() => {
    setFormData({ ...patient });
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="card mt-4 shadow p-4">
      <h5 className="mb-3 text-primary">Update Patient Details</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input type="text" className="form-control" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="maritalstatus" placeholder="Marital Status" value={formData.maritalstatus} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="mobailenumber" placeholder="Mobile Number" value={formData.mobailenumber} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="wpnumber" placeholder="WhatsApp Number" value={formData.wpnumber} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePatient;
