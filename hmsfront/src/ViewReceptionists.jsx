import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReceptionisService from "./ReceptionisService";
import UpdateReceptionist from "./Components/UpdateReceptionists"; // Make sure path is correct

export default function ViewReceptionists() {
  const [receptionists, setReceptionists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentReceptionist, setCurrentReceptionist] = useState(null);

  const fetchAllReceptionists = () => {
    ReceptionisService.getReceptionis()
      .then((res) => setReceptionists(res.data))
      .catch(() => setReceptionists([]));
  };

  useEffect(() => {
    fetchAllReceptionists();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      fetchAllReceptionists();
    } else {
      const timer = setTimeout(() => {
        ReceptionisService.searchReceptionis(searchText)
          .then((res) => setReceptionists(res.data))
          .catch(() => setReceptionists([]));
      }, 500);

      return () => clearTimeout(timer);
    }
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
        ReceptionisService.deleteReceptionis(id)
          .then(() => {
            Swal.fire("Deleted!", "Receptionist has been deleted.", "success");
            fetchAllReceptionists();
          })
          .catch(() => {
            Swal.fire("Failed!", "Error deleting receptionist.", "error");
          });
      }
    });
  };

  const handleUpdateClick = (receptionist) => {
    setCurrentReceptionist(receptionist);
    setEditMode(true);
  };

  const handleUpdate = async (updatedData) => {
    await ReceptionisService.updateReceptionis(updatedData.receptionisted_id, updatedData)
      .then(() => {
        fetchAllReceptionists();
        setEditMode(false);
      })
      .catch((err) => console.error("Update failed", err));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h4 className="text-center text-primary fw-semibold mb-4">👨‍💼 Receptionist Records</h4>

        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search receptionist by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-info sticky-top">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Password</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(receptionists) && receptionists.length > 0 ? (
                receptionists.map((r, i) => (
                  <tr key={i}>
                    <td>{r.receptionisted_id}</td>
                    <td>{r.name}</td>
                    <td>{r.userName}</td>
                    <td>{r.password}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.receptionisted_id)}>Delete</button>
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleUpdateClick(r)}>Update</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No receptionists found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editMode && currentReceptionist && (
          <UpdateReceptionist
            receptionist={currentReceptionist}
            onUpdate={handleUpdate}
            onCancel={() => setEditMode(false)}
          />
        )}
      </div>
    </div>
  );
}
