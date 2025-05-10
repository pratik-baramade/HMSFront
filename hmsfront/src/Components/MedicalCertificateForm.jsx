import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PatientsService from '../PatientsService';
import PharmacyService from '../Pages/PharmacyService';

const MedicalCertificateForm = () => {
  const [doctorInfo, setDoctorInfo] = useState({ name: '', specialization: '' });
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    patientName: '',
    dob: '', // Add dob to formData
    gender: '',
    maritalStatus: '',
    address: '',
    email: '',
    mobileNumber: '',
    wpnumber: '',
    certificateType: 'Sick Leave',
    reason: '',
    startDate: '',
    endDate: '',
    notes: '',
    doctorName: '',
    specialization: '',
    issueDate: new Date().toISOString().split('T')[0],
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const storedDoctor = JSON.parse(localStorage.getItem('doctor'));
    if (storedDoctor) {
      setDoctorInfo(storedDoctor);
      setFormData((prev) => ({
        ...prev,
        doctorName: storedDoctor.name,
        specialization: storedDoctor.specialization,
      }));
    }

    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await PatientsService.getPatients();
      setPatients(res.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      Swal.fire('Error', 'Failed to fetch patients.', 'error');
    }
  };

  const handleSelectPatient = (patient) => {
    setFormData((prev) => ({
      ...prev,
      patientName: patient.name, 
      dob: patient.dob, // Set dob directly
      gender: patient.gender, // Set gender
      maritalStatus: patient.maritalstatus, // Set marital status
      address: patient.address, // Set address
      email: patient.email, // Set email
      mobileNumber: patient.mobailenumber, // Set mobile number
      wpnumber: patient.wpnumber, // Set work phone number
    }));
    Swal.fire('Selected', `Patient "${patient.name}" selected.`, 'success');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { patientName, dob, gender, reason, startDate, endDate } = formData;
    if (!patientName || !dob || !gender || !reason || !startDate || !endDate) {
      Swal.fire('Validation Error', 'Please fill all required fields.', 'warning');
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    if (!validateForm()) return;
    Swal.fire({
      icon: 'success',
      title: 'Form is valid!',
      text: 'Preview your certificate below.',
      timer: 1500,
      showConfirmButton: false,
    });
    setShowPreview(true);
  };

 


  const handleSave = async () => {
  const certificateData = {
    patientName: formData.patientName,
    dob: formData.dob,
    gender: formData.gender,
    maritalStatus: formData.maritalStatus,
    address: formData.address,
    email: formData.email,
    mobileNumber: formData.mobileNumber,
    wpnumber: formData.wpnumber,
    certificateType: formData.certificateType,
    reason: formData.reason,
    startDate: formData.startDate,
    endDate: formData.endDate,
    notes: formData.notes,
    doctorName: formData.doctorName,
    specialization: formData.specialization,
    issueDate: formData.issueDate
  };

  try {
    const response = await PatientsService.CreateCertificate(certificateData); 
    Swal.fire('Success', 'Medical certificate saved successfully!', 'success');
  } catch (error) {
    console.error('Save error:', error);
    Swal.fire('Error', 'Something went wrong.', 'error');
  }
};

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Medical Certificate Generator</h2>

      {!showPreview && (
        <>
          <h5>Select Patient:</h5>
          <div className="mb-4">
            <label className="form-label">Select Patient</label>
            <select
              className="form-select"
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedPatient = patients.find((p) => p.patientId.toString() === selectedId);
                if (selectedPatient) handleSelectPatient(selectedPatient);
              }}
            >
              <option value="">-- Select Patient --</option>
              {patients.map((p) => (
                <option key={p.patientId} value={p.patientId}>
                  {p.name} (DOB: {p.dob}, Gender: {p.gender})
                </option>
              ))}
            </select>
          </div>

          <form>
            <div className="row mb-3">
              <div className="col-md-2">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Certificate Type</label>
                <select
                  name="certificateType"
                  className="form-select"
                  value={formData.certificateType}
                  onChange={handleChange}
                >
                  <option>Sick Leave</option>
                  <option>Fitness</option>
                  <option>Recovery</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Diagnosis / Reason</label>
                <input
                  type="text"
                  name="reason"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Additional Notes</label>
              <textarea
                name="notes"
                className="form-control"
                rows="2"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary px-5"
                onClick={handlePreview}
              >
                Preview Certificate
              </button>
            </div>
          </form>
        </>
      )}

      {showPreview && (
        <div className="card mt-4 p-4" id="certificate">
          <h4 className="text-center mb-2">🏥 Life_Line Hospital</h4>
          <h5 className="text-center text-decoration-underline mb-4">Medical Certificate</h5>
          <p>
            This is to certify that <strong>{formData.patientName}</strong>, born on <strong>{formData.dob}</strong>, Gender: <strong>{formData.gender}</strong>, Marital Status: <strong>{formData.maritalStatus}</strong>, Address: <strong>{formData.address}</strong>, Email: <strong>{formData.email}</strong>, Mobile Number: <strong>{formData.mobileNumber}</strong>, has been under my care for <strong>{formData.reason}</strong>.
          </p>
          <p>
            They were advised rest from <strong>{formData.startDate}</strong> to <strong>{formData.endDate}</strong>.
          </p>
          {formData.notes && (
            <p>
              <strong>Remarks:</strong> {formData.notes}
            </p>
          )}
          <p className="mt-3">
            Issued on: <strong>{formData.issueDate}</strong>
          </p>

          <div className="mt-4">
            <p>
              <strong>{formData.doctorName}</strong>
            </p>
            <p>{formData.specialization}</p>
            <p>Signature: ______________________</p>
          </div>

          <div className="mt-4 text-center">
            <button className="btn btn-success me-2" onClick={handleSave}>
  Save Certificate
</button>

            <button className="btn btn-secondary" onClick={() => setShowPreview(false)}>
              Back
            </button>
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
