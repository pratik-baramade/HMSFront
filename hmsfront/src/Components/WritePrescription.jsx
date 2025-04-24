import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PharmacyService from "../Pages/PharmacyService";
import CheckupService from "../CheckupService";
import BillingService from "../BillingService";
import Swal from "sweetalert2";

const WritePrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;

  const [medicines, setMedicines] = useState([{ name: "", price: "", isCustom: false }]);
  const [pharmacyList, setPharmacyList] = useState([]);
  const [symptoms, setSymptoms] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    PharmacyService.getPharmacy()
      .then((res) => setPharmacyList(res.data))
      .catch((err) => console.error("Pharmacy fetch error:", err));
  }, []);

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

  const total = medicines.reduce((sum, med) => sum + (parseFloat(med.price) || 0), 0);
  const netTotal = total - (total * discount) / 100;

  const handleSubmit = () => {
    if (!patient || !patient.patientId) {
      Swal.fire("Error", "Invalid patient data.", "error");
      return;
    }

    const payload = {
      patient_id: patient.patientId,
      symptoms,
      medicines: medicines.map((m) => `${m.name}:${m.price}`).join(", "),
      totalPrice: total,
      discount,
      netTotal,
    };

    CheckupService.CreatePrescription(payload)
      .then(() => {
        Swal.fire("Success", "Prescription submitted successfully!", "success");
        navigate("/doctor/appointments");
      })
      .catch((err) => {
        console.error("Prescription error:", err);
        Swal.fire("Error", "Failed to submit prescription.", "error");
      });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-success mb-3">Write Prescription for {patient?.name}</h3>

      <div className="mb-3">
        <label>Symptoms:</label>
        <textarea
          className="form-control"
          rows="2"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>
      </div>

      {medicines.map((med, index) => (
        <div className="row mb-2" key={index}>
          <div className="col-md-5">
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

      <div className="mb-3">
        <label>Discount (%):</label>
        <input
          type="number"
          className="form-control"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>

      <h5>Total: ₹{total.toFixed(2)} | Net Total: ₹{netTotal.toFixed(2)}</h5>

      <button className="btn btn-success mt-2" onClick={handleSubmit}>
        Submit Prescription
      </button>
    </div>
  );
};

export default WritePrescription;
