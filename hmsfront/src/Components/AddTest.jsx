import React, { useState } from "react";
import TestService from "../Pages/TestService";
import Swal from "sweetalert2";

const AddTest = () => {
  const [test, setTest] = useState({
    test_name: "",
    fees: "", // ✅ fixed spelling from fess to fees
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    TestService.createTest(test)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Test added successfully!",
        });
        setTest({ test_name: "", fees: "", description: "", category: "" });
      })
      .catch((err) => {
        console.error("Error adding test", err);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not add test. Please try again.",
        });
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Add Lab Test</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Test Name</label>
              <input
                type="text"
                name="test_name"
                value={test.test_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fees</label>
              <input
                type="number"
                name="fees" // ✅ use "fees" not "fess"
                value={test.fees}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={test.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={test.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Add Test
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTest;
