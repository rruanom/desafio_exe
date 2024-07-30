import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';

const SearchDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [value, setValue] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${API_URL}/candidate`);
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error al hacer la petición:', error);
    }
  };

  return (
    <div className="search-dashboard">
      <Autocomplete
        options={candidates}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name} - ${option.email}`}
        renderInput={(params) => <TextField {...params} label="Buscar candidato" />}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        clearOnEscape
        renderOption={(props, option) => (
          <li {...props}>
            <Link 
              to={`/details/${encodeURIComponent(option.email)}`}
              className="candidate-link" 
            >
              {option.first_name} {option.last_name}
            </Link>
          </li>
        )}
      />
    </div>
  );
};

export default SearchDashboard;