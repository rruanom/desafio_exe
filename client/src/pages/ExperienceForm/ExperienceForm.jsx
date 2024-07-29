import React, { useState, useEffect } from 'react';

const ExperienceForm = ({ onSubmit, academicData }) => {
  const [experienceData, setExperienceData] = useState({
    experience: '',
    about_you: '',
  });

  useEffect(() => {
    console.log('Academic Data:', academicData);
  }, [academicData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperienceData({
      ...experienceData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(experienceData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Experience:</label>
        <input
          type="text"
          name="experience"
          value={experienceData.experience}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>About You:</label>
        <textarea
          name="about_you"
          value={experienceData.about_you}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExperienceForm;
