import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Heading from "../Pages/Heading";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields.",
      });
      return;
    }

    if (username === "admin" && password === "admin123") {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${username}`,
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify({ username, role: "admin" }));
        navigate("/adminpanel"); // Redirect to AdminPanel
      }, 1500);
    } else {
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
          <h2 className="text-center mb-4 text-primary">Admin Login</h2>
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

export default AdminLogin;
