import React, { useEffect, useState } from "react";
import TestService from "../Pages/TestService";

const ViewTests = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    TestService.getAllTests() // ✅ Correct function name
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tests:", err);
      });
  }, []);

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
          {tests.map((test, index) => (
            <tr key={index}>
              <td>{test.test_id}</td>
              <td>{test.test_name}</td>
              <td>{test.fess}</td>
              <td>{test.description}</td>
              <td>{test.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTests;
