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
        console.log(token)
        if (!token) {
          throw new Error('No se encontró el token de acceso');
        }

        const decodedToken = jwtDecode.jwtDecode(token);
        const userEmail = decodedToken.email;
        console.log(userEmail)

        const response = await axios.get(`https://desafio-exe.onrender.com/api/candidate/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCandidateData(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los datos del candidato:', err);
        if (err.response && err.response.status === 401) {
          Cookies.remove('access-token');
          navigate('/login');
        } else {
          setError('Error al cargar los datos del candidato');
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