import React, { useEffect, useState } from "react";
import TestService from "../Pages/TestService";

const ViewTests = () => {
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage] = useState(10); // Show 10 tests per page

  useEffect(() => {
    TestService.getAllTests() // ✅ Correct function name
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tests:", err);
      });
  }, []);

  // Calculate current tests to display based on pagination
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(tests.length / testsPerPage);

  return (
    <div className="container mt-4">
      <h3 className="text-center text-primary mb-4">All Tests</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Test Name</th>
            <th>Fees</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {currentTests.map((test, index) => (
            <tr key={index}>
              <td>{test.test_id}</td>
              <td>{test.test_name}</td>
              <td>{test.fees}</td>
              <td>{test.description}</td>
              <td>{test.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center">
        <ul className="pagination">
          {/* Previous Page Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}

          {/* Next Page Button */}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewTests;
