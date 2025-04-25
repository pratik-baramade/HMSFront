import React from 'react';
import heroImg from '../assets/lifeline.png';
import { FaHospitalAlt, FaUserMd, FaHeartbeat, FaStar } from "react-icons/fa";

const VideoPlayer = () => {
  return (
    <div className="container-fluid bg-light py-5 d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row align-items-center flex-column-reverse flex-lg-row">
          
          {/* Text Content */}
          <div className="col-lg-6 mt-4 mt-lg-0">
            <h1 className="display-4 fw-bold text-primary mb-3">Welcome to Lifeline Hospital</h1>
            <p className="text-secondary fs-5">
              A place where care meets technology. Access your health records, book appointments, and connect with our expert doctors.
            </p>

            <a href="/patientslogin" className="btn btn-primary btn-lg mt-3">Get Started</a>

            <div className="d-flex gap-4 mt-4 flex-wrap">
              <div>
                <h2 className="text-primary mb-0">10K+</h2>
                <p className="text-muted">Patients Treated</p>
              </div>
              <div>
                <h2 className="text-success mb-0">100+</h2>
                <p className="text-muted">Qualified Doctors</p>
              </div>
              <div>
                <h2 className="text-warning mb-0">25</h2>
                <p className="text-muted">Years of Service</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="col-lg-6 text-center">
            <img
              src={heroImg}
              alt="Hospital Illustration"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>

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
          <a href="/patientslogin" className="btn btn-info btn-lg mt-3 px-5">
            Book Appointment
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white mt-5 pt-4 pb-3">
        <div className="container">
          <div className="row">

            <div className="col-md-4 mb-3">
              <h5>Lifeline Hospital</h5>
              <p className="small">
                Lifeline is committed to delivering high-quality healthcare with compassion and modern technology.
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/user/book-appointment" className="text-white text-decoration-none">Book Appointment</a></li>
                <li><a href="/user/history" className="text-white text-decoration-none">Medical History</a></li>
                <li><a href="/About" className="text-white text-decoration-none">About Us</a></li>
                <li><a href="/patientslogin" className="text-white text-decoration-none">Login</a></li>
              </ul>
            </div>

            <div className="col-md-4 mb-3">
              <h5>Contact Us</h5>
              <p className="mb-1"><i className="bi bi-envelope me-2"></i> contact@lifeline.com</p>
              <p className="mb-1"><i className="bi bi-telephone me-2"></i> +91 9527732781</p>
              <p><i className="bi bi-geo-alt me-2"></i> Pune, Maharashtra</p>
            </div>
          </div>

          <hr className="border-light" />
          <div className="text-center small">
            &copy; {new Date().getFullYear()} Lifeline Hospital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VideoPlayer;
