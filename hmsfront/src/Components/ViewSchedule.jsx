import React, { useState, useEffect } from "react";
import AppointmentService from "../AppointmentService";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Helper to get ISO date format (yyyy-mm-dd)
const getISODate = (date) => new Date(date).toISOString().split("T")[0];

const ViewSchedule = () => {
  const [appointments, setAppointments] = useState([]);
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

  // ✅ Group appointments by date
  const groupByDate = (data) => {
    const grouped = {};
    data.forEach((appt) => {
      const dateKey = getISODate(appt.appointment_date);
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(appt);
    });
    return grouped;
  };

  const groupedAppointments = groupByDate(appointments);
  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => new Date(b) - new Date(a)); // latest first

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
        sortedDates.map((date) => (
          <div key={date} className="mb-5">
            <h4 className="text-center text-info mb-3">
              📅 {date === getISODate(new Date()) ? "Today" : date}
            </h4>
            <div className="row">
              {groupedAppointments[date].map((appointment) => (
                <div className="col-md-4 mb-4" key={appointment.appointment_id}>
                  <div className=" shadow-sm border-primary">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Appointment ID: <strong>{appointment.appointment_id}</strong>
                      </h5>
                      <p className="card-text">
                        <strong><FaCalendarAlt /> Patient ID:</strong> {appointment.patient_id}
                      </p>
                      <p className="card-text">
                        <strong><FaClock /> Time:</strong> {appointment.time}
                      </p>
                      <p className="card-text">
                        <strong>Date:</strong> {getISODate(appointment.appointment_date)}
                      </p>
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
        ))
      )}
    </div>
  );
};

export default ViewSchedule;
