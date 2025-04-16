import React from "react";
import { FaHospitalAlt, FaUserMd, FaHeartbeat, FaStar } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <div className="bg-info text-white text-center py-5 shadow-lg">
        <h1 className="display-4 fw-bold">About Our Hospital</h1>
        <p className="lead">Compassionate Care. Advanced Technology. Trusted Team.</p>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://img.freepik.com/free-photo/modern-medical-facility_23-2148981265.jpg"
              alt="Hospital"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-primary mb-3">Who We Are</h2>
            <p>
              At <strong>HMS Hospital</strong>, we believe in combining modern medical technologies with heartfelt care.
              Our digital Health Management System streamlines every step of your healthcare journey — from booking
              appointments to accessing prescriptions and medical records.
            </p>
            <p>
              We are a team of passionate doctors, nurses, and staff working together to deliver the best healthcare experience possible.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-5">
          <h2 className="text-success mb-4">What Makes Us Different</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card p-4 shadow-sm h-100 text-center border-0">
                <FaHospitalAlt size={40} className="text-info mb-3" />
                <h5>Modern Facilities</h5>
                <p>Fully equipped with cutting-edge medical tools and technologies.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 shadow-sm h-100 text-center border-0">
                <FaUserMd size={40} className="text-danger mb-3" />
                <h5>Expert Doctors</h5>
                <p>Our certified professionals bring years of experience and care.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 shadow-sm h-100 text-center border-0">
                <FaHeartbeat size={40} className="text-warning mb-3" />
                <h5>Patient-Centered</h5>
                <p>Your comfort, privacy, and health are always our priority.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 shadow-sm h-100 text-center border-0">
                <FaStar size={40} className="text-success mb-3" />
                <h5>Trusted Service</h5>
                <p>Rated 5 stars by thousands of patients for excellence and reliability.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <h4 className="mb-3">We're here for you, 24/7 🕒</h4>
          <p>Visit us or book an appointment today to experience exceptional care.</p>
          <a href="/user/book-appointment" className="btn btn-info btn-lg mt-3 px-5">
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
