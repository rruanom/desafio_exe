import React, { useState } from 'react';

const SearchDashboard = ({ candidates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredCandidates = candidates.filter(candidate =>
      candidate.first_name.toLowerCase().includes(term) ||
      candidate.last_name.toLowerCase().includes(term) ||
      candidate.email.toLowerCase().includes(term)
    );

    setSearchResults(filteredCandidates);
  };

  return (
    <div className="search-dashboard">
      <input
        type="text"
        placeholder="Buscar candidato..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <ul>
          {searchResults.map(candidate => (
            <li key={candidate.id_candidate}>
              {candidate.first_name} {candidate.last_name} - {candidate.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDashboard;