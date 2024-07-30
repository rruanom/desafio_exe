import React from "react";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import SearchDashboard from "../SearchDashboard/SearchDashboard";
import { useAuth } from '../../context/Authcontext';

const Redirector = ({candidates}) => {
  const { user, logout, token, userType, name } = useAuth();

  return (
    <div className="divChart4">
      <section className="sectionDashboard" style={{
          backgroundImage: 'url(/banner.png)',
          backgroundSize: 'cover', // Opcional, para ajustar el tamaño de la imagen de fondo
          backgroundPosition: 'center', // Opcional, para centrar la imagen de fondo
        }}>
      <p>Hola, {name}!</p>
      <SearchDashboard candidates={candidates} />
    <div className="redirector">
      <Button
        component={Link}
        to="/candidatos"
        variant="contained"
        size="medium"
      >
        Candidatos
      </Button>
      <Button
        component={Link}
        to="/analytics"
        variant="contained"
        size="medium"
      >
        Estadísticas
      </Button>
      <Button
        component={Link}
        to="/staff"
        variant="contained"
        size="medium"
      >
        Staff
      </Button>
    </div>
    </section>
    </div>
  );
};

export default Redirector;