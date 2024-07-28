import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const CandidateCard = ({ details }) => {
  // STATES
  const [lastDays, setLastDays] = useState(null); // Cambiar a null para manejar la inicialización
  console.log(lastDays);

  // FUNCTION TO FORMAT DATE
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const formattedDate = formatDate(details.registration_date);

  // FUNCTION TO CALCULATE LAST DAYS
  const calculateLastDays = (assessments) => {
    if (!assessments.length) return null;

    const today = new Date().setHours(0, 0, 0, 0); // Establecer la hora a medianoche para evitar diferencias horarias
    let mostRecentDate = new Date(assessments[0].assessment_date).setHours(0, 0, 0, 0); // Inicializar con la primera fecha

    for (const assessment of assessments) {
      const assessmentDate = new Date(assessment.assessment_date).setHours(0, 0, 0, 0);
      if (assessmentDate > mostRecentDate) {
        mostRecentDate = assessmentDate;
      }
    }

    const diffTime = Math.abs(today - mostRecentDate); // Diferencia en milisegundos
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convertir a días (redondear hacia abajo)
    return diffDays;
  };

  useEffect(() => {
    const getLastAssessmentDays = async () => {
      try {
        const response = await fetch(`https://desafio-exe.onrender.com/api/grades/${details.email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const assessments = await response.json();
        console.log('All Assessments:', assessments);

        const days = calculateLastDays(assessments); // Calcular días desde la última fecha
        setLastDays(days);
      } catch (error) {
        console.error('Fetch error in Filter by Category', error);
      }
    };

    getLastAssessmentDays();
  }, [details.email]); // Añadir detalles.email como dependencia

  // RETURN
  return (
    <Link to={`/details/${details.email}`}>
      <article className="candidateCard">
        <p className="titleCard">{details.first_name} {details.last_name}</p>
        <img className="iconFlechaDcha" src="/flechaderecha.png" alt="flecha derecha" />
        <div className="divDatesCard">
        {lastDays? (
          <p className="dateCard"><img className="iconClock" src="/reloj.png" alt="clock" /> {lastDays}d</p>
        ) : (
          <p className="dateCard"><img className="iconClock" src="/reloj.png" alt="clock" /> 0d</p>
        )}
        <p className="dateCard2"><img className="iconRegister" src="/register.png" alt="register" /> {formattedDate}</p>
        </div>
      </article>
    </Link>
  );
};

export default CandidateCard;
