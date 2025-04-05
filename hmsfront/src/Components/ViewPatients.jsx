import React, { useEffect, useState } from "react";
import PatientsService from "../PatientsService";

let ViewPatients = () => {
    let [patients, setPatients] = useState([]);

    useEffect(() => {
        PatientsService.getPatients()
            .then((res) => {
                setPatients(res.data);
            })
            .catch((err) => {
                console.error("Error:", err);
                setPatients([]);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Patients List</h2>
            <table className="table table-bordered table-hover shadow">
                <thead className="table-success">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Marital Status</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>WP Number</th>
                        <th>Address</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((e, index) => (
                        <tr key={index}>
                            <td>{e.patientId}</td>
                            <td>{e.name}</td>
                            <td>{e.dob}</td>
                            <td>{e.gender}</td>
                            <td>{e.maritalstatus}</td>
                            <td>{e.email}</td>
                            <td>{e.mobilenumber}</td>
                            <td>{e.wpnumber}</td>
                            <td>{e.address}</td>
                            <td><button className="btn btn-danger btn-sm">Delete</button></td>
                            <td><button className="btn btn-primary btn-sm">Update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewPatients;