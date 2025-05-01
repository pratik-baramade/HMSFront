import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Heading from "../Pages/Heading";

const DoctorLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields.",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/hms/login", {
        username,
        password,
        role: "doctor", // Hardcoded role for doctor
      });
      console.log(res.data);
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
        navigate("/doctor/dashboard"); // Redirect to doctor dashboard
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
        <div className="login-card shadow">
          <h2 className="text-center mb-4 text-primary">Doctor Login</h2>
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
          <button onClick={handleLogin} className="btn btn-primary w-100">
            🔐 Login
          </button>
        </div>
      </div>
    </>
  );
};

export default DoctorLogin;
