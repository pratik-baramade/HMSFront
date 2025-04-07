import React, { useEffect, useState } from "react";
import PatientsService from "../PatientsService";
let ViewPatients=()=>{
    let [Patient,SetPatients]=useState([]);
    useEffect(()=>{
        let promise=PatientsService.getPatients();
        promise.then((res)=>{
            SetPatients(res.data);
        })
        promise.catch((res)=>{
            SetPatients([]);
        })
    })
    return(<>
    <div className="container mt-5">
    <table className="table table-striped">
    <thead>
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
        {
           Patient.map((e)=>(
            <tr>
                <td>{e.patientId}</td>
                <td>{e.name}</td>
                <td>{e.dob}</td>
                <td>{e.gender}</td>
                <td>{e.maritalstatus}</td>
                <td>{e.email}</td>
                <td>{e.mobailenumber}</td>
                <td>{e.wpnumber}</td>
                <td>{e.address}</td>
                <td><a href="*">Delete</a></td>
                <td><a href="*">Update</a></td>
            </tr>

           )) 
        }
        </table>  
    </div>
    </>)
}
export default ViewPatients;
