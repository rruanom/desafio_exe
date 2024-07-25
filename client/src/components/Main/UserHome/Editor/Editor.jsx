import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Editor = ({ candidateData }) => {
  const [formData, setFormData] = useState({
    first_name: candidateData.first_name,
    last_name: candidateData.last_name,
    email: candidateData.email,
    gender: candidateData.gender
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('access-token');
      await axios.put('/api/candidates', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Perfil actualizado con éxito');
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    }
  };

  return (
    <div className="profile-editor">
      <h2>Editar perfil</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">Nombre:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Apellido:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Guardar cambios</button>
      </form>
    </div>
  );
};

export default Editor;