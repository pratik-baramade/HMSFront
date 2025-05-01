import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckupService from "../CheckupService";
import BillingService from "../BillingService";

const ShowPrescription = () => {
  const [checkups, setCheckups] = useState([]);
  const [confirmedCheckups, setConfirmedCheckups] = useState({});

  useEffect(() => {
    fetchCheckups();
  }, []);

  const fetchCheckups = async () => {
    try {
      const response = await CheckupService.ShowAllPerscription();
      const sortedData = response.data.sort((a, b) => b.checkupid - a.checkupid);
      console.log(sortedData);
      
      setCheckups(sortedData);
    } catch (error) {
      console.error("Error fetching checkups:", error);
    }
  };

  const handleConfirm = async (patientId, totalBill) => {
    try {
      if (patientId === 0 || !patientId) {
        throw new Error("Invalid Patient ID");
      }
      const billData = {
        patients_id: patientId,
        total_amount: totalBill,
        payment_Status: "Pending",
        payment_mode: "Cash",
      };
  
      await BillingService.CreateBill(billData);
  
      // Disable the Confirm button for this patient
      setConfirmedCheckups((prev) => ({ ...prev, [patientId]: true }));
  
      Swal.fire("Success", "Billing saved!", "success");
    } catch (error) {
      console.error("Error saving billing:", error);
      Swal.fire("Error", error.message || "Billing failed", "error");
    }
  };
  
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Prescription List</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Checkup ID</th>
            <th>Appointment ID</th>
           
            <th>Patient Name</th> {/* Added Patient Name column */}
            <th>Symptoms</th>
            <th>Medicine</th>
            <th>Tests</th>
            <th>Total Bill</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {checkups.map((item) => (
            <tr key={item.checkupid}>
              <td>{item.checkupid}</td>
              <td>{item.appointment_id}</td>
             
              <td>{item.patientName}</td> {/* Displaying Patient Name */}
              <td>{item.symptoms}</td>
              <td>{item.medicine}</td>
              <td>{item.tests_suggested}</td>
              <td>₹{item.total_bill}</td>
              <td>
              <button
  className="btn btn-success"
  onClick={() => handleConfirm(item.patient_id, item.total_bill)}
  disabled={confirmedCheckups[item.patient_id]}
>
  {confirmedCheckups[item.patient_id] ? "Confirmed" : "Confirm"}
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPrescription;
