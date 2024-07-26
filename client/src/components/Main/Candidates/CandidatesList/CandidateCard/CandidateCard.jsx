import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const CandidateCard = ({details}) => {

  // STATES
  console.log(details)

  return <div className="candidateCard">
    <p>{details.first_name} {details.last_name}</p>
    <p>Fecha de registro {details.registration_date}</p>



  </div>;
};

export default CandidateCard;
