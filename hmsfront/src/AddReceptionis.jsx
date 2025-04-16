import React, { useState } from "react";
import ReceptionisService from "./ReceptionisService";
import Swal from "sweetalert2"; // ✅ Import SweetAlert

export default function AddReceptionis() {
  const [receptionist, setReceptionist] = useState({
    receptionisted_id: "",
    name: "",
    userName: "",
    password: ""
  });

  const Universalhandler = (e) => {
    setReceptionist((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const ShowReceptionis = (e) => {
    e.preventDefault();
    ReceptionisService.CreateReceptionis(receptionist)
      .then((res) => {
        // ✅ Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Receptionist added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        // Clear form after success
        setReceptionist({
          receptionisted_id: "",
          name: "",
          userName: "",
          password: ""
        });
      })
      .catch((error) => {
        // ❌ Show error alert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.response?.data || "Error adding receptionist."
        });
      });
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h4 className="text-center mb-3 fw-semibold text-primary">➕ Add New Receptionist</h4>
        <form onSubmit={ShowReceptionis}>
          <div className="mb-3">
            <label htmlFor="id">Receptionist ID</label>
            <input
              type="text"
              name="receptionisted_id"
              className="form-control form-control-sm"
              value={receptionist.receptionisted_id}
              onChange={Universalhandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="n">Receptionist Name</label>
            <input
              type="text"
              name="name"
              className="form-control form-control-sm"
              value={receptionist.name}
              onChange={Universalhandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="un">Receptionist Username</label>
            <input
              type="text"
              name="userName"
              className="form-control form-control-sm"
              value={receptionist.userName}
              onChange={Universalhandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="p">Receptionist Password</label>
            <input
              type="text"
              name="password"
              className="form-control form-control-sm"
              value={receptionist.password}
              onChange={Universalhandler}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 py-2">
            Add Receptionist
          </button>
        </form>
      </div>
    </div>
  );
}
