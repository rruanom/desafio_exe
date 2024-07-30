import React from "react";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

const Redirector = () => {
  return (
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
  );
};

export default Redirector;