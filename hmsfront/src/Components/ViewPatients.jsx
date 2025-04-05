import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PatientsService from "../PatientsService";

let ViewPatients = () => {
    let [Patient, SetPatients] = useState([]);

    useEffect(() => {
        let promise = PatientsService.getPatients();
        promise.then((res) => {
            SetPatients(res.data);
        });
        promise.catch((res) => {
            SetPatients([]);
        });
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow-lg p-4">
                    <h3 className="text-center text-primary mb-4">Patients Record</h3>
                    <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <table className="table table-hover table-striped table-bordered">
                            <thead className="table-success sticky-top">
                                <tr>
                                    <th>Patients id</th>
                                    <th>Patients Name</th>
                                    <th>Patients Dob</th>
                                    <th>Patients Gender</th>
                                    <th>Patients maritalstatu</th>
                                    <th>Patients Address</th>
                                    <th>Patients Email</th>
                                    <th>Patients Wpnumber</th>
                                    <th>Patients MobilNumber</th>
                                    <th>Delete</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Patient.map((e, index) => (
                                        <tr key={index}>
                                            <td>{e.patientId}</td>
                                            <td>{e.name}</td>
                                            <td>{e.dob}</td>
                                            <td>{e.gender}</td>
                                            <td>{e.maritalstatus}</td>
                                            <td>{e.address}</td>
                                            <td>{e.email}</td>
                                            <td>{e.wpnumber}</td>
                                            <td>{e.mobailenumber}</td>
                                            <td><a href="*" className="btn btn-danger btn-sm">Delete</a></td>
                                            <td><a href="*" className="btn btn-warning btn-sm">Update</a></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewPatients;
