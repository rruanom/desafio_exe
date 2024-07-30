import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex" style={{ marginTop: ' 5px'}} className='boxMui'>
      <CircularProgress variant="determinate" {...props}/>
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
        <Typography variant="caption" component="div" color="black" style={{ fontWeight: '600', fontSize: '16px' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const Overview = ({ totalCandidates, newCandidatesLastWeek, offeredPercentage, status2AndMorePercentage }) => {
  return (
    <div className="divChart4">
      <section className="sectionAnalyticsIntro">
        <span className="spanTitleAnalytics">
          <h2 className="titleAnalytics">Total de Candidatos</h2>
        </span>
        <p className="titleTop">{totalCandidates}</p>
      </section>
      <section className="sectionAnalyticsIntro">
        <span className="spanTitleAnalytics">
          <h2 className="titleAnalytics">Nuevos Candidatos</h2>
        </span>
        <p className="titleTop">{newCandidatesLastWeek}</p>
      </section>
      <section className="sectionAnalyticsIntro">
        <span className="spanTitleAnalytics">
          <h2 className="titleAnalytics">1er Filtro Superado</h2>
        </span>
        <CircularProgressWithLabel value={parseFloat(status2AndMorePercentage)} />
      </section>
      <section className="sectionAnalyticsIntro2">
        <span className="spanTitleAnalytics">
          <h2 className="titleAnalytics">Candidatos Ofertados</h2>
        </span>
        <CircularProgressWithLabel value={parseFloat(offeredPercentage)} />
      </section>
    </div>
  );
};

export default Overview;