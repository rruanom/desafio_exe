import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AcademicForm from '../AcademicForm';
import ExperienceForm from '../ExperienceForm';
import { useAuth } from '../../context/Authcontext';
import { Paper } from '@mui/material';

const CandidateForm = () => {
  const [step, setStep] = useState(1);
  const [academicData, setAcademicData] = useState({});
  const { id, email, status } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const navigate = useNavigate();

  const handleNext = (data) => {
    setAcademicData(data);
    setStep(2);
  };

  const handleSubmit = async (experienceData) => {
    const formData = { ...academicData, ...experienceData, id_candidate: id };
    console.log(formData);
    try {
      const response = await fetch(`${API_URL}/form/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos del formulario');
      }

      const statusResponse = await fetch(`${API_URL}/candidate/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_status: 2 }),
      });

      if (!statusResponse.ok) {
        throw new Error('Error al actualizar el estado del candidato');
      }

      alert('Datos enviados con éxito');
      navigate('/profile');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error al procesar la solicitud');
    }
  };

  if (status !== "Registro") {
    return (
      <Paper elevation={3} className="candidate-form__paper">
        <h2 className="candidate-form__title">
          Formulario ya enviado
        </h2>
        <p className="candidate-form__text">
          El formulario ya ha sido enviado. No es necesario volver a completarlo.
        </p>
      </Paper>
    );
  }

  return (
    <div className="candidate-form">
      {step === 1 && <AcademicForm onNext={handleNext} />}
      {step === 2 && <ExperienceForm onSubmit={handleSubmit} academicData={academicData} />}
    </div>
  );
};

export default CandidateForm;