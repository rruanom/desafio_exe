import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/Authcontext';
import Login from '../../../pages/Login/Login';

const Nav = () => {
  const { user, logout } = useAuth();

  return (
    <section className="nav">
      <div className="logo">
        <img src="../../../assets/logo.jpeg" alt="Logo Exe" />
      </div>

      <nav className="menu">
        {!user ? (
          <>
            <Link to="/register">Registro</Link>
            <Link to="/login">Login</Link>
          </>
        ) : user.role === 'candidate' ? (
          <Link to="/">Home</Link>
        ) : user.role === 'recruiter' ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/candidatos">Candidatos</Link>
            <Link to="/insights">Estadísticas</Link>
          </>
        ) : null}
      </nav>

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
  );;
};

export default Nav;
