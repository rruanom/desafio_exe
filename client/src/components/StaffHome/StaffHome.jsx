import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const StaffHome = () => {
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
      if (!parsedUser.isStaff) {
        navigate('/candidate-home');
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
  if (!userData) return <div>No se encontraron datos del miembro del staff</div>;

  return (
    <div className="staff-home">
      <h1>Bienvenido, {userData.firstName}</h1>
      <p>Email: {userData.email}</p>
      <p>Rol: {userData.role}</p>
    </div>
  );
};

export default StaffHome;