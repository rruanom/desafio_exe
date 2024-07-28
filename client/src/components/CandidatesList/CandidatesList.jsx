import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import CandidateCard from "./CandidateCard";

const CandidatesList = ({ status, candidates }) => {
  // Ref to store the candidatesList elements
  const listRef = useRef(null);

  useEffect(() => {
    // Function to adjust the height of the columns
    const adjustHeight = () => {
      // Check if the viewport width is at least 900px
      if (window.innerWidth >= 900) {
        const lists = document.querySelectorAll('.candidatesList');
        let maxHeight = 0;

        // Find the maximum height
        lists.forEach(list => {
          if (list.offsetHeight > maxHeight) {
            maxHeight = list.offsetHeight;
          }
        });

        // Set all lists to the maximum height
        lists.forEach(list => {
          list.style.height = `${maxHeight}px`;
        });
      } else {
        // Reset height if viewport width is less than 900px
        const lists = document.querySelectorAll('.candidatesList');
        lists.forEach(list => {
          list.style.height = 'auto';
        });
      }
    };

    // Adjust height after the component mounts
    adjustHeight();

    // Optionally, adjust height on window resize
    window.addEventListener('resize', adjustHeight);

    // Cleanup event listener on component unmount
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
