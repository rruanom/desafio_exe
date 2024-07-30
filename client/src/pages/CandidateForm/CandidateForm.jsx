import React, { useState } from 'react';
import AcademicForm from '../AcademicForm';
import ExperienceForm from '../ExperienceForm';
import { useAuth } from '../../context/Authcontext';


const CandidateForm = () => {
  const [step, setStep] = useState(1);
  const [academicData, setAcademicData] = useState({});
  const {id}=useAuth();

  const handleNext = (data) => {
    setAcademicData(data);
    setStep(2);
  };

  const handleSubmit = async (experienceData) => {
    const formData = { ...academicData, ...experienceData, id_candidate:id};
    console.log(formData)
    try {
      const response = await fetch('http://localhost:5000/api/form/add', {
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
