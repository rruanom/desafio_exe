import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Grades from '../../components/Grades';
import Profile from '../../components/Profile';

const Details = () => {
  const [candidate, setCandidate] = useState(null);
  const [grades, setGrades] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [showGrades, setShowGrades] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { email } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidateResponse, gradesResponse, assessmentsResponse] = await Promise.all([
          axios.get(`https://desafio-exe.onrender.com/api/candidate/${email}`),
          axios.get(`https://desafio-exe.onrender.com/api/grades/${email}`),
          axios.get('https://desafio-exe.onrender.com/api/assessment')
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

  if (!candidate) return <div>Cargando...</div>;

  const daysSinceLastAssessment = getDaysSinceLastAssessment();

  return (
    <div>
      <h2>{candidate.first_name} {candidate.last_name}</h2>
      <p>Fecha de registro: {new Date(candidate.registration_date).toLocaleDateString()}</p>
      {daysSinceLastAssessment && (
        <p>Días desde la última evaluación: {daysSinceLastAssessment}</p>
      )}

      <button onClick={() => setShowGrades(!showGrades)}>
        {showGrades ? 'Ocultar Notas' : 'Notas'}
      </button>
      {showGrades && <Grades grades={grades} assessments={assessments} candidateName={`${candidate.first_name} ${candidate.last_name}`} />}

      <button onClick={() => setShowProfile(!showProfile)}>
        {showProfile ? 'Ocultar Perfil' : 'Perfil'}
      </button>
      {showProfile && <Profile candidate={candidate} />}
    </div>
  );
};

export default Details;