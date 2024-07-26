import React, { useState, useEffect } from "react";
import axios from 'axios';

const Profile = ({ candidate }) => {
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
      
      candidate.name_status = e.target.options[e.target.selectedIndex].text;
    } catch (error) {
      console.error('Error actualizando el status:', error);
    }
  };

  const handleActiveToggle = async () => {
    try {
      await axios.put(`https://desafio-exe.onrender.com/api/candidate/${candidate.email}`, {
        id_status: statuses.find(s => s.name_status === candidate.name_status).id_status,
        active: !candidate.active
      });
      
      candidate.active = !candidate.active;
    } catch (error) {
      console.error('Error al cambiar el estado activo:', error);
    }
  };

  return (
    <div>
      <h2>Perfil de {candidate.first_name} {candidate.last_name}</h2>
      <p>Email: {candidate.email}</p>
      <p>Género: {genderTranslations[candidate.gender] || candidate.gender}</p>
      <p>Fecha de registro: {new Date(candidate.registration_date).toLocaleDateString()}</p>
      
      <select 
        value={statuses.find(s => s.name_status === candidate.name_status)?.id_status} 
        onChange={handleStatusChange}
      >
        {statuses.map(status => (
          <option key={status.id_status} value={status.id_status}>
            {status.name_status}
          </option>
        ))}
      </select>
      
      <button onClick={handleActiveToggle}>
        {candidate.active ? 'Desactivar' : 'Activar'}
      </button>
    </div>
  );
};

export default Profile;