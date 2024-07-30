import React, { useState } from 'react';

const AcademicForm = ({ onNext }) => {
  const [academicData, setAcademicData] = useState({
    academic_degree: '',
    average_grade: '',
    languages: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicData({
      ...academicData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(academicData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Academic Degree:</label>
        <select 
          name="academic_degree" 
          value={academicData.academic_degree} 
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="FP">FP</option>
          <option value="Grado">Grado</option>
          <option value="Master">Master</option>
          <option value="Doctorado">Doctorado</option>
        </select>
      </div>
      <div>
        <label>Average Grade:</label>
        <input
          type="text"
          name="average_grade"
          value={academicData.average_grade}
          onChange={handleChange}
          placeholder='7.2'
        />
      </div>
      <div>
        <label>Nivel de Ingles</label>
        <select 
          name="languages" 
          value={academicData.languages} 
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
      </div>
      <button type="submit">Siguiente</button>
    </form>
  );
};

export default AcademicForm;