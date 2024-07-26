import React from 'react';

const Welcome = ({ name, registrationDate }) => {
  const formattedDate = new Date(registrationDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="welcome">
      <h2>¡Hola, {name}!</h2>
      <p>Te registraste el {formattedDate}</p>
    </div>
  );
};

export default Welcome;