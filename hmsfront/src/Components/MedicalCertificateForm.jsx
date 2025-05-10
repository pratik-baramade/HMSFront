import React, { useState } from 'react';
import Swal from 'sweetalert2';

const MedicalCertificateForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    certificateType: 'Sick Leave',
    reason: '',
    startDate: '',
    endDate: '',
    notes: '',
    doctorName: 'Dr. Rahul Gote',
    specialization: 'General Physician',
    issueDate: new Date().toISOString().split('T')[0],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { patientName, age, gender, reason, startDate, endDate } = formData;
    if (!patientName || !age || !gender || !reason || !startDate || !endDate) {
      Swal.fire('Validation Error', 'Please fill all required fields.', 'warning');
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    if (!validateForm()) return;
    Swal.fire({
      icon: 'success',
      title: 'Form is ready!',
      text: 'Preview your certificate below.',
      timer: 1500,
      showConfirmButton: false,
    });
    setShowPreview(true);
  };

  const handlePrint = () => {
    Swal.fire({
      title: 'Print Certificate?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Print it!',
    }).then((result) => {
      if (result.isConfirmed) {
        window.print();
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Medical Certificate Generator</h2>

      {!showPreview && (
        <form>
          <div className="mb-3">
            <label className="form-label">Patient Name</label>
            <input type="text" name="patientName" className="form-control" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="number" name="age" className="form-control" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select name="gender" className="form-select" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Certificate Type</label>
            <select name="certificateType" className="form-select" onChange={handleChange}>
              <option>Sick Leave</option>
              <option>Fitness</option>
              <option>Recovery</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Diagnosis / Reason</label>
            <input type="text" name="reason" className="form-control" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input type="date" name="startDate" className="form-control" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input type="date" name="endDate" className="form-control" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Additional Notes</label>
            <textarea name="notes" className="form-control" onChange={handleChange}></textarea>
          </div>

          <button type="button" className="btn btn-primary" onClick={handlePreview}>Preview Certificate</button>
        </form>
      )}

      {showPreview && (
        <div className="card mt-4 p-4" id="certificate">
          <h4 className="text-center mb-2">🏥 ABC Hospital</h4>
          <h5 className="text-center text-decoration-underline mb-4">Medical Certificate</h5>
          <p>This is to certify that <strong>{formData.patientName}</strong>, aged <strong>{formData.age}</strong>, Gender: <strong>{formData.gender}</strong>, has been under my care for <strong>{formData.reason}</strong>.</p>
          <p>They were advised rest from <strong>{formData.startDate}</strong> to <strong>{formData.endDate}</strong>.</p>
          {formData.notes && <p><strong>Remarks:</strong> {formData.notes}</p>}
          <p className="mt-3">Issued on: <strong>{formData.issueDate}</strong></p>

          <div className="mt-4">
            <p><strong>{formData.doctorName}</strong></p>
            <p>{formData.specialization}</p>
            <p>Signature: ______________________</p>
          </div>

          <div className="mt-4">
            <button className="btn btn-success me-2" onClick={handlePrint}>Print</button>
            <button className="btn btn-secondary" onClick={() => setShowPreview(false)}>Back to Edit</button>
          </div>
        </div>
      )}

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate, #certificate * {
            visibility: visible;
          }
          #certificate {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default MedicalCertificateForm;
