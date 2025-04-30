
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import BillingService from "../BillingService";
const InvoicePage = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
   
    BillingService.getBillByBillId(billId)
      .then((res) => setBill(res.data))
      .catch((err) => console.error(err));
  }, [billId]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice for Bill ID: ${bill.bill_id}`, 10, 10);
    doc.text(`Patient Name: ${bill.patientName}`, 10, 20);
    doc.text(`Total Amount: ₹${bill.total_amount}`, 10, 30);
    doc.text(`Payment Status: ${bill.payment_Status}`, 10, 40);
    doc.text(`Payment Mode: ${bill.payment_mode}`, 10, 50);
    doc.save(`Invoice_Bill_${bill.bill_id}.pdf`);
  };

  if (!bill) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Invoice</h2>
      <p><strong>Bill ID:</strong> {bill.bill_id}</p>
      <p><strong>Patient Name:</strong> {bill.patientName}</p>
      <p><strong>Total Amount:</strong> ₹{bill.total_amount}</p>
      <p><strong>Status:</strong> {bill.payment_Status}</p>
      <p><strong>Payment Mode:</strong> {bill.payment_mode}</p>
      <button className="btn btn-outline-danger mt-3" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
};

export default InvoicePage;
