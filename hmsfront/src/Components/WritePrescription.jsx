import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import PharmacyService from "../Pages/PharmacyService";

const WritePrescription = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const [problem, setProblem] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [medicinePrice, setMedicinePrice] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [bill, setBill] = useState(null);
  const [allMedicines, setAllMedicines] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    PharmacyService.getPharmacy()
      .then((res) => {
        setAllMedicines(res.data);
      })
      .catch((err) => console.error("Error fetching medicines:", err));
  }, []);

  const handleMedicineNameChange = (e) => {
    const input = e.target.value;
    setMedicineName(input);

    const filtered = allMedicines.filter((med) =>
      med.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);

    const matchedMedicine = allMedicines.find(
      (med) => med.name.toLowerCase() === input.toLowerCase()
    );

    if (matchedMedicine) {
      setMedicinePrice(matchedMedicine.price);
    } else {
      setMedicinePrice("");
    }
  };

  const handleSelectSuggestion = (name, price) => {
    setMedicineName(name);
    setMedicinePrice(price);
    setFilteredSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const prescription = {
      patientId: patient.patientId,
      patientName: patient.name,
      mobile: patient.mobailenumber,
      problem,
      bloodPressure,
      sugarLevel,
      medicineName,
      medicinePrice,
      date: new Date().toLocaleDateString()
    };

    console.log("Prescription submitted:", prescription);

    setBill({
      ...prescription,
      totalAmount: parseFloat(medicinePrice)
    });

    Swal.fire({
      title: "Success!",
      text: "Prescription and bill saved successfully.",
      icon: "success",
      confirmButtonText: "OK"
    });

    setProblem("");
    setBloodPressure("");
    setSugarLevel("");
    setMedicineName("");
    setMedicinePrice("");
  };

  if (!patient) {
    return <p className="text-center mt-4 text-danger">No patient selected.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4 text-info">Write Prescription</h3>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Patient Name</label>
              <input type="text" className="form-control" value={patient.name} readOnly />
            </div>
            <div className="col-md-6">
              <label>Mobile</label>
              <input type="text" className="form-control" value={patient.mobailenumber} readOnly />
            </div>
          </div>

          <div className="mb-3">
            <label>Problem Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. Fever, Headache, etc."
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label>Blood Pressure (mmHg)</label>
              <input
                type="text"
                className="form-control"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                placeholder="e.g. 120/80"
              />
            </div>
            <div className="col-md-6">
              <label>Sugar Level (mg/dL)</label>
              <input
                type="text"
                className="form-control"
                value={sugarLevel}
                onChange={(e) => setSugarLevel(e.target.value)}
                placeholder="e.g. 90"
              />
            </div>
          </div>

          <div className="row mb-3 position-relative">
            <div className="col-md-6">
              <label>Medicine Name</label>
              <input
                type="text"
                className="form-control"
                value={medicineName}
                onChange={handleMedicineNameChange}
                placeholder="e.g. Paracetamol"
                required
              />
              {filteredSuggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 z-index-3">
                  {filteredSuggestions.map((med, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelectSuggestion(med.name, med.price)}
                      style={{ cursor: "pointer" }}
                    >
                      {med.name} - ₹{med.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-md-6">
              <label>Medicine Price (₹)</label>
              <input
                type="number"
                className="form-control"
                value={medicinePrice}
                onChange={(e) => setMedicinePrice(e.target.value)}
                placeholder="e.g. 50"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-2">
            Save Prescription & Generate Bill
          </button>
        </form>
      </div>

      {bill && (
        <div className="card mt-4 p-4 border-success shadow-sm">
          <h4 className="text-success text-center mb-3">Prescription Bill</h4>
          <p><strong>Date:</strong> {bill.date}</p>
          <p><strong>Patient:</strong> {bill.patientName}</p>
          <p><strong>Mobile:</strong> {bill.mobile}</p>
          <p><strong>Problem:</strong> {bill.problem}</p>
          <p><strong>Blood Pressure:</strong> {bill.bloodPressure || "Not Recorded"}</p>
          <p><strong>Sugar Level:</strong> {bill.sugarLevel || "Not Recorded"}</p>
          <p><strong>Medicine:</strong> {bill.medicineName}</p>
          <p><strong>Price:</strong> ₹{bill.medicinePrice}</p>
          <hr />
          <h5 className="text-end">Total Amount: ₹{bill.totalAmount}</h5>
        </div>
      )}
    </div>
  );
};

export default WritePrescription;
