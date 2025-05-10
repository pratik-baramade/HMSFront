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

  const handleExpand = (patientId) => {
    if (expandedPatientId === patientId) {
      setExpandedPatientId(null);
    } else {
      setExpandedPatientId(patientId);
      setSymptoms("");
      setMedicines([{ name: "", price: "", isCustom: false }]);
      setTests([{ name: "", fess: "", isCustom: false }]);
      setDiscount(0);
    }
  };

  const handleMedicineChange = (index, value) => {
    const updated = [...medicines];
    const selected = pharmacyList.find((m) => m.name === value);
    if (selected) {
      updated[index] = { name: selected.name, price: selected.price, isCustom: false };
    } else {
      updated[index] = { name: value, price: "", isCustom: true };
    }
    setMedicines(updated);
  };

  const handlePriceChange = (index, price) => {
    const updated = [...medicines];
    updated[index].price = price;
    setMedicines(updated);
  };

  const addMedicineField = () => {
    setMedicines([...medicines, { name: "", price: "", isCustom: false }]);
  };

  const handleTestChange = (index, value) => {
    const updatedTests = [...tests];
    const selectedTest = testList.find((t) => t.test_name === value);
    
    if (selectedTest) {
      updatedTests[index] = { 
        name: selectedTest.test_name, 
        fess: selectedTest.fess || 0, // Ensure the fee is populated
        isCustom: false 
      };
    } else {
      updatedTests[index] = { name: value, fess: "", isCustom: true };
    }

    setTests(updatedTests);
  };

  const handleFeeChange = (index, fess) => {
    const updatedTests = [...tests];
    updatedTests[index].fess = fess;
    setTests(updatedTests);
  };

  const addTestField = () => {
    setTests([...tests, { name: "", fess: "", isCustom: false }]);
  };

  // Calculate totals
  const medicineTotal = medicines.reduce((sum, med) => sum + (parseFloat(med.price) || 0), 0);
  const testTotal = tests.reduce((sum, test) => sum + (parseFloat(test.fess) || 0), 0);
  const grossTotal = medicineTotal + testTotal;
  const netTotal = grossTotal - (grossTotal * discount) / 100;

  const handleSubmit = (patient) => {
    const payload = {
      patient_id: patient.patientId,
      symptoms,
      medicine: medicines.map((m) => `${m.name}:${m.price}`).join(", "),
      tests_suggested: tests.map((t) => `${t.name}:${t.fess}`).join(", "),
      total_bill: netTotal,
      appointment_id: patient.appointmentId || null,
    };

    CheckupService.CreatePrescription(payload)
      .then(() => {
        Swal.fire("Success", "Prescription and tests saved!", "success");
        setExpandedPatientId(null);
      })
      .catch((err) => {
        console.error("Error submitting prescription:", err);
        Swal.fire("Error", "Failed to submit.", "error");
      });
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {filteredPatients.map((patient) => (
            <React.Fragment key={patient.patientId}>
              <tr>
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

              
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePatients;
