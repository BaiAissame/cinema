import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/cinema-logo.jpg';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/" aria-current="page">
                Acceuil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movie">
                Films
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tv">
                Émissions télévisées
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/person">
                Artistes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
