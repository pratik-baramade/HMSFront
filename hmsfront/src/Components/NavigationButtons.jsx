import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between my-3 px-4">
      {/* Back Button on Left */}
      <button
        className="btn btn-outline-primary"
        onClick={() => navigate(-1)} // go back
      >
        <FaArrowLeft className="me-2" />
        Back
      </button>

      {/* Next Button on Right */}
      <button
        className="btn btn-outline-success"
        onClick={() => navigate(+1)} // go forward
      >
        Next
        <FaArrowRight className="ms-2" />
      </button>
    </div>
  );
}
