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
        <input
          type="text"
          name="academic_degree"
          value={academicData.academic_degree}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Average Grade:</label>
        <input
          type="text"
          name="average_grade"
          value={academicData.average_grade}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Languages:</label>
        <input
          type="text"
          name="languages"
          value={academicData.languages}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default AcademicForm;

