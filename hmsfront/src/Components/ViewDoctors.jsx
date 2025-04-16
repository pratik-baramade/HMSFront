import React, { useEffect, useState } from "react";
import DoctorsService from "../DoctorsService";
import Swal from "sweetalert2";
import UpdateDoctor from "./UpdateDoctor";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const fetchAllDoctors = () => {
    DoctorsService.getDoctors()
      .then((res) => setDoctors(res.data))
      .catch(() => setDoctors([]));
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      fetchAllDoctors();
    } else {
      const filtered = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setDoctors(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

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
          .catch(() => {
            Swal.fire("Failed!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleEdit = (doctor) => {
    setCurrentDoctor(doctor);
    setEditMode(true);
  };

  const handleUpdateSave = (updatedDoctor) => {
    
    
    DoctorsService.updateDoctor(updatedDoctor.doctorid, updatedDoctor)
      .then(() => {
        Swal.fire({
          title: "Updated!",
          text: "Doctor updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setSearchText("");
        fetchAllDoctors();
        setEditMode(false);
        setCurrentDoctor(null);
      })
      .catch(() => {
        Swal.fire("Failed!", "Doctor update failed.", "error");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-primary mb-3">Doctors Record</h3>

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search doctor by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
          <table className="table table-hover table-striped table-bordered">
            <thead className="table-info sticky-top">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Availability</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.doctorid}</td>
                    <td>{doc.name}</td>
                    <td>{doc.specialization}</td>
                    <td>{doc.contact}</td>
                    <td>{doc.availability}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc.doctorid)}>Delete</button>
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(doc)}>Update</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No doctors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editMode && currentDoctor && (
  <UpdateDoctor
    doctor={currentDoctor}
    onUpdate={handleUpdateSave}
    onCancel={() => setEditMode(false)}
  />
)}

      </div>
    </div>
  );
};

export default ViewDoctors;
