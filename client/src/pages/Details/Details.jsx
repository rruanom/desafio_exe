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
  const [showGrades, setShowGrades] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
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

  return (
    <div className="details-container">
      <Card className="details-card">
        <CardContent>
          <h2>
            {candidate.first_name} {candidate.last_name}
          </h2>
          <p>
            Fecha de registro: {new Date(candidate.registration_date).toLocaleDateString()}
          </p>
          {daysSinceLastAssessment !== null && (
            <p>
              Días desde la última evaluación: {daysSinceLastAssessment}
            </p>
          )}
        </CardContent>
        <CardActions className="card-actions">
          <Button onClick={() => setShowGrades(!showGrades)} className="button-grades">
            {showGrades ? 'Ocultar Notas' : 'Notas'}
          </Button>
          <Button onClick={() => setShowProfile(!showProfile)} className="button-profile">
            {showProfile ? 'Ocultar Perfil' : 'Perfil'}
          </Button>
        </CardActions>
        {showGrades && <Grades grades={grades} assessments={assessments} candidateName={`${candidate.first_name} ${candidate.last_name}`} idCandidate={candidate.id_candidate} idStaff={id} email={email}/>}
        {showProfile && <Profile candidate={candidate} />}
      </Card>
    </div>
  );
};

export default Details;
