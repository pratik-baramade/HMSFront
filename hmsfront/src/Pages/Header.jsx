import { NavLink, useNavigate } from 'react-router-dom';
import lifelineLogo from '../assets/lifeline.png';

function Header() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go to previous page
  };

  const goForward = () => {
    navigate(1); // Go to next page (if available)
  };

  return (
    <div className="row align-items-center bg-info shadow-sm px-3 py-2 position-fixed w-100">
      <div className="col-md-2 col-3 d-flex align-items-center">
        <img src={lifelineLogo} alt="Lifeline Logo" className="img-fluid" width={60} />
      </div>
      <div className="col-md-10 col-9">
        <ul className="list-inline d-flex justify-content-center m-0 flex-wrap">
          <li className="list-inline-item p-2">
            <NavLink to="/" className="text-white fw-bold text-decoration-none navlink">🏠 HOME</NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink to="/admin" className="text-white fw-bold text-decoration-none navlink">🛠️ Admin</NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink to="/doctorlogin" className="text-white fw-bold text-decoration-none navlink">🩺 Doctors</NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink to="/patientslogin" className="text-white fw-bold text-decoration-none navlink"> Patients</NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink to="/ReceptionistLogin" className="text-white fw-bold text-decoration-none navlink"> Receptionist</NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink to="/About" className="text-white fw-bold text-decoration-none navlink">ℹ️ About</NavLink>
          </li>
          <li className="list-inline-item p-2">
            <button className="btn btn-light" onClick={goBack}>◀️ Back</button>
          </li>
          <li className="list-inline-item p-2">
            <button className="btn btn-light" onClick={goForward}>▶️ Next</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
