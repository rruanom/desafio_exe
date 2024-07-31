import React from "react";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import SearchDashboard from "../SearchDashboard/SearchDashboard";
import { useAuth } from '../../context/Authcontext';

const Redirector = ({candidates}) => {
  const { user, role, email, status, logout, token, userType, name } = useAuth();
  console.log(role)
  console.log(userType)

  return (
    <div className="divChart4">
      <section className="sectionDashboard" style={{
          backgroundImage: 'url(/banner.png)',
          backgroundSize: 'cover', // Opcional, para ajustar el tamaño de la imagen de fondo
          backgroundPosition: 'center', // Opcional, para centrar la imagen de fondo
        }}>
      <p className="titleDashboard">Hola, {name}!</p>
      <div className="divDataDashboard">
      <p className="dataDashboardRole">{role}</p>
      <p className="dataDashboard">{email}</p>
      </div>
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
        to="/staff"
        variant="contained"
        size="medium"
      >
        Staff
      </Button>
      <Button
        component={Link}
        to="/analytics"
        variant="contained"
        size="medium"
      >
        Estadísticas
      </Button>
    </div>
    </section>
    </div>
  );
};

export default Redirector;