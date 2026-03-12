import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">🌐</span>
        <span className="logo-text">SocialEvents</span>
      </Link>
      <Link to="/create" className="btn btn-sm">
        <span>+</span> Crea Evento
      </Link>
    </header>
  );
}

export default Navbar;
