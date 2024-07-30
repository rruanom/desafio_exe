import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const Profile = ({ candidate: initialCandidate }) => {
  const [candidate, setCandidate] = useState(initialCandidate || {});
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const genderTranslations = {
    'Female': 'Femenino',
    'Male': 'Masculino',
    'Genderfluid': 'Género fluido',
    'Genderqueer': 'Género queer',
    'Polygender': 'Poligénero',
    'Agender': 'Agénero',
    'Non-binary': 'No binario',
    'Bigender': 'Bigénero'
  };

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statusesResponse, candidateResponse] = await Promise.all([
          axios.get(`${API_URL}/status`),
          axios.get(`${API_URL}/candidate/${initialCandidate.email}`)
        ]);
        setStatuses(statusesResponse.data);
        setCandidate(candidateResponse.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialCandidate.email]);

  const handleStatusChange = async (event) => {
    const newStatusId = event.target.value;
    const newStatus = statuses.find(status => status.id_status === newStatusId);
    if (!newStatus) {
      console.error('Status not found');
      return;
    }
    try {
      await axios.put(`${API_URL}/candidate/${candidate.email}`, {
        id_status: newStatusId,
        active: candidate.active
      });
      setCandidate(prev => ({
        ...prev,
        id_status: newStatusId,
        name_status: newStatus.name_status
      }));
      alert(`estatus del candidato cambiado`)
    } catch (error) {
      console.error('Error actualizando el status:', error);
    }
  };
  const handleActiveToggle = async () => {
    try {
      const newActiveState = !candidate.active;
      await axios.put(`${API_URL}/candidate/${candidate.email}`, {
        id_status: candidate.id_status,
        active: newActiveState
      });
      setCandidate(prev => ({
        ...prev,
        active: newActiveState
      }));
      alert(`estatus del candidato caambiado a ${candidate.name_status}`)
    } catch (error) {
      console.error('Error al cambiar el estado activo:', error);
    }
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (!candidate.email) {
    return <Typography>No se ha proporcionado información del candidato.</Typography>;
  }

  return (
    <Card className="profile-card">
      <CardContent className="profile-content">
        <Typography variant="h5" component="div">
          Perfil de {candidate.first_name} {candidate.last_name}
        </Typography>
        <Typography color="text.secondary">
          Email: {candidate.email}
        </Typography>
        <Typography color="text.secondary">
          Género: {genderTranslations[candidate.gender] || candidate.gender}
        </Typography>
        <Typography color="text.secondary">
          Fecha de registro: {new Date(candidate.registration_date).toLocaleDateString()}
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={statuses.find(s => s.name_status === candidate.name_status)?.id_status || ''}
            label="Status"
            onChange={handleStatusChange}
            className="status-select"
          >
            {statuses.map(status => (
              <MenuItem key={status.id_status} value={status.id_status}>
                {status.name_status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="button-container">
          <Button
            className="button-toggle"
            onClick={handleActiveToggle}
          >
            {candidate.active ? 'Desactivar' : 'Activar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;