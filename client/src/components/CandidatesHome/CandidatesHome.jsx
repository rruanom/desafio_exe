import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/Authcontext'

const CandidateHome = () => {
  const { name, status, email } = useAuth()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="candidate-home">
      <h1>Bienvenido, {name}</h1>
      <p>Email: {email}</p>
      <p>Estado: {status}</p>
    </div>
  );
};

export default CandidateHome;