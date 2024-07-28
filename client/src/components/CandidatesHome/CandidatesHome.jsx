import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CandidateHome = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('access-token');
    const user = Cookies.get('user');

    if (!token || !user) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.isStaff) {
        navigate('/staff-home');
        return;
      }
      setUserData(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }

    setLoading(false);
  }, [navigate]);

  if (loading) return <div>Cargando...</div>;
  if (!userData) return <div>No se encontraron datos del candidato</div>;

  return (
    <div className="candidate-home">
      <h1>Bienvenido, {userData.firstName}</h1>
      <p>Email: {userData.email}</p>
      <p>Estado: {userData.status}</p>
    </div>
  );
};

export default CandidateHome;