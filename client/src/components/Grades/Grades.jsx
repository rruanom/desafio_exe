import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Rating, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Grades = ({ grades, assessments, candidateName, idCandidate, idStaff, email, onDataUpdate }) => {
  const [newGrades, setNewGrades] = useState({});
  const [localGrades, setLocalGrades] = useState(grades);
  const [localAssessments, setLocalAssessments] = useState(assessments);

  useEffect(() => {
    setLocalGrades(grades);
    setLocalAssessments(assessments);
  }, [grades, assessments]);

  if (localGrades.length === 0 && localAssessments.length === 0) return <div className="no-grades-response">No existen resultados aún.</div>;

  const getChartData = (grade) => {
    const data = {
      labels: ['Profesionalidad', 'Dominio', 'Resiliencia', 'Hab. Sociales', 'Liderazgo', 'Colaboración', 'Compromiso', 'Iniciativa'],
      datasets: [
        {
          label: 'Puntuación',
          data: grade ? [
            grade.professionality,
            grade.domain,
            grade.resilience,
            grade.social_hab,
            grade.leadership,
            grade.collaboration,
            grade.commitment,
            grade.initiative
          ] : [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
    return data;
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    }
  };

  const handleRatingChange = (assessmentId, field, value) => {
    setNewGrades(prev => ({
      ...prev,
      [assessmentId]: {
        ...prev[assessmentId],
        [field]: value
      }
    }));
  };

  const getStatusId = (assessmentId) => {
    switch (assessmentId) {
      case 1: return 3;
      case 2: return 4;
      case 3: return 5;
      default: return null;
    }
  };

  const handleSubmit = async (assessmentId) => {
    const gradeData = newGrades[assessmentId];
    if (!gradeData || Object.values(gradeData).some(v => v === undefined)) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const submissionData = {
      id_candidate: idCandidate,
      professionality: gradeData.professionality,
      domain: gradeData.domain,
      resilience: gradeData.resilience,
      social_hab: gradeData.social_hab,
      leadership: gradeData.leadership,
      collaboration: gradeData.collaboration,
      commitment: gradeData.commitment,
      initiative: gradeData.initiative,
      id_assessment: assessmentId,
      id_staff: idStaff,
      feedback: gradeData.feedback
    };

    try {
      await axios.post(`${API_URL}/grades/add`, submissionData);
      
      const statusId = getStatusId(assessmentId);
      if (statusId) {
        await axios.put(`${API_URL}/candidate/${email}`, { id_status: statusId });
      }

      alert("Calificación enviada con éxito");
      
      const [gradesResponse, assessmentsResponse] = await Promise.all([
        axios.get(`${API_URL}/grades/${email}`),
        axios.get(`${API_URL}/assessment`)
      ]);
      
      setLocalGrades(gradesResponse.data);
      setLocalAssessments(assessmentsResponse.data);

    } catch (error) {
      console.error("Error al enviar la calificación:", error);
      alert("Error al enviar la calificación");
    }
  };

  const getSpanishLabel = (field) => {
    const labels = {
      professionality: 'Profesionalidad',
      domain: 'Dominio',
      resilience: 'Resiliencia',
      social_hab: 'Hab. Sociales',
      leadership: 'Liderazgo',
      collaboration: 'Colaboración',
      commitment: 'Compromiso',
      initiative: 'Iniciativa'
    };
    return labels[field] || field;
  };

  return (
    <div className="grades-container">
      <h2>Resultados de {candidateName}</h2>
      {localAssessments.map((assessment) => {
        const grade = localGrades.find(g => g.name_assessment === assessment.name_assessment);
        
        return (
          <div key={assessment.id_assessment} className="assessment-card">
            <h3>{assessment.name_assessment} - {grade ? new Date(grade.assessment_date).toLocaleDateString() : 'Sin calificar'}</h3>
            <div className="chart-container">
              <Radar data={getChartData(grade)} options={chartOptions} />
            </div>
            {grade ? (
              <>
                <ul>
                  <li>Profesionalidad: {grade.professionality}</li>
                  <li>Dominio: {grade.domain}</li>
                  <li>Resiliencia: {grade.resilience}</li>
                  <li>Hab. Sociales: {grade.social_hab}</li>
                  <li>Liderazgo: {grade.leadership}</li>
                  <li>Colaboración: {grade.collaboration}</li>
                  <li>Compromiso: {grade.commitment}</li>
                  <li>Iniciativa: {grade.initiative}</li>
                </ul>
                <div className="chart-details">
                  <p><strong>Reclutador:</strong></p> <p>{grade.recruiter}</p>
                  <p><strong>Comentarios:</strong></p> <p>{grade.feedback}</p>
                </div>
              </>
            ) : (
              <Box component="form" noValidate autoComplete="off" className="rating-form">
                {['professionality', 'domain', 'resilience', 'social_hab', 'leadership', 'collaboration', 'commitment', 'initiative'].map((field) => (
                  <Box key={field} sx={{ my: 2 }} className="rating-item">
                    <Typography component="legend">{getSpanishLabel(field)}</Typography>
                    <Rating
                      name={`${assessment.id_assessment}-${field}`}
                      value={newGrades[assessment.id_assessment]?.[field] || 0}
                      onChange={(event, newValue) => {
                        handleRatingChange(assessment.id_assessment, field, newValue);
                      }}
                    />
                  </Box>
                ))}
                <TextField
                  fullWidth
                  label="Comentarios"
                  multiline
                  rows={4}
                  value={newGrades[assessment.id_assessment]?.feedback || ''}
                  onChange={(e) => handleRatingChange(assessment.id_assessment, 'feedback', e.target.value)}
                  sx={{ my: 2 }}
                  className="feedback-input"
                />
                <Button
                  variant="contained"
                  onClick={() => handleSubmit(assessment.id_assessment)}
                  sx={{ mt: 2 }}
                  className="submit-button"
                >
                  Enviar Calificación
                </Button>
              </Box>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Grades;