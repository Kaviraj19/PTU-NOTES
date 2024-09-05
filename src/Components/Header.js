import React from 'react';
import "./Header.css"

function Header() {
  return (
    <nav className="navbar sticky-top ">
    <div className="container-fluid">
      <a className="navbar-brand" href="/Login">PTU NOTES</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Notes">Notes</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Header;