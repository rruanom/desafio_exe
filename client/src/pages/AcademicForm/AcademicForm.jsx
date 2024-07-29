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
                <select name="academic_degree" id="" onChange={handleChange}>
                    <option value={academicData.academic_degree}>FP</option>
                    <option value={academicData.academic_degree}>Grado</option>
                    <option value={academicData.academic_degree}>Master</option>
                    <option value={academicData.academic_degree}>Doctorado</option>
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
        <select name="languages" id="" onChange={handleChange}>
                    <option value={academicData.languages}>A1</option>
                    <option value={academicData.languages}>A2</option>
                    <option value={academicData.languages}>B1</option>
                    <option value={academicData.languages}>B2</option>
                    <option value={academicData.languages}>C1</option>
                    <option value={academicData.languages}>C2</option>
                </select>
      </div>
      <button type="submit">Siguiente</button>
    </form>
  );
};

export default AcademicForm;

