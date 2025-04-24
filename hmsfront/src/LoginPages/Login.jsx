import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  return (
    <div className="container text-center mt-5">
      <h2 className="text-primary mb-4">Login as</h2>
      <div className="d-flex justify-content-center flex-wrap gap-4">
        <Link to="/doctorlogin" className="btn btn-outline-primary btn-lg">
          🩺 Doctor Login
        </Link>
        <Link to="/patientslogin" className="btn btn-outline-success btn-lg">
          👤 Patient Login
        </Link>
        <Link to="/ReceptionistLogin" className="btn btn-outline-warning btn-lg">
          💼 Receptionist Login
        </Link>
      </div>
    </div>
  );
}

export default Login;
