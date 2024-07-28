import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const Overview = ({ totalCandidates, newCandidatesLastWeek, offeredPercentage, status2AndMorePercentage }) => {
  return (
    <div className="overview">
      <h2>Resumen</h2>
      <div className="overview-section">
        <div className="overview-item">
          <Typography>Total de candidatos:</Typography>
          <Typography>{totalCandidates}</Typography>
        </div>
        <div className="overview-item">
          <Typography>Nuevos candidatos (última semana):</Typography>
          <Typography>{newCandidatesLastWeek}</Typography>
        </div>
      </div>
      <div className="progress-section">
        <div className="progress-item">
          <Typography>Candidatos ofertados</Typography>
          <CircularProgressWithLabel value={parseFloat(offeredPercentage)} />
        </div>
        <div className="progress-item">
          <Typography>Candidatos que han pasado el registro</Typography>
          <CircularProgressWithLabel value={parseFloat(status2AndMorePercentage)} />
        </div>
      </div>
    </div>
  );
};

export default Overview;