import React, { useEffect, useState } from "react";
import PatientsService from "../PatientsService";
import UpdatePatient from "./UpdatePatient";
import Swal from "sweetalert2";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5); // Show 10 patients per page

  useEffect(() => {
    fetchAllPatients();
  }, []);

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

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        PatientsService.deletepatients(id)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Patient has been deleted.",
              icon: "success",
            });
            fetchAllPatients();
          })
          .catch(() => {
            Swal.fire({
              title: "Failed!",
              text: "Something went wrong while deleting.",
              icon: "error",
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
        Swal.fire({
          title: "Updated!",
          text: "Patient has been updated successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          position: "center",
          didOpen: (popup) => {
            popup.setAttribute("draggable", "true");
          },
        });
        fetchAllPatients();
        setEditMode(false);
        setCurrentPatient(null);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update patient");
      });
  };

  // Calculate total pages
  const totalPages = Math.ceil(patients.length / patientsPerPage);

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
              {currentPatients.length > 0 ? (
                currentPatients.map((patient, index) => (
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

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            {/* Previous Page Button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}

            {/* Next Page Button */}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
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
<<<<<<< HEAD
  );
};

=======
    </>)
}
>>>>>>> origin/Pratik
export default ViewPatients;
