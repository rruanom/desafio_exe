import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CandidatesList from "../../components/CandidatesList";

const Candidates = () => {

  // STATES
  const [candidatesByStatus, setCandidatesByStatus] = useState({});
  const [candidatesDiscarded, setCandidatesDiscarded] = useState([]);
  const [showDiscarded, setShowDiscarded] = useState(false);
  console.log(candidatesByStatus)
  console.log(candidatesDiscarded)

  const statusOrder = [
    'Registro',
    'Solicitud',
    'CentroEvaluacion',
    'Entrevista1',
    'Entrevista2',
    'Ofertado'
  ];


  // FUNCTIONS
  useEffect(() => {
    const getActiveCandidatesByStatus = async () => {
      try {
        const response = await fetch('https://desafio-exe.onrender.com/api/candidate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const allCandidates = await response.json();
        console.log('All Candidates:', allCandidates);

        // filter active candidates
        const activeCandidates = allCandidates.filter(candidate => candidate.active === 1);
        console.log('Active Candidates:', activeCandidates);

        // separate "discarded" candidates
        const discardedCandidates = activeCandidates.filter(candidate => candidate.name_status === 'Descartado');
        console.log('Discarded Candidates:', discardedCandidates);

        const groupedByStatus = activeCandidates.reduce((accumulator, candidate) => {
          const status = candidate.name_status;
          if (status !== 'Descartado' && status !== 'Abandona' && status !== 'Registro') { //quitamos Registro porque nos interesan desde que pasen el primer filtro
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

  // RETURN
  return <section className="candidatesContainer">
    Panel de Candidatos
    {statusOrder.map(status => (
        candidatesByStatus[status] ? (
          <CandidatesList key={status} status={status} candidates={candidatesByStatus[status]} />
        ) : null
      ))}

    <div className="candidatesContainer">
      <button onClick={() => setShowDiscarded(!showDiscarded)} className="btnDiscard">
      {showDiscarded ? 'Ocultar candidatos descartados' : 'Ver candidatos descartados'}
      </button>
    </div>
    {showDiscarded && (
          <CandidatesList status="Discarded" candidates={candidatesDiscarded} />
        )}

  </section>;
};

export default Candidates;