import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import filterDatabase from '/filterDatabase.png'; // Importa la imagen para el filtro
import nofilterDatabase from '/nofilterDatabase.png'; // Importa la imagen para quitar el filtro

const Database = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 20;
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('none'); // 'none', 'name', 'email', 'registration_date', 'phase', 'status'
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'

  useEffect(() => {
    const fetchAllCandidates = async () => {
      try {
        const response = await fetch('https://desafio-exe.onrender.com/api/candidate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const candidates = await response.json();
        setAllCandidates(candidates);
      } catch (error) {
        console.error('Fetch error in fetching all candidates', error);
      }
    };

    fetchAllCandidates();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, allCandidates]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredCandidates = allCandidates.filter(candidate =>
      candidate.first_name.toLowerCase().includes(term) ||
      candidate.last_name.toLowerCase().includes(term) ||
      candidate.email.toLowerCase().includes(term)
    );

    setSearchResults(filteredCandidates);
  };

  // Determine which candidates to display based on search term
  const candidatesToDisplay = searchTerm ? searchResults : allCandidates;

  // Apply sorting
  const sortedCandidates = [...candidatesToDisplay].sort((a, b) => {
    if (sortOrder === 'none') return 0;

    let valueA, valueB;

    switch (sortCriteria) {
      case 'name':
        valueA = `${a.first_name} ${a.last_name}`.toLowerCase();
        valueB = `${b.first_name} ${b.last_name}`.toLowerCase();
        break;
      case 'email':
        valueA = a.email.toLowerCase();
        valueB = b.email.toLowerCase();
        break;
      case 'registration_date':
        valueA = new Date(a.registration_date).getTime();
        valueB = new Date(b.registration_date).getTime();
        break;
      case 'phase':
        valueA = a.name_status.toLowerCase();
        valueB = b.name_status.toLowerCase();
        break;
      case 'status':
        valueA = a.active ? 1 : 0;
        valueB = b.active ? 1 : 0;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else if (sortOrder === 'desc') {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }

    return 0;
  });

  // Logic for pagination
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = sortedCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const totalPages = Math.ceil(sortedCandidates.length / candidatesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSortCriteria = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order if same criteria
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc'); // Default to ascending order when criteria changes
    }
    setCurrentPage(1); // Reset to first page when sorting criteria changes
  };

  const handleRemoveSort = () => {
    setSortCriteria('none');
    setSortOrder('none');
    setCurrentPage(1); // Reset to first page when sorting is removed
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div>
      <div className="searchDatabase">
        <input
          type="text"
          placeholder="Buscar candidato..."
          value={searchTerm}
          onChange={handleSearch}
          className="inputDatabase"
        />
      </div>
      {candidatesToDisplay.length > 0 ? (
        <>
          <section className="sectionDatabase">
            <article className="headDatabase">
              <div className="divDatabase">
                <button className="btnfilter" onClick={() => handleSortCriteria('name')}>
                  <img src={filterDatabase} alt="Ordenar por Nombre" className="filterDatabaseIcon" />
                </button>
                <p className="titleDatabase">NOMBRE</p>
              </div>
              <div className="divDatabase">
                <button className="btnfilter" onClick={() => handleSortCriteria('email')}>
                  <img src={filterDatabase} alt="Ordenar por Email" className="filterDatabaseIcon" />
                </button>
                <p className="titleDatabase">EMAIL</p>
              </div>
              <div className="divDatabase2">
                <button className="btnfilter" onClick={() => handleSortCriteria('registration_date')}>
                  <img src={filterDatabase} alt="Ordenar por Registro" className="filterDatabaseIcon" />
                </button>
                  <p className="titleDatabase">REGISTRO</p>
              </div>
              <div className="divDatabase2">
                <button className="btnfilter" onClick={() => handleSortCriteria('phase')}>
                  <img src={filterDatabase} alt="Ordenar por Fase" className="filterDatabaseIcon" />
                </button>
                  <p className="titleDatabase">FASE</p>
              </div>
              <div className="divDatabase2">
                <button className="btnfilter" onClick={() => handleSortCriteria('status')}>
                  <img src={filterDatabase} alt="Ordenar por Estado" className="filterDatabaseIcon" />
                </button>
                  <p className="titleDatabase">ESTADO</p>
              </div>
              <div className="divDatabase2">
                  <p className="titleDatabase">DETALLES</p>
              </div>
              <button className="btnfilter" onClick={handleRemoveSort}>
                    <img src={nofilterDatabase} alt="Quitar filtro" className="nofilterDatabaseIcon" />
                  </button>
            </article>
            {currentCandidates.map(candidate => (
              <article className="cardDatabase" key={candidate.id_candidate}>
                <div className="divDatabase">
                  <p className="pDatabase">{candidate.first_name} {candidate.last_name}</p>
                </div>
                <div className="divDatabase">
                  <p className="pDatabase">{candidate.email}</p>
                </div>
                <div className="divDatabase2">
                  <p className="pDatabase">{formatDate(candidate.registration_date)}</p>
                </div>
                <div className="divDatabase2">
                  <p className="pDatabase">{candidate.name_status}</p>
                </div>
                <div className="divDatabase2">
                  <p className="pDatabase">{candidate.active ? <p>Activo</p> : <p>No Activo</p>}</p>
                </div>
                <Link to={`/details/${candidate.email}`} className="details-button">
                  <div className="divDatabase2">
                    <button className="btnDatabase">Ver detalles</button>
                  </div>
                </Link>
              </article>
            ))}
          </section>
          <div>
            <button className="btnPage" onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button className="btnPage" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No hay candidatos que mostrar.</p>
      )}
    </div>
  );
};

export default Database;
