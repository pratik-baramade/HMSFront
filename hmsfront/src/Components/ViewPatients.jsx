import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PatientsService from "../PatientsService";
import UpdatePatient from "./UpdatePatient";
import Swal from "sweetalert2";


let ViewPatients = () => {
    let [Patient, SetPatients] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [editMode, setEditMode] = useState(false);
const [currentPatient, setCurrentPatient] = useState(null);


    useEffect(() => {
        fetchAllPatients();
      }, []);

      const fetchAllPatients = () => {
        PatientsService.getPatients()
          .then((res) => SetPatients(res.data))
          .catch(() => SetPatients([]));
      };

      useEffect(() => {
        if (searchText.trim() === "") {
          fetchAllPatients();
        } else {
          const timer = setTimeout(() => {
            PatientsService.SearchPatients(searchText)
              .then((res) => SetPatients(res.data))
              .catch(() => SetPatients([]));
          }, 500); // debounce 500ms
    
          return () => clearTimeout(timer);
        }
      }, [searchText]);

      // Inside the component
      const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            PatientsService.deletepatients(id)
              .then(() => {
                Swal.fire({
                  title: "Deleted!",
                  text: "Patient has been deleted.",
                  icon: "success"
                });
                fetchAllPatients(); // refresh after deletion
              })
              .catch(() => {
                Swal.fire({
                  title: "Failed!",
                  text: "Something went wrong while deleting.",
                  icon: "error"
                });
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
      .catch(() => alert("Failed to update patient"));
  };
  
  

    
    return (
        
            <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-primary mb-3">Patients Record</h3>

        {/* Search input */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search patient by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

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
              {
                Patient.length > 0 ? (
                    Patient.map((e, index) => (
                    <tr key={index}>
                      <td>{e.patientId}</td>
                      <td>{e.name}</td>
                      <td>{e.dob}</td>
                      <td>{e.gender}</td>
                      <td>{e.maritalstatus}</td>
                      <td>{e.address}</td>
                      <td>{e.email}</td>
                      <td>{e.wpnumber}</td>
                      <td>{e.mobailenumber}</td>
                      <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.patientId)}>Delete</button></td>
                      <td><button className="btn btn-warning btn-sm" onClick={() => handleEdit(e)}>Update</button></td> 
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">No patients found</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>

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