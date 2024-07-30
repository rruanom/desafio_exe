import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Card
} from '@mui/material';

const Editor = ({ candidateData }) => {
  const [formData, setFormData] = useState({
    first_name: candidateData.first_name,
    last_name: candidateData.last_name,
    email: candidateData.email,
    gender: candidateData.gender
  });
  const [message, setMessage] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || '/api'

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('access-token');
      console.log(formData)
      await axios.put(`${API_URL}/candidate/${candidateData.email}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Perfil actualizado con éxito');
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    }
  };

  const inputProps = {
    sx: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#11654D',
        },
        '&:hover fieldset': {
          borderColor: '#11654D',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#11654D',
        },
      },
    },
    className: "custom-input"
  };

  return (
    <Card className="profile-editor">
      <h2>Editar perfil</h2>
      {message && <Typography className={message.includes('éxito') ? 'success-message' : 'error-message'}>{message}</Typography>}
      <Box component="form" onSubmit={handleSubmit} className="editor-form">
        <TextField
          label="Nombre"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          fullWidth
          {...inputProps}
        />
        <TextField
          label="Apellido"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          fullWidth
          {...inputProps}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          {...inputProps}
        />
        <Select
          label="Género"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          fullWidth
          {...inputProps}
        >
          {Object.entries(genderTranslations).map(([key, value]) => (
            <MenuItem key={key} value={key}>{value}</MenuItem>
          ))}
        </Select>
        <div className='button-container'>
        <Button type="submit" variant="contained" className="submit-button">
          Guardar cambios
        </Button>
        </div>
      </Box>
    </Card>
  );
};

export default Editor;