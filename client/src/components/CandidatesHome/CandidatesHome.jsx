import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext'

const CandidateHome = () => {
  const { name } = useAuth()
  const { status } = useAuth()
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (loading) return <div>Cargando...</div>;
  if (!userData) return <div>No se encontraron datos del candidato</div>;

  return (
    <div className="candidate-home">
      <h1>Bienvenido, {name}</h1>
      <p>Email: {userData.email}</p>
      <p>Estado: {status}</p>
    </div>
  );
};

export default CandidateHome;