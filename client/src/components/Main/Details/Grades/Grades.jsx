import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const { email } = useParams();

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/grades/${email}`);
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [email]);

  return (
    <div>
      <h2>Grades for {grades[0]?.first_name} {grades[0]?.last_name}</h2>
      {grades.map((grade, index) => (
        <div key={index}>
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
        </div>
      ))}
    </div>
  );
};

export default Grades;