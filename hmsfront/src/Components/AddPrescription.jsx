import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckupService from "../CheckupService";
import BillingService from "../BillingService";
import PharmacyService from "../PharmacyService"; // Assume you have this service
import Swal from "sweetalert2";

const AddPrescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const patient = state?.patient;

  const [symptoms, setSymptoms] = useState("");
  const [testsSuggested, setTestsSuggested] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", price: "" }]);
  const [pharmacyList, setPharmacyList] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [paymentMode, setPaymentMode] = useState("Cash");

  useEffect(() => {
    PharmacyService.getAllMedicines().then((res) => setPharmacyList(res.data));
  }, []);

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;

    if (field === "name") {
      const selected = pharmacyList.find((m) => m.medicine_name === value);
      updated[index].price = selected ? selected.price : "";
    }
    setMedicines(updated);
  };

  const addMoreMedicine = () => {
    setMedicines([...medicines, { name: "", price: "" }]);
  };

  const calculateTotal = () => {
    return medicines.reduce((sum, med) => sum + parseFloat(med.price || 0), 0);
  };

  const handleSubmit = () => {
    const doctor = JSON.parse(localStorage.getItem("user"));
    const appointmentId = patient.appointment_id;

    const medicineList = medicines.map((m) => `${m.name} - ₹${m.price}`).join(", ");
    const total = calculateTotal();

    const checkupData = {
      appointment_id: appointmentId,
      symptoms,
      medicine: medicineList,
      tests_suggested: testsSuggested,
    };

    CheckupService.CreatePrescription(checkupData)
      .then(() => {
        const billData = {
          patient_id: patient.patientId,
          total_amount: total,
          payment_Status: paymentStatus,
          payment_mode: paymentMode,
        };

        BillingService.createBill(billData).then(() => {
          Swal.fire("Success", "Prescription added & bill generated", "success");
          navigate("/doctor/billview", { state: { patientId: patient.patientId } });
        });
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Add Prescription</h3>

      <div className="mb-3">
        <label>Symptoms:</label>
        <textarea className="form-control" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Tests Suggested:</label>
        <input className="form-control" value={testsSuggested} onChange={(e) => setTestsSuggested(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Medicines:</label>
        {medicines.map((med, idx) => (
          <div key={idx} className="d-flex gap-2 mb-2">
            <input
              className="form-control"
              placeholder="Medicine Name"
              list="pharmacyList"
              value={med.name}
              onChange={(e) => handleMedicineChange(idx, "name", e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Price"
              value={med.price}
              onChange={(e) => handleMedicineChange(idx, "price", e.target.value)}
            />
          </div>
        ))}
        <datalist id="pharmacyList">
          {pharmacyList.map((med) => (
            <option key={med.id} value={med.medicine_name} />
          ))}
        </datalist>
        <button className="btn btn-sm btn-info mt-2" onClick={addMoreMedicine}>
          + Add More
        </button>
      </div>

      <div className="mb-3">
        <label>Payment Mode:</label>
        <select className="form-select" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
          <option>Cash</option>
          <option>Card</option>
          <option>UPI</option>
        </select>
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        Submit Prescription & Generate Bill
      </button>
    </div>
  );
};

export default AddPrescription;