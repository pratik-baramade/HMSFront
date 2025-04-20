import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import BillingService from "../BillingService";
import Swal from "sweetalert2";

const ViewBill = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const user = JSON.parse(storedUser);
  
        if (user && user.patient_id) {
          const response = await BillingService.getAllBillByID(user.patient_id);
          setBills(response.data);
        }
      } catch (err) {
        console.error("Axios error:", err);
        
        if (err.response && err.response.status === 500) {
          setError("Something went wrong on the server. Please try again later.");
        } else {
          setError("Error fetching bills. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchBills();
  }, []);

  // Show a loading message while fetching bills
  if (loading) {
    return <p>Loading bills...</p>;
  }

  // Show error message if there is any
  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">View Bills</h2>

      {/* Back Button */}
      <button 
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/patientdashboard")} // Navigates to PatientDashboard
      >
        Back to Dashboard
      </button>

      {/* Show alert for no bills found */}
      {bills.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No bills found for this patient.
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Bill ID</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={bill.bill_id}>
                <td>{index + 1}</td>
                <td>{bill.bill_id}</td>
                <td>{bill.total_amount}</td>
                <td>{bill.payment_Status}</td>
                <td>{bill.payment_mode}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => viewBillDetails(bill.bill_id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Function to view bill details (can be a modal or navigate to a detailed page)
const viewBillDetails = (billId) => {
  Swal.fire({
    title: "Bill Details",
    text: `You selected Bill ID: ${billId}. Implement details here.`,
    icon: "info",
    confirmButtonText: "OK",
  });
};

export default ViewBill;
