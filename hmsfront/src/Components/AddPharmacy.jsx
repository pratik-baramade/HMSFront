import React, { useState } from "react";
import PharmacyService from "../Pages/PharmacyService";
import Swal from "sweetalert2";

const AddPharmacy = () => {
  const [pharmacyData, setPharmacyData] = useState({
    name: "",
    stock: "",
    price: "",
    symptoms: "",
  });

  const [message, setMessage] = useState("");

   if (!pharmacyData.name.trim()) {
        Swal.fire("Validation Error", "Please enter Medicine Name.", "warning");
        return;
      }
      if (!pharmacyData.stock.trim()) {
        Swal.fire("Validation Error", "Please enter stock.", "warning");
        return;
      }
      if (!pharmacyData.price.trim()) {
        Swal.fire("Validation Error", "Please enter pharmacy Price.", "warning");
        return;
      }
      if (!/^\d{10}$/.test(pharmacyData.price)) {
        Swal.fire("Validation Error", "WhatsApp number must be 10 digits.", "warning");
        return;
      }
      if (!pharmacyData.symptoms.trim()) {
        Swal.fire("Validation Error", "Please enter symptoms.", "warning");
        return;
      }
  

  const handleChange = (e) => {
    setPharmacyData({
      ...pharmacyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the POST request to add the new medicine to the pharmacy
    PharmacyService.CreatePharmacy(pharmacyData)
      .then((response) => {
        setMessage("Medicine added successfully!");
        Swal.fire("Success!", "Medicine has been added to the inventory.", "success");
      })
      .catch((error) => {
        console.error("Error adding medicine:", error);
        setMessage("Error while adding medicine.");
        Swal.fire("Error", "Failed to add medicine.", "error");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h4 className="text-center text-primary mb-4">➕ Add New Medicine</h4>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Medicine Name"
              value={pharmacyData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="stock"
              placeholder="Stock"
              value={pharmacyData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="Price (₹)"
              value={pharmacyData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="symptoms"
              placeholder="Symptoms"
              value={pharmacyData.symptoms}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">Add Medicine</button>
          </div>
        </form>

        {message && <div className="mt-3 text-center text-muted">{message}</div>}
      </div>
    </div>
  );
};

export default AddPharmacy;
