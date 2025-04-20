import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PatientsService from "../PatientsService";

const EditPatientsProfile = () => {
    const [formData, setFormData] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            if (user.patient_id) {
              setFormData(user);
            } else {
              console.warn("User found in localStorage but missing 'id'.", user);
            }
          } catch (e) {
            console.error("Error parsing localStorage user:", e);
          }
        } else {
          console.warn("No user found in localStorage.");
        }
        setLoading(false); // stop loading in all cases
      }, []);

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
      // use PatientsService here instead of axios
      await PatientsService.updatePatient(formData.patient_id, formData);

      localStorage.setItem("user", JSON.stringify(formData));

      Swal.fire({
        title: "Updated!",
        text: "Profile updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/patient/dashboard");
      });
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Cancel Editing?",
      text: "All unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, go back",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/patient/dashboard");
      }
    });
  };

  if (loading) return <p>Loading...</p>;

  if (!formData || !formData.patient_id) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          No user data found. Please login or register again.
        </div>
      </div>
    );
  }


  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="mb-4 text-primary">Edit Profile</h4>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="Name"
              placeholder="Name"
              value={formData.Name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              name="Dob"
              value={formData.Dob || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="gender"
              placeholder="Gender"
              value={formData.gender || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="Maritalstaus"
              placeholder="Marital Status"
              value={formData.Maritalstaus || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="mobailenumber"
              placeholder="Mobile Number"
              value={formData.mobailenumber || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="wpnumber"
              placeholder="Whatsapp Number"
              value={formData.wpnumber || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <textarea
              className="form-control"
              name="address"
              rows="2"
              placeholder="Address"
              value={formData.Address || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success me-2">
              Update
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientsProfile;
