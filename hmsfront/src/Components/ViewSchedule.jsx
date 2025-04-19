import React, { useState, useEffect } from "react";
import AppointmentService from "../AppointmentService";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ViewSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctor appointments when the component mounts
  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("user"));
    const doctorId = doctor?.doctor_id;

    if (!doctorId) {
      console.error("❌ No doctor ID found in localStorage.");
      return;
    }

    // Fetch appointments from the AppointmentService
    AppointmentService.getAppointment()
      .then((response) => {
        const doctorAppointments = response.data.filter(
          (appt) => appt.doctor_id === doctorId
        );
        setAppointments(doctorAppointments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments: ", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">My Schedule</h2>

      {loading ? (
        <p className="text-center">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-danger">
          ❌ You don’t have any appointments scheduled.
        </p>
      ) : (
        <div className="schedule">
          <h4 className="text-center text-info mb-4">Upcoming Appointments</h4>
          <div className="row">
            {appointments.map((appointment) => (
              <div className="col-md-4 mb-4" key={appointment.appointment_id}>
                <div className="card shadow-lg rounded-lg border-primary hover-card">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      Appointment ID: <strong>{appointment.appointment_id}</strong>
                    </h5>

                    {/* Patient Info */}
                    <p className="card-text">
                      <strong><FaCalendarAlt /> Patient ID:</strong> {appointment.patient_id}
                    </p>
                    <p className="card-text">
                      <strong><FaClock /> Time:</strong> {appointment.time}
                    </p>
                    <p className="card-text">
                      <strong>Date:</strong> {appointment.appointment_date}
                    </p>

                    {/* Status: With icons */}
                    <p className="card-text">
                      <strong>Status:</strong>{" "}
                      {appointment.status === "Completed" ? (
                        <span className="text-success">
                          <FaCheckCircle /> Completed
                        </span>
                      ) : (
                        <span className="text-danger">
                          <FaTimesCircle /> Pending
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSchedule;
