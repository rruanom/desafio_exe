import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';

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
    <Card className="experience-form-card">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Experience"
            name="experience"
            value={experienceData.experience}
            onChange={handleChange}
            placeholder="Escribe sobre tu experiencia profesional"
            multiline
            rows={4}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="About You"
            name="about_you"
            value={experienceData.about_you}
            onChange={handleChange}
            placeholder="Escribe sobre ti"
            multiline
            rows={4}
          />
          
          <Button
            type="submit"
            variant="contained"
            className="submit-button"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;