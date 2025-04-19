import React, { useEffect, useState } from "react";
import AppointmentService from "../AppointmentService";
import PatientsService from "../PatientsService";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("user"));
    const doctorId = doctor?.doctor_id;

    if (!doctorId) {
      console.error("❌ No doctor ID found in localStorage.");
      return;
    }

    AppointmentService.getAppointment()
      .then((response) => {
        const allAppointments = response.data;
        const doctorAppointments = allAppointments.filter(
          (appt) => appt.doctor_id === doctorId
        );
        setAppointments(doctorAppointments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments: ", error);
      });

    PatientsService.getPatients()
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients: ", error);
      });
  }, []);

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (p) =>
        p.patient_id === patientId ||
        p.id === patientId ||
        p.patientId === patientId
    );
    return patient?.name || "Unknown";
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h3>📅 My Appointments</h3>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <p className="text-center text-danger fs-5">
              ❌ You don’t have any appointments yet.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr className="text-center">
                    <th>Appointment ID</th>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Doctor ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => {
                    const patient = patients.find(
                      (x) =>
                        x.patient_id === appointment.patient_id ||
                        x.id === appointment.patient_id ||
                        x.patientId === appointment.patient_id
                    );

                    return (
                      <tr key={appointment.appointment_id} className="text-center">
                        <td>{appointment.appointment_id}</td>
                        <td>{appointment.patient_id}</td>
                        <td>{patient?.name || "Unknown"}</td>
                        <td>{appointment.doctor_id}</td>
                        <td>{appointment.appointment_date}</td>
                        <td>{appointment.time}</td>
                        <td>
                          <span
                            className={`badge ${
                              appointment.status?.toLowerCase() === "confirmed"
                                ? "bg-success"
                                : appointment.status?.toLowerCase() === "pending"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointments;
