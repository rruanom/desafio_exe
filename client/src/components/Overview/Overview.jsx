import React from 'react';

const Overview = ({ totalCandidates, newCandidatesLastWeek, offeredPercentage, status2AndMorePercentage }) => {
  return (
    <div className="overview">
      <h2>Resumen</h2>
      <ul>
        <li>Total de candidatos: {totalCandidates}</li>
        <li>Nuevos candidatos (última semana): {newCandidatesLastWeek}</li>
        <li>Porcentaje de candidatos ofertados: {offeredPercentage}%</li>
        <li>Porcentaje de candidatos que han pasado el registro: {status2AndMorePercentage}%</li>
      </ul>
    </div>
  );
};

export default Overview;