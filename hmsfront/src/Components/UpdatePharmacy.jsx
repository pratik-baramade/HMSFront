import React, { useState, useEffect } from "react";

const UpdatePharmacy = ({ medicine, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    price: "",
    symptoms: ""
  });

  useEffect(() => {
    if (medicine) {
      setFormData({ ...medicine });
    }
  }, [medicine]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add simple validation
    if (formData.name === "" || formData.stock === "" || formData.price <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }
    onUpdate(formData);
  };

  if (!medicine) {
    return <p>Medicine data is missing or invalid.</p>;
  }

  return (
    <div className="card mt-4 shadow p-4">
      <h5 className="mb-3 text-primary">Update Medicine Details</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="symptoms"
            placeholder="Symptoms"
            value={formData.symptoms}
            onChange={handleChange}
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
};

export default UpdatePharmacy;
