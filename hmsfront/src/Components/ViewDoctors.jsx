import React, { useEffect, useState } from "react";
import DoctorsService from "../DoctorsService";
import Swal from "sweetalert2";
import UpdateDoctor from "./UpdateDoctor";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const fetchAllDoctors = () => {
    DoctorsService.getDoctors()
      .then((res) => setDoctors(res.data))
      .catch(() => setDoctors([]));
  };

  const filteredDoctors = searchText.trim()
    ? doctors.filter((doc) => doc.name.toLowerCase().includes(searchText.toLowerCase()))
    : doctors;

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  );

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
        DoctorsService.deleteDoctor(id)
          .then(() => {
            Swal.fire("Deleted!", "Doctor has been deleted.", "success");
            fetchAllDoctors();
          })
          .catch(() => Swal.fire("Failed!", "Something went wrong.", "error"));
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-primary mb-3">Doctors Record</h3>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search doctor by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-info">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDoctors.length > 0 ? (
                paginatedDoctors.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.doctorid}</td>
                    <td>{doc.name}</td>
                    <td>{doc.specialization}</td>
                    <td>{doc.contact}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc.doctorid)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No doctors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage}</span>
          <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * doctorsPerPage >= filteredDoctors.length}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctors;