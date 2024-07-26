import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const { email } = useParams();

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const gradesResponse = await axios.get(`https://desafio-exe.onrender.com/api/grades/${email}`);
        setGrades(gradesResponse.data);
        console.log(gradesResponse.data)
        const assessmentsResponse = await axios.get('https://desafio-exe.onrender.com/api/assessment');
        setAssessments(assessmentsResponse.data);
      } catch (error) {
        console.error('Error al hacer la petición:', error);
      }
    };

    fetchGrades();
  }, [email]);

  if (grades.length === 0) return <div>No existen resultados aún.</div>;

  return (
    <div>
      <h2>Resultados de {grades[0]?.first_name} {grades[0]?.last_name}</h2>
      {assessments.map((assessment) => {
        const grade = grades.find(g => g.name_assessment === assessment.name_assessment);

        if (grade) {
          return (
            <div key={assessment.id_assessment}>
              <h3>{grade.name_assessment} - {new Date(grade.assessment_date).toLocaleDateString()}</h3>
              <ul>
                <li>Profesionalidad: {grade.professionality}</li>
                <li>Dominio: {grade.domain}</li>
                <li>Resiliencia: {grade.resilience}</li>
                <li>Habilidades Sociales: {grade.social_hab}</li>
                <li>Liderazgo: {grade.leadership}</li>
                <li>Colaboración: {grade.collaboration}</li>
                <li>Compromiso: {grade.commitment}</li>
                <li>Iniciativa: {grade.initiative}</li>
              </ul>
              <p><strong>Reclutador:</strong> {grade.recruiter}</p>
              <p><strong>Comentarios:</strong> {grade.feedback}</p>
            </div>
          );
        } else {
          return (
            <div key={assessment.id_assessment}>
              <h3>{assessment.name_assessment}</h3>
              <p>No hay datos aún para esta evaluación.</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Grades;