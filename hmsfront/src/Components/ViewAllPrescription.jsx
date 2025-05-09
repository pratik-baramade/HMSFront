import React, { useEffect, useState } from 'react';
import CheckupService from '../CheckupService';

function ViewAllPrescription() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [prescriptionsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            const response = await CheckupService.ShowAllPerscription();
            setPrescriptions(response.data);
        } catch (error) {
            console.error("Error fetching prescriptions:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPrescriptions = prescriptions.filter(pres => 
        pres.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pres.symptoms?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pres.medicine?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPrescription = currentPage * prescriptionsPerPage;
    const indexOfFirstPrescription = indexOfLastPrescription - prescriptionsPerPage;
    const currentPrescriptions = filteredPrescriptions.slice(indexOfFirstPrescription, indexOfLastPrescription);

    const totalPages = Math.ceil(filteredPrescriptions.length / prescriptionsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Prescriptions</h2>
            <input 
                type="text" 
                className="form-control mb-3" 
                placeholder="Search by patient name, symptoms, or medicine" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Patient Name</th>
                                <th>Symptoms</th>
                                <th>Medicine</th>
                                <th>Tests Suggested</th>
                                <th>Total Bill</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPrescriptions.length > 0 ? (
                                currentPrescriptions.map((pres, index) => (
                                    <tr key={index}>
                                        <td>{pres.checkupid}</td>
                                        <td>{pres.patientName}</td>
                                        <td>{pres.symptoms}</td>
                                        <td>{pres.medicine}</td>
                                        <td>{pres.tests_suggested}</td>
                                        <td>{pres.total_bill}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No prescriptions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <nav className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-primary" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="btn btn-primary" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                    </nav>
                </>
            )}
        </div>
    );
}

export default ViewAllPrescription;
