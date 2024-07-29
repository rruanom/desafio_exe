import React, { useState } from 'react';
import AcademicForm from '../AcademicForm';
import ExperienceForm from '../ExperienceForm';

const CandidateForm = () => {
  const [step, setStep] = useState(1);
  const [academicData, setAcademicData] = useState({});

  const handleNext = (data) => {
    setAcademicData(data);
    setStep(2);
  };

  const handleSubmit = async (experienceData) => {
    const formData = { ...academicData, ...experienceData, id_candidate: 993 };
    try {
      const response = await fetch('https://desafio-exe.onrender.com/api/form/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Datos enviados con éxito');
      } else {
        alert('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar los datos');
    }
  };

  return (
    <div>
      {step === 1 && <AcademicForm onNext={handleNext} />}
      {step === 2 && <ExperienceForm onSubmit={handleSubmit} academicData={academicData} />}
    </div>
  );
};

export default CandidateForm;
