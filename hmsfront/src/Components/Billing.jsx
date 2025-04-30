import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaFileInvoice, FaMoneyCheckAlt } from "react-icons/fa";
import BillingService from "../BillingService";

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedModes, setSelectedModes] = useState({});

  useEffect(() => {
    fetchBills();
  }, [refresh]);

  const fetchBills = () => {
    BillingService.getAllBillWithName()
      .then((res) => setBills(res.data))
      .catch((err) => console.error(err));
  };

  const handlePayment = (billId, mode) => {
    if (!mode) {
      alert("Please select payment mode.");
      return;
    }
  
    BillingService.updatePayment(billId, mode)
      .then(() => {
        alert("Payment updated successfully");
        setRefresh(!refresh);
      })
      .catch((err) => console.error(err));
  };
  
  const handleModeChange = (billId, mode) => {
    setSelectedModes((prevModes) => ({
      ...prevModes,
      [billId]: mode,
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">🧾 Billing Management</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Bill ID</th>
              <th>Patient Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.bill_id}>
                <td>{bill.bill_id}</td>
                <td>{bill.patientName || "Unknown"}</td>
                <td>₹{bill.total_amount}</td>
                <td>
                  {bill.payment_Status === "Paid" ? (
                    <span className="text-success fw-bold">Paid</span>
                  ) : (
                    <span className="text-danger fw-bold">Pending</span>
                  )}
                </td>
                <td>
                  {bill.payment_Status === "Paid" ? (
                    bill.payment_mode
                  ) : (
                    <select
                      className="form-select"
                      value={selectedModes[bill.bill_id] || ""}
                      onChange={(e) =>
                        handleModeChange(bill.bill_id, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                  )}
                </td>
                <td>
                  {bill.payment_Status === "Paid" ? (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        window.open(`/invoice/${bill.bill_id}`, "_blank")
                      }
                    >
                      <FaFileInvoice /> Invoice
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        handlePayment(bill.bill_id, selectedModes[bill.bill_id])
                      }
                      
                    >
                      <FaCheck className="me-1" /> Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No bills available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
