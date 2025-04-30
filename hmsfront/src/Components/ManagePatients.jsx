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
                <td>{patient.mobile}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleExpand(patient.patientId)}
                  >
                    {expandedPatientId === patient.patientId ? "Cancel" : "Write Prescription"}
                  </button>
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

              {expandedPatientId === patient.patientId && (
                <tr>
                  <td colSpan="5">
                    <div className="p-3 bg-light border rounded">
                      <h5>Write Prescription for {patient.name}</h5>

                      <div className="mb-2">
                        <label>Symptoms:</label>
                        <textarea
                          className="form-control"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                        ></textarea>
                      </div>

                      <h6>Medicines (Count: {medicines.length}):</h6>
                      {medicines.map((med, index) => (
                        <div className="row mb-2" key={index}>
                          <div className="col-md-6">
                            <input
                              type="text"
                              list="pharmacy-names"
                              className="form-control"
                              placeholder="Medicine name"
                              value={med.name}
                              onChange={(e) => handleMedicineChange(index, e.target.value)}
                            />
                            <datalist id="pharmacy-names">
                              {pharmacyList.map((m) => (
                                <option key={m.id} value={m.name} />
                              ))}
                            </datalist>
                          </div>
                          <div className="col-md-4">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Price"
                              value={med.price}
                              onChange={(e) => handlePriceChange(index, e.target.value)}
                              disabled={!med.isCustom && pharmacyList.some(p => p.name === med.name)}
                            />
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary btn-sm mb-3" onClick={addMedicineField}>
                        + Add Medicine
                      </button>

                      <h6>Tests (Count: {tests.length}):</h6>
                      {tests.map((test, index) => (
                        <div className="row mb-2" key={index}>
                          <div className="col-md-6">
                            <input
                              type="text"
                              list="test-names"
                              className="form-control"
                              placeholder="Test name"
                              value={test.name}
                              onChange={(e) => handleTestChange(index, e.target.value)}
                            />
                            <datalist id="test-names">
                              {testList.map((t) => (
                                <option key={t.test_id} value={t.test_name} />
                              ))}
                            </datalist>
                          </div>
                          <div className="col-md-4">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Fee"
                              value={test.fess}
                              onChange={(e) => handleFeeChange(index, e.target.value)}
                              disabled={!test.isCustom && testList.some(t => t.test_name === test.name)}
                            />
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary btn-sm mb-3" onClick={addTestField}>
                        + Add Test
                      </button>

                      <div className="mb-2">
                        <label>Discount (%):</label>
                        <input
                          type="number"
                          className="form-control"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>

                      <h6>
                        Medicines: ₹{medicineTotal.toFixed(2)} (Count: {medicines.length}) | 
                        Tests: ₹{testTotal.toFixed(2)} (Count: {tests.length}) <br />
                        Gross Total: ₹{grossTotal.toFixed(2)} | Net Total: ₹{netTotal.toFixed(2)}
                      </h6>

                      <button className="btn btn-success" onClick={() => handleSubmit(patient)}>
                        Submit Prescription
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePatients;
