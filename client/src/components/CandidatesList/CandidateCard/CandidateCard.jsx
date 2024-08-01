import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const CandidateCard = ({ details }) => {

  const [lastDays, setLastDays] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || '/api';
  const [match, setMatch] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const formattedDate = formatDate(details.registration_date);


  const calculateLastDays = (assessments) => {
    if (!assessments.length) return null;

    const today = new Date().setHours(0, 0, 0, 0); 
    let mostRecentDate = new Date(assessments[0].assessment_date).setHours(0, 0, 0, 0);

    for (const assessment of assessments) {
      const assessmentDate = new Date(assessment.assessment_date).setHours(0, 0, 0, 0);
      if (assessmentDate > mostRecentDate) {
        mostRecentDate = assessmentDate;
      }
    }

    const diffTime = Math.abs(today - mostRecentDate); 
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  };

  useEffect(() => {
    const getLastAssessmentDays = async () => {
      try {
        const response = await fetch(`${API_URL}/grades/${details.email}`);
        if (!response.ok) {
          throw new Error('La respuesta de red fue errónea');
        }
        const assessments = await response.json();

        const days = calculateLastDays(assessments);
        setLastDays(days);
      } catch (error) {
        console.error('error en el fetch:', error);
      }
    };

    getLastAssessmentDays();
  }, [details.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://filtro-ybp4.onrender.com/candidate/${details.email}`);
        if (!response.ok) {
          throw new Error('La respuesta de red fue errónea');
        }
        const data = await response.json();

        const number = data.percentage_score;
        if (number !== undefined && number !== null && !isNaN(number)) {
          const percentage = Math.floor(number);
          setMatch(percentage);
        } else {
          setMatch(null);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setMatch(null);
      }
    };

    fetchData();
  }, [details.email]);


  const getMatchClass = (match) => {
    if (match < 50) {
      return 'matchRed';
    } else if (match < 70) {
      return 'matchYellow';
    } else {
      return 'matchGreen';
    }
  };


  return (
    <Link to={`/details/${details.email}`}>
      <article className="candidateCard">
        <p className="titleCard">{details.first_name} {details.last_name}</p>
        <img className="iconFlechaDcha" src="/flechaderecha.png" alt="flecha derecha" />
        <div className="divDatesCard">
          {lastDays !== null ? (
            <p className="dateCard"><img className="iconClock" src="/reloj.png" alt="clock" /> {lastDays}d</p>
          ) : (
            <p className="dateCard"><img className="iconClock" src="/reloj.png" alt="clock" /> 0d</p>
          )}
          <p className="dateCard2"><img className="iconRegister" src="/register.png" alt="register" /> {formattedDate}</p>
          {match !== null && !isNaN(match) && (
            <p className={`${getMatchClass(match)}`}>{match}%</p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default CandidateCard;
