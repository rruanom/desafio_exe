import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CandidatesList from "./CandidatesList";

const CandidatesList = ({dataItem}) => {
  return <section className="candidatesList">
    <p>{dataItem.name_status} ({numCandidates})</p>
    {candidateList.map((item, i) =>
    <CandidateCard key={uuidv4()} dataItem={item} />)}



</section>;
};

export default CandidatesList;