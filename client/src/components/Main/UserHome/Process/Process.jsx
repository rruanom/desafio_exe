import React from 'react';

const Process = ({ status }) => {
  const steps = [
    'Registro',
    'Solicitud',
    'CentroEvaluacion',
    'Entrevista 1',
    'Entrevista 2',
    'Abandona',
    'Descartado',
    'Ofertado'
  ];

  return (
    <div className="admission-process">
      <h2>Proceso de admisión</h2>
      <ul className="checklist">
        {steps.map((step, index) => (
          <li key={index} className={status === step ? 'active' : ''}>
            <span className="step-number">{index + 1}</span>
            <span className="step-name">{step}</span>
            {status === step && <span className="current-step">Estás aquí</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Process;