import React, { useEffect, useState } from "react";
import PatientsService from "../PatientsService";
import UpdatePatient from "./UpdatePatient";
import Swal from "sweetalert2";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = () => {
    PatientsService.getPatients()
      .then((res) => {
        setPatients(res.data);
        console.log("Fetched patients:", res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setPatients([]);
      });
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      fetchAllPatients();
    } else {
      const timer = setTimeout(() => {
        PatientsService.SearchPatients(searchText)
          .then((res) => setPatients(res.data))
          .catch((err) => {
            console.error("Search error:", err);
            setPatients([]);
          });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchText]);

  const handleDelete = (id) => {
    console.log("Deleting patient with ID:", id, typeof id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      console.log("SweetAlert result:", result);
      if (result.isConfirmed) {
        PatientsService.deletepatients(id)
          .then(() => {
            Swal.fire("Deleted!", "Patient has been deleted.", "success");
            fetchAllPatients();
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire("Failed!", "Something went wrong while deleting.", "error");
          });
      }
    });
  };

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setEditMode(true);
  };

  const handleUpdateSave = (updatedPatient) => {
    PatientsService.updatePatient(updatedPatient.patientId, updatedPatient)
      .then(() => {
        alert("Patient updated successfully!");
        fetchAllPatients();
        setEditMode(false);
        setCurrentPatient(null);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update patient");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-primary mb-3">Patients Record</h3>

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search patient by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
          <table className="table table-hover table-striped table-bordered">
            <thead className="table-success sticky-top">
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Marital Status</th>
                <th>Address</th>
                <th>Email</th>
                <th>Whatsapp</th>
                <th>Mobile</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.patientId}</td>
                    <td>{patient.name}</td>
                    <td>{patient.dob}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.maritalstatus}</td>
                    <td>{patient.address}</td>
                    <td>{patient.email}</td>
                    <td>{patient.wpnumber}</td>
                    <td>{patient.mobailenumber}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(patient.patientId)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(patient)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Update section */}
        {editMode && currentPatient && (
          <UpdatePatient
            patient={currentPatient}
            onUpdate={handleUpdateSave}
            onCancel={() => setEditMode(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewPatients;
