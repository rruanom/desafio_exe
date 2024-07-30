import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import CandidateCard from "./CandidateCard";

const CandidatesList = ({ status, candidates }) => {
  const listRef = useRef(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (window.innerWidth >= 900) {
        const lists = document.querySelectorAll('.candidatesList');
        let maxHeight = 0;
        lists.forEach(list => {
          if (list.offsetHeight > maxHeight) {
            maxHeight = list.offsetHeight;
          }
        });

        lists.forEach(list => {
          list.style.height = `${maxHeight}px`;
        });
      } else {
        const lists = document.querySelectorAll('.candidatesList');
        lists.forEach(list => {
          list.style.height = 'auto';
        });
      }
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, [candidates]);

  return (
    <section ref={listRef} className="candidatesList">
      <p className="titleList">{status} ({candidates.length})</p>
      {candidates.map(item => (
        <CandidateCard key={uuidv4()} details={item} />
      ))}
    </section>
  );
};

export default CandidatesList;
