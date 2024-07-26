import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const [candidate, setCandidate] = useState(null);
  const { email } = useParams();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/candidate/${email}`);
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
      <Link to={`/grades/${email}`}>
        <button>Grades</button>
      </Link>
      <Link to={`/profile/${email}`}>
        <button>Profile</button>
      </Link>
    </div>
  );
};

export default Details;