import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PharmacyService from "../Pages/PharmacyService";
import UpdatePharmacy from "./UpdatePharmacy";

export default function ViewPharmacy() {
  const [medicines, setMedicines] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);

  const fetchAllMedicines = () => {
    PharmacyService.getPharmacy()
      .then((res) => setMedicines(res.data))
      .catch(() => setMedicines([]));
  };

  useEffect(() => {
    fetchAllMedicines();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      fetchAllMedicines();
    } else {
      const timer = setTimeout(() => {
        PharmacyService.SearchPharmacy(searchText)
          .then((res) => setMedicines(res.data))
          .catch(() => setMedicines([]));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchText]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This medicine will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        PharmacyService.deletePharmacy(id)
          .then(() => {
            Swal.fire("Deleted!", "Medicine has been deleted.", "success");
            fetchAllMedicines();
          })
          .catch(() => {
            Swal.fire("Failed!", "Error deleting medicine.", "error");
          });
      }
    });
  };

  const handleUpdateClick = (medicine) => {
    setCurrentMedicine(medicine);
    setEditMode(true);
  };

  const handleUpdate = (updatedData) => {
    PharmacyService.updatePharmacy(updatedData.medicine_id, updatedData)
      .then(() => {
        Swal.fire("Updated!", "Medicine updated successfully.", "success");
        fetchAllMedicines();
        setEditMode(false);
      })
      .catch(() => {
        Swal.fire("Error", "Update failed!", "error");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h4 className="text-center text-primary mb-4 fw-semibold">💊 Pharmacy Inventory</h4>

        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search medicine by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-info sticky-top">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price (₹)</th>
                <th>Symptoms</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(medicines) && medicines.length > 0 ? (
                medicines.map((med, index) => (
                  <tr key={index}>
                    <td>{med.medicine_id}</td>
                    <td>{med.name}</td>
                    <td>{med.stock}</td>
                    <td>{med.price}</td>
                    <td>{med.symptoms}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(med.medicine_id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleUpdateClick(med)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No medicines found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editMode && currentMedicine && (
          <UpdatePharmacy
            medicine={currentMedicine}
            onUpdate={handleUpdate}
            onCancel={() => setEditMode(false)}
          />
        )}
      </div>
    </div>
  );
}
