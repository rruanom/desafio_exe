import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CandidateCard from "./CandidateCard";

const CandidatesList = ({status, candidates}) => {

  // STATES
  console.log(status)
  console.log(candidates)


  // FUNCTIONS

  // RETURN
  return <section className="candidatesList">
    <p>{status} ({candidates.length})</p>
    {candidates.map((item, i) =>
    <CandidateCard key={uuidv4()} details={item} />)}



</section>;
};

export default CandidatesList;