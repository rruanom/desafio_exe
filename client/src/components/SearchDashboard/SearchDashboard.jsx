import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('https://desafio-exe.onrender.com/api/candidate');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error al hacer la petición:', error);
    }
  };

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
              <Link to={`/details/${encodeURIComponent(candidate.email)}`}>
                {candidate.first_name} {candidate.last_name} - {candidate.email}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDashboard;