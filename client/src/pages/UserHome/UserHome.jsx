import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Welcome from '../../components/Welcome';
import Process from '../../components/Process/Process';
import Editor from '../../components/Editor/Editor';

const UserHome = () => {
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const token = Cookies.get('access-token');
        console.log('Token obtenido de las cookies:', token ? 'Presente' : 'No encontrado');
        
        if (!token) {
          throw new Error('No se encontró el token de acceso');
        }

        let userEmail;
        try {
          const decodedToken = jwtDecode.jwtDecode(token);
          userEmail = decodedToken.email;
          console.log('Email decodificado del token:', userEmail);
        } catch (decodeError) {
          console.error('Error al decodificar el token:', decodeError);
          throw new Error('Token inválido');
        }

        if (!userEmail) {
          throw new Error('No se pudo obtener el email del usuario del token');
        }

        const response = await axios.get(`http://localhost:5000/api/candidate/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Datos del candidato recibidos:', response.data);
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
  }, [navigate]);

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