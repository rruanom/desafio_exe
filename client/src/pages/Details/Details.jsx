import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Grades from '../../components/Grades';
import Profile from '../../components/Profile';

const Details = () => {
  const [candidate, setCandidate] = useState(null);
  const [showGrades, setShowGrades] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { email } = useParams();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`https://desafio-exe.onrender.com/api/candidate/${email}`);
        setCandidate(response.data);
      } catch (error) {
        console.error('Error fetching candidate details:', error);
      }
    };

    fetchCandidate();
  }, [email]);

  if (!candidate) return <div>Loading...</div>;

  return (
    <div>
      <h2>{candidate.first_name} {candidate.last_name}</h2>
      <p>Fecha de registro: {candidate.registration_date}</p>
      
      <button onClick={() => setShowGrades(!showGrades)}>
        {showGrades ? 'Hide Grades' : 'Show Grades'}
      </button>
      {showGrades && <Grades />}

      <button onClick={() => setShowProfile(!showProfile)}>
        {showProfile ? 'Hide Profile' : 'Show Profile'}
      </button>
      {showProfile && <Profile />}
    </div>
  );
};

export default Details;