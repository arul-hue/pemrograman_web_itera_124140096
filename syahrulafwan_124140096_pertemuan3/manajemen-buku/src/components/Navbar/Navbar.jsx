import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

function Navbar({ title }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="navbar-title">{title}</span>
        <nav>
          <Link to="/">Beranda</Link>
          <Link to="/statistik">Statistik</Link>
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
