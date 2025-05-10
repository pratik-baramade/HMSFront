import React, { useEffect, useState } from "react";
import PatientsService from "../PatientsService";
import Swal from "sweetalert2";

const ViewCertificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    PatientsService.getCertificate()
      .then((res) => {
        setCertificates(res.data);
      })
      .catch((err) => {
        console.error("Error fetching certificates:", err);
        Swal.fire("Error", "Could not load certificates", "error");
      });
  }, []);

  const handlePrint = (certificate) => {
    const content = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="text-align:center;">🏥 Life_Line Hospital</h2>
        <h3 style="text-align:center; text-decoration: underline;">Medical Certificate</h3>
        <p>This is to certify that <strong>${certificate.patientName}</strong>, born on <strong>${certificate.dob}</strong>, Gender: <strong>${certificate.gender}</strong>, Marital Status: <strong>${certificate.maritalStatus}</strong>, Address: <strong>${certificate.address}</strong>, Email: <strong>${certificate.email}</strong>, Mobile: <strong>${certificate.mobileNumber}</strong>, has been under medical care for <strong>${certificate.reason}</strong>.</p>
        <p>They were advised rest from <strong>${certificate.startDate}</strong> to <strong>${certificate.endDate}</strong>.</p>
        ${certificate.notes ? `<p><strong>Remarks:</strong> ${certificate.notes}</p>` : ""}
        <p>Issued on: <strong>${certificate.startDate}</strong></p>
        <div style="margin-top: 40px;">
          <p>Signature: ______________________</p>
        </div>
      </div>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">All Medical Certificates</h2>
      {certificates.length === 0 ? (
        <p className="text-center">No certificates found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>DOB</th>
              <th>Gender</th>
              
              <th>From - To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td>{cert.patientName}</td>
                <td>{cert.dob}</td>
                <td>{cert.gender}</td>
                <td>{cert.startDate} to {cert.endDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handlePrint(cert)}
                  >
                    Print PDF
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

export default ViewCertificates;
