import React, { useEffect, useState } from "react";
import BillingService from "../BillingService";
import axios from "axios"; // For calling API

const Patientbill = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState({}); // Ensure patients is initialized as an empty object

     
  useEffect(() => {

    BillingService.getAllbills()
      .then((res) => {
        console.log("📦 All Bill data:", res.data); // Check if data is being fetched properly
        setBills(res.data);
      })
      .catch((err) => {
        console.error("❌ Failed to load bills", err);
      });

    // Fetch patients details to use for names
    axios.get("http://localhost:8080/hms/getAllPatients") // Endpoint to get all patient details
      .then((res) => {
        console.log("🧑‍⚕️ Patient data:", res.data); // Log patient data to debug

        const patientsData = res.data.reduce((acc, patient) => {
          acc[patient.patient_id] = patient.name; 
          return acc;
        }, {});


        console.log("🧑‍⚕️ Mapped Patients Data:", patientsData); // Verify patient data structure
        setPatients(patientsData);
      })
      .catch((err) => {
        console.error("❌ Failed to load patients", err);
      });
  }, []);

  if (!bills.length) {
    return <p className="text-center text-danger">No bills found.</p>; // Early return if no bills
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-primary">All Bills</h3>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Bill ID</th>
            <th>Patient ID</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.bill_id}>
              <td>{bill.bill_id}</td>
              <td>{bill.patients_id}</td>
              <td>{bill.total_amount}</td>
              <td>{bill.payment_Status}</td>
              <td>{bill.payment_mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patientbill;
