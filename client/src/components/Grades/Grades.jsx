import React from "react";

const Grades = ({ grades, assessments, candidateName }) => {
  if (grades.length === 0) return <div>No existen resultados aún.</div>;

  return (
    <div>
      <h2>Resultados de {candidateName}</h2>
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