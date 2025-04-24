import React, { useEffect, useState } from "react";
import AppointmentService from "../AppointmentService";
import PatientsService from "../PatientsService";
import Swal from "sweetalert2";
import UpdateAppointment from "./UpdateAppointment";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // ✅ Robust check for today's date
  const isToday = (dateString) => {
    const today = new Date().toISOString().split("T")[0];
    const appointmentDate = new Date(dateString).toISOString().split("T")[0];
    return today === appointmentDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctor = JSON.parse(localStorage.getItem("user"));
        if (!doctor?.doctor_id) return;

        const [appointmentsRes, patientsRes] = await Promise.all([
          AppointmentService.getAppointment(),
          PatientsService.getPatients(),
        ]);

        // ✅ Filter today's appointments for this doctor
        const todayAppointments = appointmentsRes.data.filter(
          (appt) =>
            appt.doctor_id === doctor.doctor_id &&
            isToday(appt.appointment_date)
        );

        setAppointments(todayAppointments);
        setPatients(patientsRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
        Swal.fire("Error", "Failed to fetch appointments or patients.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Get patient name by ID
  const getPatientName = (id) => {
    const patient = patients.find(
      (p) => p.patient_id === id || p.id === id || p.patientId === id
    );
    return patient?.name || "Unknown";
  };

  // ✅ Handle appointment confirmation
  const handleConfirm = async (appointment) => {
    try {
      const updated = { ...appointment, status: "Confirmed" };
      await AppointmentService.updateAppointment(appointment.appointment_id, updated);

      Swal.fire("Confirmed", "Appointment has been confirmed", "success");
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.appointment_id === appointment.appointment_id ? updated : appt
        )
      );
    } catch (error) {
      Swal.fire("Error", "Failed to confirm the appointment", "error");
    }
  };

  // ✅ After successful update
  const handleUpdateSuccess = (updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.appointment_id === updatedAppointment.appointment_id
          ? updatedAppointment
          : appt
      )
    );
    setEditingAppointment(null);
  };

  // ✅ Render appointment table
  const renderTable = () => (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark text-center">
          <tr>
            <th>Appointment ID</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status / Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.appointment_id} className="text-center">
              <td>{appt.appointment_id}</td>
              <td>{getPatientName(appt.patient_id)}</td>
              <td>{appt.appointment_date}</td>
              <td>{appt.time}</td>
              <td>
                <span
                  className={`badge ${
                    appt.status === "Confirmed"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {appt.status || "Pending"}
                </span>
                {appt.status !== "Confirmed" && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2 m-2"
                      onClick={() => handleConfirm(appt)}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setEditingAppointment(appt)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h3>📅 Today's Appointments</h3>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <p className="text-center text-danger fs-5">
              ❌ No appointments for today.
            </p>
          ) : (
            <>
              {renderTable()}
              {editingAppointment && (
                <UpdateAppointment
                  appointment={editingAppointment}
                  onUpdate={handleUpdateSuccess}
                  onCancel={() => setEditingAppointment(null)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointments;
