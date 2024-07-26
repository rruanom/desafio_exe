import { Link } from 'react-router-dom';

const CandidateCard = ({ details }) => {
  return (
    <Link to={`/details/${details.email}`} className="candidateCard">
      <p>{details.first_name} {details.last_name}</p>
      <p>Fecha de registro: {details.registration_date}</p>
    </Link>
  );
};

export default CandidateCard;