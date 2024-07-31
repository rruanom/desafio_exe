import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/Authcontext';
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';


const Nav = () => {
  const navigate = useNavigate();
  const { user, setEmail, loading, token, userType, name, setUserType, setToken, setName, setRole, setStatus } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    Cookies.remove('access_token');
    setToken(null);
    setUserType(null);
    setName(null);
    setRole(null);
    setStatus(null);
    setEmail(null);
    navigate('/login')
};

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
      {!token ? (
        <>
          <Link to="/register" onClick={toggleMenu}>Registro</Link>
          <Link to="/login" onClick={toggleMenu}>Login</Link>
        </>
      ) : userType === 'candidate' ? (
        <Link to="/" onClick={toggleMenu}>Home</Link>
      ) : userType === 'staff' ? (
        <>
          <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
          <Link to="/candidatos" onClick={toggleMenu}>Candidatos</Link>
          <Link to="/analytics" onClick={toggleMenu}>Estadísticas</Link>
        </>
      ) : null}
    </>
  );

  return (
    <section className="nav">
      <div className="logo">
      {!token ? (
        <Link to="/"><img src="/logo.png" alt="Logo Exe" /></Link>
      ) : userType === 'candidate' ? (
        <Link to="/profile"><img src="/logo.png" alt="Logo Exe" /></Link>
      ) : userType === 'staff' ? (
        <Link to="/dashboard"><img src="/logo.png" alt="Logo Exe" /></Link>
      ) : null}
        
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
        {token ? (
          <>
            <span>Hola {name}</span>
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