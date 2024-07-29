import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const Profile = ({ candidate: initialCandidate }) => {
  const [candidate, setCandidate] = useState(initialCandidate);
  const [statuses, setStatuses] = useState([]);

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

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const statusesResponse = await axios.get('https://desafio-exe.onrender.com/api/status');
        setStatuses(statusesResponse.data);
      } catch (error) {
        console.error('Error al obtener los estados:', error);
      }
    };
    fetchStatuses();
  }, []);

  const handleStatusChange = async (e) => {
    try {
      await axios.put(`https://desafio-exe.onrender.com/api/candidate/${candidate.email}`, {
        id_status: parseInt(e.target.value),
        active: candidate.active
      });
      setCandidate(prev => ({
        ...prev,
        name_status: e.target.options[e.target.selectedIndex].text
      }));
    } catch (error) {
      console.error('Error actualizando el status:', error);
    }
  };

  const handleActiveToggle = async () => {
    try {
      const newActiveState = !candidate.active;
      await axios.put(`https://desafio-exe.onrender.com/api/candidate/${candidate.email}`, {
        id_status: statuses.find(s => s.name_status === candidate.name_status).id_status,
        active: newActiveState
      });
      setCandidate(prev => ({
        ...prev,
        active: newActiveState
      }));
    } catch (error) {
      console.error('Error al cambiar el estado activo:', error);
    }
  };

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