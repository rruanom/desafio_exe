import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CandidatesList from "./CandidatesList";

const Candidates = () => {
  return <section className="candidates">
  {candidates.map((item, i) =>
    <CandidatesList key={uuidv4()} dataItem={item} />)}
  
      <div className="AssessmentList">
        <button onClick={viewDiscarded} className="btnDiscard">Ver candidatos descartados</button>
      </div>
  
    </section>;
};

export default Candidates;