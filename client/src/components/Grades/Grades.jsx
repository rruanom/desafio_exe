import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Grades = ({ grades, assessments, candidateName }) => {
  if (grades.length === 0) return <div className="no-grades-response">No existen resultados aún.</div>;

  const getChartData = (grade) => {
    const data = {
      labels: ['Profesionalidad', 'Dominio', 'Resiliencia', 'Hab. Sociales', 'Liderazgo', 'Colaboración', 'Compromiso', 'Iniciativa'],
      datasets: [
        {
          label: 'Puntuación',
          data: grade ? [
            grade.professionality,
            grade.domain,
            grade.resilience,
            grade.social_hab,
            grade.leadership,
            grade.collaboration,
            grade.commitment,
            grade.initiative
          ] : [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
    return data;
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    }
  };

  return (
    <div className="grades-container">
      <h2>Resultados de {candidateName}</h2>
      {assessments.map((assessment) => {
        const grade = grades.find(g => g.name_assessment === assessment.name_assessment);
        
        return (
          <div key={assessment.id_assessment} className="assessment-card">
            <h3>{assessment.name_assessment} - {grade ? new Date(grade.assessment_date).toLocaleDateString() : 'Sin fecha'}</h3>
            <div className="chart-container">
              <Radar data={getChartData(grade)} options={chartOptions} />
            </div>
            {grade ? (
              <>
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
                <div className="chart-details">
                <p><strong>Reclutador:</strong></p> <p>{grade.recruiter}</p>
                <p><strong>Comentarios:</strong></p> <p>{grade.feedback}</p>
                </div>
              </>
            ) : (
              <p>No hay datos aún para esta evaluación.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Grades;