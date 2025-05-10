import React, { useState, useEffect } from "react";
import AppointmentService from "../AppointmentService";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const getISODate = (date) => new Date(date).toISOString().split("T")[0];

const ViewSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
  const doctor = JSON.parse(localStorage.getItem("user"));
  const doctorId = doctor?.doctor_id;

  if (!doctorId) {
    console.error("❌ No doctor ID found in localStorage.");
    return;
  }

  AppointmentService.getAppointment()
    .then((response) => {
      const doctorAppointments = response.data
        .filter((appt) => appt.doctor_id === doctorId)
        .sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date)); // 🔁 sort recent first

      setAppointments(doctorAppointments);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching appointments: ", error);
      setLoading(false);
    });
}, []);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient ID</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appointment) => (
                  <tr key={appointment.appointment_id}>
                    <td>{appointment.appointment_id}</td>
                    <td>{appointment.patient_id}</td>
                    <td><FaClock /> {appointment.time}</td>
                    <td><FaCalendarAlt /> {getISODate(appointment.appointment_date)}</td>
                    <td>
                      {appointment.status === "Completed" ? (
                        <span className="text-success">
                          <FaCheckCircle /> Completed
                        </span>
                      ) : (
                        <span className="text-danger">
                          <FaTimesCircle /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button onClick={() => handlePageChange(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default ViewSchedule;
