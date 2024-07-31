import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Welcome from '../../components/Welcome';
import Process from '../../components/Process/Process';
import Editor from '../../components/Editor/Editor';
import { useAuth } from '../../context/Authcontext'

const UserHome = () => {
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { email, token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const userEmail = email

        const response = await axios.get(`${API_URL}/candidate/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCandidateData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los datos del candidato:', err);
        if (err.message === 'No se encontró el token de acceso' || err.message === 'Token inválido') {
          setError('No se encontró la sesión. Por favor, inicie sesión nuevamente.');
          Cookies.remove('access-token');
          setTimeout(() => navigate('/login'), 3000);
        } else if (err.response && err.response.status === 401) {
          setError('Sesión expirada. Por favor, inicie sesión nuevamente.');
          Cookies.remove('access-token');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setError('Error al cargar los datos del candidato. Por favor, intente más tarde.');
        }
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!candidateData) return <div>No se encontraron datos del candidato</div>;

  return (
    <div className="user-home">
      <Welcome name={candidateData.first_name} registrationDate={candidateData.registration_date} />
      <Process status={candidateData.name_status} />
      <Editor candidateData={candidateData} />
    </div>
  );
};

export default UserHome;