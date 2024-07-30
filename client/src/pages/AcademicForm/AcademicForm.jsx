import React, { useState } from 'react';
import { Card, CardContent, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

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
    <Card className="academic-form-card">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="academic-degree-label">Nivel de Formación</InputLabel>
            <Select
              labelId="academic-degree-label"
              name="academic_degree"
              value={academicData.academic_degree}
              onChange={handleChange}
              label="Academic Degree"
            >
              <MenuItem value="FP">FP</MenuItem>
              <MenuItem value="Grado">Grado</MenuItem>
              <MenuItem value="Master">Master</MenuItem>
              <MenuItem value="Doctorado">Doctorado</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            margin="normal"
            label="Puntuación Media"
            name="average_grade"
            value={academicData.average_grade}
            onChange={handleChange}
            placeholder="7.2"
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="languages-label">Nivel de Inglés</InputLabel>
            <Select
              labelId="languages-label"
              name="languages"
              value={academicData.languages}
              onChange={handleChange}
              label="Nivel de Inglés"
            >
              <MenuItem value="A1">A1</MenuItem>
              <MenuItem value="A2">A2</MenuItem>
              <MenuItem value="B1">B1</MenuItem>
              <MenuItem value="B2">B2</MenuItem>
              <MenuItem value="C1">C1</MenuItem>
              <MenuItem value="C2">C2</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            variant="contained"
            className="submit-button"
          >
            Siguiente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AcademicForm;