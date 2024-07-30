import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/Authcontext';
import ClipLoader from "react-spinners/ClipLoader";

const Nav = () => {
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color={"#123abc"} loading={loading} size={50} />
      </div>
    );
  }

  const menuItems = (
    <>
      {!user ? (
        <>
          <Link to="/register" onClick={toggleMenu}>Registro</Link>
          <Link to="/login" onClick={toggleMenu}>Login</Link>
        </>
      ) : user.role === 'candidate' ? (
        <Link to="/" onClick={toggleMenu}>Home</Link>
      ) : user.role === 'staff' ? (
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
          <Link to="/login">
            <i className="fas fa-user"></i>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Nav;
