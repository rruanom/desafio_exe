import { useEffect, useState } from "react";
import CandidatesList from "../../components/CandidatesList";

const Pipeline = () => {

  const [candidatesByStatus, setCandidatesByStatus] = useState({});
  const [candidatesDiscarded, setCandidatesDiscarded] = useState([]);
  const [showDiscarded, setShowDiscarded] = useState(false);

  const statusOrder = [
    'Registro',
    'Solicitud',
    'CentroEvaluacion',
    'Entrevista1',
    'Entrevista2',
    'Ofertado'
  ];

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    const getActiveCandidatesByStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/candidate`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const allCandidates = await response.json();

        const activeCandidates = allCandidates.filter(candidate => candidate.active === 1);

        const discardedCandidates = activeCandidates.filter(candidate => candidate.name_status === 'Descartado');

        const groupedByStatus = activeCandidates.reduce((accumulator, candidate) => {
          const status = candidate.name_status;
          if (status !== 'Descartado' && status !== 'Abandona' && status !== 'Registro') {
            if (!accumulator[status]) {
              accumulator[status] = [];
            }
            accumulator[status].push(candidate);
          }
          return accumulator;
        }, {});

        setCandidatesByStatus(groupedByStatus);
        setCandidatesDiscarded(discardedCandidates);

      } catch (error) {
        console.error('Fetch error in Filter by Category', error);
      }
    };

    getActiveCandidatesByStatus();
  }, []);

  return (
    <section className="pipelineContainer">
      {statusOrder.map(status => (
        candidatesByStatus[status] ? (
          <CandidatesList key={status} status={status} candidates={candidatesByStatus[status]} />
        ) : null
      ))}
      <div className="pipelineContainer">
        <button className="btnCandidatesDiscarded" onClick={() => setShowDiscarded(!showDiscarded)}>
          {showDiscarded ? 'Ocultar candidatos descartados' : 'Ver candidatos descartados'}
        </button>
      </div>
      {showDiscarded && (
        <CandidatesList status="Discarded" candidates={candidatesDiscarded} />
      )}
    </section>
  );
};

export default Pipeline;