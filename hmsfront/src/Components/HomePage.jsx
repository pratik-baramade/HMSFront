import React from "react";
export default function HomePage(){
    return(<>

<div className="container">
      <div className="Home d-flex justify-content-between align-items-center p-3 border-bottom">
        <div className="icon">
          {/* Add your icon here */}
        </div>
        <div className="menu">
          <ul className="nav">
            <li className="nav-item">
              <a className="#" href="#">Admin</a>
            </li>
            <li className="nav-item">
              <a className="#" href="#">Doctor</a>
            </li>
            <li className="nav-item">
              <a className="#" href="#">User</a>
            </li>
            <li className="nav-item">
              <a className="#" href="#">About</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>)
}