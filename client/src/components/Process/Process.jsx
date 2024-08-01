import React from 'react';
import { Stepper, Step, StepLabel, Typography, useMediaQuery, useTheme } from '@mui/material';

const Process = ({ status }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = ['Registro', 'Solicitud', 'CentroEvaluacion', 'Entrevista 1', 'Entrevista 2', 'Ofertado'];
  const errorSteps = ['Abandona', 'Descartado'];

  const getStepIndex = () => {
    const index = steps.indexOf(status);
    return index !== -1 ? index : steps.length;
  };

  const isErrorStep = errorSteps.includes(status);

  return (
    <div className={`admission-process ${isErrorStep ? 'error-state' : ''}`}>
      <h2>Proceso de admisión</h2>
      <Stepper 
        activeStep={getStepIndex()} 
        orientation={isMobile ? 'vertical' : 'horizontal'}
        className="custom-stepper"
      >
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel>
              {step}
              {status === step && (
                <span className="current-step">(Estás aquí)</span>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {isErrorStep && (
        <Typography className="error-message">
          Estado actual: {status}
        </Typography>
      )}
    </div>
  );
};

export default Process;