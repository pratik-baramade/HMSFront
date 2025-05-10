import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import BillingService from "../BillingService";
import "bootstrap/dist/css/bootstrap.min.css";

const InvoicePage = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    BillingService.getBillByBillId(billId)
      .then((res) => setBill(res.data))
      .catch((err) => console.error(err));
  }, [billId]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("LifeLine Hospital", 105, 20, null, null, "center");

    doc.setFontSize(14);
    doc.text("INVOICE", 105, 30, null, null, "center");
    doc.line(10, 35, 200, 35);

    doc.setFontSize(12);
    let y = 45;

    doc.text(`Bill ID: ${bill.bill_id}`, 20, y);
    y += 10;
    doc.text(`Patient Name: ${bill.patientName}`, 20, y);
    y += 10;
    doc.text(`Total Amount: ₹${bill.total_amount}`, 20, y);
    y += 10;
    doc.text(`Payment Status: ${bill.payment_Status}`, 20, y);
    y += 10;
    doc.text(`Payment Mode: ${bill.payment_mode}`, 20, y);

    doc.line(10, y + 10, 200, y + 10);
    doc.setFontSize(10);
    doc.text("Thank you for choosing Life Hospital.", 105, y + 20, null, null, "center");
    doc.save(`Invoice_Bill_${bill.bill_id}.pdf`);
  };

  if (!bill) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-outline-primary" onClick={() => navigate('/receptionist/dashboard')}>
          ← Back to Home
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Invoice</h4>
            </div>
            <div className="card-body">
              <p><strong>Bill ID:</strong> {bill.bill_id}</p>
              <p><strong>Patient Name:</strong> {bill.patientName}</p>
              <p><strong>Total Amount:</strong> ₹{bill.total_amount}</p>
              <p><strong>Status:</strong> {bill.payment_Status}</p>
              <p><strong>Payment Mode:</strong> {bill.payment_mode}</p>
              <div className="text-end">
                <button className="btn btn-outline-danger" onClick={generatePDF}>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
