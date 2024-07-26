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

        const assessmentsResponse = await axios.get('https://desafio-exe.onrender.com/api/assessment');
        setAssessments(assessmentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGrades();
  }, []);

  if (grades.length === 0) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Grades for {grades[0]?.first_name} {grades[0]?.last_name}</h2>
      {assessments.map((assessment) => {
        const grade = grades.find(g => g.name_assessment === assessment.name_assessment);

        if (grade) {
          return (
            <div key={assessment.id_assessment}>
              <h3>{grade.name_assessment} - {new Date(grade.assessment_date).toLocaleDateString()}</h3>
              <ul>
                <li>Professionality: {grade.professionality}</li>
                <li>Domain: {grade.domain}</li>
                <li>Resilience: {grade.resilience}</li>
                <li>Social Habits: {grade.social_hab}</li>
                <li>Leadership: {grade.leadership}</li>
                <li>Collaboration: {grade.collaboration}</li>
                <li>Commitment: {grade.commitment}</li>
                <li>Initiative: {grade.initiative}</li>
              </ul>
              <p><strong>Recruiter:</strong> {grade.recruiter}</p>
              <p><strong>Feedback:</strong> {grade.feedback}</p>
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