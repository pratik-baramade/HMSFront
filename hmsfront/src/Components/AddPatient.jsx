import React, { useState } from "react";
import ReactDom from "react-dom"
import PatientsService from "../PatientsService";
let AddPatient = () => {
    let [PData, SetPatients] = useState({
        name: "",
        dob: "",
        gender: "",
        maritalstatus: "",
        email: "",
        mobailenumber: "",
        wpnumber: "",
        address: ""
    });

    let [sms, setsms] = useState(" "); 

    let Universalhand = (e) => {
        SetPatients(previesdata => {
            return { ...previesdata, [e.target.name]: e.target.value };
        });
    };

    let ShowPaitients = (e) => {
        e.preventDefault();
        let jsonobj = JSON.stringify(PData);
        // alert(PData.name + "\t" + PData.dob + "\t" + PData.gender + "\t" + PData.maritalstatus + "\t" + PData.mobailenumber + "\t" + PData.wpnumber + "\t" + PData.address);

        let promise = PatientsService.CreatePatients(PData);
        promise.then((res) => {
            setsms(res.data);
        }).catch((res) => {
            setsms([]);
        });
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow p-4">
                    <h2 className="text-center mb-4">Add New Patients</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={PData.name} onChange={Universalhand} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">DOB</label>
                            <input type="text" className="form-control" id="date" name="dob" value={PData.dob} onChange={Universalhand} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <input type="text" className="form-control"id="gender" name="gender" value={PData.gender} onChange={Universalhand} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="m" className="form-label">Marital Status</label>
                            <input type="text" className="form-control" id="m" name="maritalstatus" value={PData.maritalstatus} onChange={Universalhand} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={PData.email} onChange={Universalhand} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobailenumber" className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" id="mobailenumber" name="mobailenumber" value={PData.mobailenumber} onChange={Universalhand} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="wpnumber" className="form-label">Whatsapp Number</label>
                            <input type="text" className="form-control" id="wpnumber" name="wpnumber" value={PData.wpnumber} onChange={Universalhand} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address" value={PData.address} onChange={Universalhand} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" value="Add New Patient" className="form-control btn btn-success" onClick={ShowPaitients} />
                        </div>
                        <p>{sms}</p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddPatient;