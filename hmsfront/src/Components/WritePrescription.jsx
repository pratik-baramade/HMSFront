import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PharmacyService from "../Pages/PharmacyService";
import CheckupService from "../CheckupService";
import Swal from "sweetalert2";
import TestService from "../Pages/TestService";

const WritePrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const appointment_id = location.state?.appointment_id;  // Correctly getting appointment_id

  const [pharmacyList, setPharmacyList] = useState([]);
  const [testList, setTestList] = useState([]);  // 🆕 All available tests
  const [selectedTests, setSelectedTests] = useState([{ name: "", fess: "" }]);  // 🆕 Selected tests
  const [medicines, setMedicines] = useState([{ name: "", price: "", quantity: 1, isCustom: false }]);
  const [symptoms, setSymptoms] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    console.log("Patient:", patient);
    console.log("Appointment ID:", appointment_id);  // Changed to appointmentId
  }, [patient, appointment_id]);  // Changed to appointmentId
  
  useEffect(() => {
    PharmacyService.getPharmacy()
      .then((res) => setPharmacyList(res.data))
      .catch((err) => console.error("Pharmacy fetch error:", err));

    TestService.getAllTests()
      .then((res) => {
        console.log("Tests fetched:", res.data); // 🔥 Console log for checking
        setTestList(res.data);
      })
      .catch((err) => console.error("Test fetch error:", err));
  }, []);

  // 🆕 Handle Test Changes
  const handleTestChange = (index, value) => {
    const updated = [...selectedTests];
    const selected = testList.find((t) => t.test_name === value);
    if (selected) {
      updated[index] = { name: selected.test_name, 
        fess: selected.fess };  // Using fess as is
    } else {
      updated[index] = { name: value, 
        fess: "" };  // Using fess as is
    }
    setSelectedTests(updated);
  };

  const handleTestFeesChange = (index, fess) => {  // Using fess as is
    const updated = [...selectedTests];
    updated[index].fess = fess;  // Using fess as is
    setSelectedTests(updated);
  };

  const addTestField = () => {
    setSelectedTests([...selectedTests, { name: "", fess: "" }]);  // Using fess as is
  };

  // Medicine Handlers
  const handleMedicineChange = (index, value) => {
    const updated = [...medicines];
    const selected = pharmacyList.find((m) => m.name === value);
    if (selected) {
      updated[index] = { ...updated[index], name: selected.name, price: selected.price, isCustom: false };
    } else {
      updated[index] = { ...updated[index], name: value, price: "", isCustom: true };
    }
    setMedicines(updated);
  };

  const handlePriceChange = (index, price) => {
    const updated = [...medicines];
    updated[index].price = price;
    setMedicines(updated);
  };

  const handleQuantityChange = (index, quantity) => {
    const updated = [...medicines];
    updated[index].quantity = quantity;
    setMedicines(updated);
  };

  const addMedicineField = () => {
    setMedicines([...medicines, { name: "", price: "", quantity: 1, isCustom: false }]);
  };

  // Calculations
  const medicineTotal = medicines.reduce((sum, med) => sum + (parseFloat(med.price) || 0) * (parseInt(med.quantity) || 1), 0);
  const testsTotal = selectedTests.reduce((sum, test) => sum + (parseFloat(test.fess) || 0), 0);  // Using fess as is
  const total = medicineTotal + testsTotal;
  const netTotal = total - (total * discount) / 100;

  // Submit Handler
  const handleSubmit = () => {
    if (!patient?.patientId || !appointment_id) {
      Swal.fire("Error", "Invalid patient or appointment data.", "error");
      return;
    }

    const payload = {
      appointment_id: appointment_id,  // Changed to appointmentId
      patient_id: patient.patientId,
      symptoms: symptoms,
      medicine: medicines
        .filter((m) => m.name)  // Ensure only valid medicines are included
        .map((m) => `${m.name} x${m.quantity} (${m.price} each)`)  // Detailed medicine info
        .join(", "),
      tests_suggested: selectedTests
        .filter((t) => t.name && t.fess)  // Ensure only valid tests are included
        .map((t) => `${t.name} (${t.fess}₹)`)  // Detailed test info with fess
        .join(", "),
      total_bill: netTotal,  // Final net total after discount
    };
    
    CheckupService.CreatePrescription(payload)
      .then(() => {
        Swal.fire("Success", "Prescription submitted successfully!", "success");
        navigate("/doctor/appointments");  // Redirect on success
      })
      .catch((err) => {
        console.error("Prescription error:", err);
        Swal.fire("Error", "Failed to submit prescription.", "error");
      });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-success mb-3">Write Prescription for {patient?.name}</h3>

      {/* Symptoms Input */}
      <div className="mb-3">
        <label>Symptoms:</label>
        <textarea
          className="form-control"
          rows="2"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>
      </div>

      {/* Medicines Section */}
      {medicines.map((med, index) => (
        <div className="row mb-2" key={index}>
          <div className="col-md-4">
            <input
              type="text"
              list="pharmacy-names"
              className="form-control"
              placeholder="Medicine name"
              value={med.name}
              onChange={(e) => handleMedicineChange(index, e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={med.price}
              onChange={(e) => handlePriceChange(index, e.target.value)}
              disabled={!med.isCustom && pharmacyList.some(p => p.name === med.name)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              min="1"
              value={med.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
            />
          </div>
        </div>
      ))}

      <datalist id="pharmacy-names">
        {pharmacyList.map((m) => (
          <option key={m.id} value={m.name} />
        ))}
      </datalist>

      <button className="btn btn-secondary btn-sm mb-3" onClick={addMedicineField}>
        + Add Medicine
      </button>

      {/* Tests Section */}
      <h5 className="text-primary mt-4">Tests</h5>

      {selectedTests.map((test, index) => (
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
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Fees"
              value={test.fess}  // Using fess as is
              onChange={(e) => handleTestFeesChange(index, e.target.value)}
            />
          </div>
        </div>
      ))}

      <datalist id="test-names">
        {testList.map((t) => (
          <option key={t.test_id} value={t.test_name} />
        ))}
      </datalist>

      <button className="btn btn-secondary btn-sm mb-3" onClick={addTestField}>
        + Add Test
      </button>

      {/* Discount and Bill */}
      <div className="mb-3">
        <label>Discount (%):</label>
        <input
          type="number"
          className="form-control"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>

      <h5>Total: ₹{total.toFixed(2)} | Net Total after Discount: ₹{netTotal.toFixed(2)}</h5>

      {/* Submit Button */}
      <button className="btn btn-success mt-2" onClick={handleSubmit}>
        Submit Prescription
      </button>
    </div>
  );
};

export default WritePrescription;
