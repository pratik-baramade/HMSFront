import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientService from "../PatientsService";
import PharmacyService from "../Pages/PharmacyService";
import CheckupService from "../CheckupService";
import TestService from "../Pages/TestService";
import Swal from "sweetalert2";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [pharmacyList, setPharmacyList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", price: "", isCustom: false }]);
  const [tests, setTests] = useState([{ name: "", fess: "", isCustom: false }]);
  const [discount, setDiscount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    PatientService.getPatients()
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Error fetching patients:", err));

    PharmacyService.getPharmacy()
      .then((res) => setPharmacyList(res.data))
      .catch((err) => console.error("Error fetching pharmacy:", err));

    TestService.getAllTests()
      .then((res) => setTestList(res.data))
      .catch((err) => console.error("Error fetching tests:", err));
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const displayedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success text-center mb-4">Manage Patients</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search patient by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead className="table-info">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedPatients.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.patientId}</td>
              <td>{patient.name}</td>
              <td>{patient.dob}</td>
              <td>{patient.mobailenumber}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/update-patient/${patient.patientId}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => PatientService.deletepatients(patient.patientId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManagePatients;
