import React, { useEffect, useState } from "react";
import AppointmentService from "../AppointmentService";
import PatientsService from "../PatientsService";
import DoctorsService from "../DoctorsService";
import Swal from "sweetalert2";

export default function ViewAppointmentsReceptionist () {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDate, setSearchDate] = useState("");
  const [searchPatient, setSearchPatient] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const recordsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
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
        Swal.fire("Error", "Could not fetch appointments or patients.", "error");
      }
    };
    fetchData();
  }, []);

  const getPatientName = (id) => {
    const p = patients.find((pat) => pat.patientId === id || pat.id === id);
    return p?.name || "Unknown";
  };

  const getDoctorName = (id) => {
    const d = doctors.find((doc) => doc.doctorid === id);
    return d?.name || "Unknown";
  };

  const filteredAppointments = appointments.filter((appt) => {
    const patientName = getPatientName(appt.patient_id).toLowerCase();
    const doctorName = getDoctorName(appt.doctor_id).toLowerCase();
    return (
      (!searchDate || appt.appointment_date === searchDate) &&
      (!searchPatient || patientName.includes(searchPatient.toLowerCase())) &&
      (!searchDoctor || doctorName.includes(searchDoctor.toLowerCase()))
    );
  });

  const groupedAppointments = filteredAppointments.reduce((groups, appt) => {
    const date = appt.appointment_date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(appt);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => new Date(b) - new Date(a));

  const handleEdit = (appt) => {
    setEditForm({ ...appt });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await AppointmentService.updateAppointment(editForm.appointment_id, editForm);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.appointment_id === editForm.appointment_id ? editForm : appt
        )
      );
      setEditForm(null);
      Swal.fire("Updated", "Appointment updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update appointment", "error");
    }
  };

  const totalPages = Math.ceil(sortedDates.length / recordsPerPage);
  const paginatedDates = sortedDates.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📅 All Appointments </h3>

      {editForm && (
        <div className="card p-3 mb-3 shadow">
          <h5>Edit Appointment</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="appointment_date"
                value={editForm.appointment_date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={editForm.time}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-success w-100" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              placeholder="Search by Date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Patient"
              value={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Doctor"
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />
          </div>
        </div>
      </div>

      {paginatedDates.map((date) => (
        <div key={date} className="mb-4">
          <h5 className="text-primary">Date: {date}</h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedAppointments[date].map((appt) => (
                  <tr key={appt.appointment_id}>
                    <td>{appt.appointment_id}</td>
                    <td>{getPatientName(appt.patient_id)}</td>
                    <td>{getDoctorName(appt.doctor_id)}</td>
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
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(appt)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination pagination-lg">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  &laquo; Prev
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  <button className="page-link">{i + 1}</button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};


