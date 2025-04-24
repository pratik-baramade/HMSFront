import React, { useState, useEffect } from "react";
import AppointmentService from "../AppointmentService";
import Swal from "sweetalert2";

const UpdateAppointment = ({ appointment, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...appointment });

  useEffect(() => {
    setFormData({ ...appointment });
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AppointmentService.updateAppointment(formData.appointment_id, formData)
      .then(() => {
        Swal.fire("Success", "Appointment updated successfully", "success");
        onUpdate();
      })
      .catch((error) => {
        console.error("Update error:", error);
        Swal.fire("Error", "Failed to update appointment", "error");
      });
  };

  return (
    <div className="card mt-4 shadow p-4">
      <h5 className="mb-3 text-primary">Update Appointment</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            name="appointment_date"
            value={formData.appointment_date || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="time"
            placeholder="Time"
            value={formData.time || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success me-2">
            Update
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAppointment;