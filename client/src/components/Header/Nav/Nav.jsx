import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/Authcontext';
import Login from '../../../pages/Login/Login';

const Nav = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = (
    <>
      {!user ? (
        <>
          <Link to="/register" onClick={toggleMenu}>Registro</Link>
          <Link to="/login" onClick={toggleMenu}>Login</Link>
        </>
      ) : user.role === 'candidate' ? (
        <Link to="/" onClick={toggleMenu}>Home</Link>
      ) : user.role === 'recruiter' ? (
        <>
          <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
          <Link to="/candidatos" onClick={toggleMenu}>Candidatos</Link>
          <Link to="/insights" onClick={toggleMenu}>Estadísticas</Link>
        </>
      ) : null}
    </>
  );

  return (
    <section className="nav">
      <div className="logo">
        {/* <a href="https://empiezaporeducar.org/" target="_blank" rel="noopener noreferrer">
          <img src="../../../../public/logo_exe.png" alt="Logo Exe" />
        </a> */}
        <Link to="/"><img src="../../../../public/logo_exe.png" alt="Logo Exe" /></Link>
      </div>

      {windowWidth <= 800 && (
        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {(windowWidth > 800 || isMenuOpen) && (
        <nav className={`menu ${windowWidth <= 800 ? 'mobile-menu' : ''}`}>
          {menuItems}
        </nav>
      )}

      <div className="user-section">
        {user ? (
          <>
            <span>{user.first_name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => <Login />}>
            <i className="fas fa-user"></i>
          </button>
        )}
      </div>
    </section>
  );
};

export default Nav;
