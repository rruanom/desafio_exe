import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/Authcontext';
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPeace, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';
import useSound from 'use-sound';

const Nav = () => {
  const navigate = useNavigate();
  const { user, setEmail, loading, token, userType, name, setUserType, setToken, setName, setRole, setStatus } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playTrumpet] = useSound('./public/looney.mp3');

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
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleGreetingClick = () => {
    playTrumpet();
    setShowConfetti(true);
    setTimeout(() => {setShowConfetti(false), 18000}); 
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

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
      {token && windowWidth <= 800 && (
        <button onClick={() => { logout(); toggleMenu(); }}>Logout</button>
      )}
    </>
  );

  return (
    <section className="nav">
      {showConfetti && <Confetti width={windowWidth} height={window.innerHeight} />}
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
        <button onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
        {token ? (
          windowWidth > 800 ? (
            <>
              <span onClick={handleGreetingClick} style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faHandPeace} /> Hola {name}
              </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <span onClick={handleGreetingClick} style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faHandPeace} /> Hola {name}
              </span>
            </>
          )
        ) : null}
      </div>
    </section>
  );
};

export default Nav;
