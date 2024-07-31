import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Grades from '../../components/Grades';
import Profile from '../../components/Profile';

const Details = () => {
  const [candidate, setCandidate] = useState(null);
  const [grades, setGrades] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [visibleSection, setVisibleSection] = useState(null); // 'grades', 'profile', or null
  const { email } = useParams();
  const { id } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidateResponse, gradesResponse, assessmentsResponse] = await Promise.all([
          axios.get(`${API_URL}/candidate/${email}`),
          axios.get(`${API_URL}/grades/${email}`),
          axios.get(`${API_URL}/assessment`)
        ]);
        setCandidate(candidateResponse.data);
        setGrades(gradesResponse.data);
        setAssessments(assessmentsResponse.data);
      } catch (error) {
        console.error('Error al hacer las peticiones:', error);
      }
    };
    fetchData();
  }, [email]);

  const getDaysSinceLastAssessment = () => {
    if (grades.length === 0) return null;
    const lastAssessmentDate = new Date(Math.max(...grades.map(g => new Date(g.assessment_date))));
    const today = new Date();
    const diffTime = Math.abs(today - lastAssessmentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!candidate) return 'Cargando...';

  const daysSinceLastAssessment = getDaysSinceLastAssessment();

  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  return (
    <div className="details-container">
      <Card className="details-card">
        <CardContent>
          <Typography variant="h5" component="h2">
            {candidate.first_name} {candidate.last_name}
          </Typography>
          <Typography color="textSecondary">
            Fecha de registro: {new Date(candidate.registration_date).toLocaleDateString()}
          </Typography>
          {daysSinceLastAssessment !== null && (
            <Typography color="textSecondary">
              Días desde la última evaluación: {daysSinceLastAssessment}
            </Typography>
          )}
        </CardContent>
        <CardActions className="card-actions">
          <Button 
            onClick={() => toggleSection('grades')} 
            className="button-grades"
            variant={visibleSection === 'grades' ? 'contained' : 'outlined'}
          >
            {visibleSection === 'grades' ? 'Ocultar Notas' : 'Notas'}
          </Button>
          <Button 
            onClick={() => toggleSection('profile')} 
            className="button-profile"
            variant={visibleSection === 'profile' ? 'contained' : 'outlined'}
          >
            {visibleSection === 'profile' ? 'Ocultar Perfil' : 'Perfil'}
          </Button>
        </CardActions>
        {visibleSection === 'grades' && (
          <Grades 
            grades={grades} 
            assessments={assessments} 
            candidateName={`${candidate.first_name} ${candidate.last_name}`} 
            idCandidate={candidate.id_candidate} 
            idStaff={id} 
            email={email}
          />
        )}
        {visibleSection === 'profile' && <Profile candidate={candidate} />}
      </Card>
    </div>
  );
};

export default Details;