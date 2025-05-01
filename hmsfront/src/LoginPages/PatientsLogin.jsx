import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Heading from "../Pages/Heading";

const PatientsLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Default role set to 'patient'
  const role = "patient"; // Directly setting the role to 'patient'

  // Function to validate the username and password
  const validate = () => {
    // Validate username: should not contain digits
    if (/\d/.test(username)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Username",
        text: "Username should not contain numbers.",
      });
      return false;  // Return false to prevent further execution
    }

    // Validate password: should only contain digits and must be 10 digits long (e.g., phone number)
    if (/\D/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain only numbers.",
      });
      return false;  // Return false to prevent further execution
    }
    if (password.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be exactly 10 digits.",
      });
      return false;
    }

    return true;  // Everything is valid
  };

  const handleLogin = async () => {
    // Check if any field is empty
    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields.",
      });
      return;
    }

    // Validate the username and password
    if (!validate()) return;  // If validation fails, stop the login process

    try {
      const res = await axios.post("http://localhost:8080/hms/login", {
        username,
        password,
        role,
      });
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${user.name || username}`,
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        // Redirect to the patient dashboard
        navigate("/patient/dashboard");
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password.",
      });
    }
  };

  return (
    <>
      <div>
        <Heading />
      </div>
      <div className="login-container" style={{ marginTop: "80px" }}>
        <div className="login-card shadow p-4 position-fixed">
          <h2 className="text-center mb-4 text-primary">Patients Login</h2>

          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />

          <button onClick={handleLogin} className="btn btn-primary w-100 mb-3">
            🔐 Login
          </button>

          {/* 👇 Register Link */}
          <div className="text-center">
            <span className="text-muted">New to Lifeline? </span>
            <Link to="/register-patient" className="text-primary fw-semibold">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientsLogin;
