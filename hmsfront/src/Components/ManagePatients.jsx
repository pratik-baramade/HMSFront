import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientsService from "../PatientsService";
import AppointmentService from "../AppointmentService"; // Assuming this service exists
import UpdatePatient from "./UpdatePatient";
import Swal from "sweetalert2";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("user"));
    const doctorId = doctor?.doctor_id;

    if (!doctorId) {
      console.error("❌ No doctor ID found in localStorage.");
      return;
    }

    // Fetch appointments for the logged-in doctor
    AppointmentService.getAppointment()
      .then((response) => {
        const doctorAppointments = response.data.filter(
          (appt) => appt.doctor_id === doctorId
        );
        setAppointments(doctorAppointments);
        fetchAllPatients(doctorAppointments);
      })
      .catch((error) => {
        console.error("Error fetching appointments: ", error);
      });
  }, []);

  const fetchAllPatients = (doctorAppointments) => {
    // Fetch patients who have an appointment with the doctor
    PatientsService.getPatients()
      .then((res) => {
        const doctorPatients = res.data.filter((patient) =>
          doctorAppointments.some(
            (appt) => appt.patient_id === patient.patientId
          )
        );
        setPatients(doctorPatients);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setPatients([]);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        PatientsService.deletepatients(id)
          .then(() => {
            Swal.fire("Deleted!", "Patient has been deleted.", "success");
            fetchAllPatients(appointments); // Re-fetch after deletion
          })
          .catch(() => {
            Swal.fire("Failed!", "Something went wrong while deleting.", "error");
          });
      }
    });
  };

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setEditMode(true);
  };

  const handleUpdateSave = (updatedPatient) => {
    PatientsService.updatePatient(updatedPatient.patientId, updatedPatient)
      .then(() => {
        Swal.fire({
          title: "Updated!",
          text: "Patient updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchAllPatients(appointments); // Re-fetch after update
        setEditMode(false);
        setCurrentPatient(null);
      })
      .catch((err) => {
        console.error("Update error:", err);
        Swal.fire("Error!", "Failed to update patient.", "error");
      });
  };

  const handleWritePrescription = (patient) => {
    navigate("/doctor/prescriptions", { state: { patient } });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-success mb-3">Manage Patients</h3>

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search patient by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Table */}
        <div
          className="table-responsive"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <table className="table table-hover table-striped table-bordered">
            <thead className="table-info sticky-top">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td>{patient.patientId}</td>
                    <td>{patient.name}</td>
                    <td>{patient.dob}</td>
                    <td>{patient.mobailenumber}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm m-2"
                        onClick={() => handleWritePrescription(patient)}
                      >
                        Write Prescription
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(patient)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(patient.patientId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Update form */}
        {editMode && currentPatient && (
          <UpdatePatient
            patient={currentPatient}
            onUpdate={handleUpdateSave}
            onCancel={() => setEditMode(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ManagePatients;
