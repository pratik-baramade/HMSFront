import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function UpdateReceptionist({ receptionist, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({ ...receptionist });

  useEffect(() => {
    setFormData({ ...receptionist });
  }, [receptionist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData); // call parent update method

      // ✅ SweetAlert popup
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Receptionist updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      onCancel(); // close update form
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while updating.",
      });
    }
  };

  return (
    <div className="card mt-4 shadow p-4">
      <h5 className="mb-3 text-primary">Update Receptionist Details</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="receptionisted_id"
            placeholder="Receptionist ID"
            value={formData.receptionisted_id}
            onChange={handleChange}
            readOnly // 🟡 Readonly, ID is not editable
            required
          />
        </div>
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
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success me-2">
            Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
