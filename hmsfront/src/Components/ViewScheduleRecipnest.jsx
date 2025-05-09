import React, { useEffect, useState } from "react";
import AppointmentService from "../AppointmentService";
import PatientsService from "../PatientsService";
import DoctorsService from "../DoctorsService";
import Swal from "sweetalert2";

export default function ViewScheduleReceptionist() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const [apptRes, patRes, docRes] = await Promise.all([
          AppointmentService.getAppointment(),
          PatientsService.getPatients(),
          DoctorsService.getDoctors(),
        ]);
        setAppointments(apptRes.data);
        setPatients(patRes.data);
        setDoctors(docRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        Swal.fire("Error", "Failed to fetch data.", "error");
      }
    };

    fetchAppointments();
  }, []);

  const getPatientName = (id) => {
    const p = patients.find((pat) => pat.patientId === id || pat.id === id);
    return p ? `${id} - ${p.name}` : `${id} - Unknown`;
  };

  const getDoctorName = (id) => {
    const d = doctors.find((doc) => doc.doctorid === id);
    return d ? d.name : "Unknown";
  };

  const groupedAppointments = appointments.reduce((groups, appt) => {
    const date = appt.appointment_date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(appt);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => new Date(b) - new Date(a));

  const totalPages = Math.ceil(sortedDates.length / recordsPerPage);
  const paginatedDates = sortedDates.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📅 All Doctors' Schedules</h3>
      {paginatedDates.map((date) => (
        <div key={date} className="mb-4">
          <h5 className="text-primary">Date: {date}</h5>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>Doctor Name</th>
                  <th>Patient ID - Name</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {groupedAppointments[date].map((appt) => (
                  <tr key={appt.appointment_id}>
                    <td>{getDoctorName(appt.doctor_id)}</td>
                    <td>{getPatientName(appt.patient_id)}</td>
                    <td>{appt.time}</td>
                    <td>{appt.status || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}