import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import GeneratePDF from "../GeneratedPDF/GeneratedPDF";


const Database = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage, setCandidatesPerPage] = useState(20);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('none');
  const [sortOrder, setSortOrder] = useState('none');
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    const fetchAllCandidates = async () => {
      try {
        const response = await fetch(`${API_URL}/candidate`);
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
  }, [searchTerm, allCandidates, candidatesPerPage]);

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

  const candidatesToDisplay = searchTerm ? searchResults : allCandidates;

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
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleRemoveSort = () => {
    setSortCriteria('none');
    setSortOrder('none');
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleCandidatesPerPageChange = (event) => {
    setCandidatesPerPage(parseInt(event.target.value));
  };

  const handleToggleActive = async (candidate) => {
    const newActiveStatus = candidate.active ? 0 : 1;
    try {
      const response = await fetch(`${API_URL}/candidate/${candidate.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ active: newActiveStatus })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setAllCandidates(prevCandidates =>
        prevCandidates.map(c =>
          c.email === candidate.email ? { ...c, active: newActiveStatus } : c
        )
      );
    } catch (error) {
      console.error('Error updating candidate active status', error);
    }
  };

  return (
    <div>
      <section className="sectionDatabase">
        <div className="searchDatabase">
          <input
            type="text"
            placeholder="Buscar candidato..."
            value={searchTerm}
            onChange={handleSearch}
            className="inputDatabase"
          />
          <p className="pSelect">Mostrando</p>
          <select
            value={candidatesPerPage}
            onChange={handleCandidatesPerPageChange}
            className="selectDatabase"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <p className="pNoFilter">Quitar filtros</p>
          <button className="btnNoFilter" onClick={handleRemoveSort}>
            <img src={"/nofilterDatabase.png"} alt="Quitar filtro" className="nofilterDatabaseIcon" />
          </button>
        </div>
        <article className="headDatabase">
          <div className="divDatabase3">
            <p className="titleDatabaseId">#ID</p>
          </div>
          <div className="divDatabase">
            <button className="btnfilterName" onClick={() => handleSortCriteria('name')}>
              <img src={"/filterDatabase.png"} alt="Ordenar por Nombre" className="filterDatabaseIcon" />
            </button>
            <p className="titleDatabase">Nombre</p>
          </div>
          <div className="divDatabase">
            <button className="btnfilterEmail" onClick={() => handleSortCriteria('email')}>
              <img src={"/filterDatabase.png"} alt="Ordenar por Email" className="filterDatabaseIcon" />
            </button>
            <p className="titleDatabase">Email</p>
          </div>
          <div className="divDatabase2">
            <button className="btnfilterReg" onClick={() => handleSortCriteria('registration_date')}>
              <img src={"/filterDatabase.png"} alt="Ordenar por Registro" className="filterDatabaseIcon" />
            </button>
            <p className="titleDatabase">Registro</p>
          </div>
          <div className="divDatabase2">
            <button className="btnfilterPhase" onClick={() => handleSortCriteria('phase')}>
              <img src={"/filterDatabase.png"} alt="Ordenar por Fase" className="filterDatabaseIcon" />
            </button>
            <p className="titleDatabase">Fase</p>
          </div>
          <div className="divDatabase2">
            <button className="btnfilterState" onClick={() => handleSortCriteria('status')}>
              <img src={"/filterDatabase.png"} alt="Ordenar por Estado" className="filterDatabaseIcon" />
            </button>
            <p className="titleDatabase">Estado</p>
          </div>
          <div className="divDatabase2">
            <p className="titleActions">Acciones</p>
          </div>
        </article>
        {currentCandidates.length > 0 ? (
          currentCandidates.map(candidate => (
            <article className="cardDatabase" key={candidate.id_candidate}>
              <div className="divDatabase3">
                <p className="pDatabase">#{candidate.id_candidate}</p>
              </div>
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
                <p className="pDatabase">{candidate.active ? 'Activo' : 'No Activo'}</p>
              </div>
              <div className="divActions">
                <Link to={`/details/${candidate.email}`} className="details-button">
                    <button className="btnDatabase">
                      <img className="iconEye" src={"/eye.png"} alt="eye" />
                    </button>
                </Link>
                <div>
                <GeneratePDF Email={candidate.email} />
                </div>
                <div>
                  <button className="btnDatabase" onClick={() => handleToggleActive(candidate)}>
                    <img className="iconActivate" src={candidate.active ? "/on.png" : "/off.png"} alt="toggle active" />
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p>No hay candidatos que mostrar.</p>
        )}
      </section>
      <div className="divPage">
        <button className="btnPage" onClick={handlePrevPage} disabled={currentPage === 1}>
          <img className="iconPrev" src={"/flechaizquierda.png"} alt="izquierda" />
        </button>
        <span> Página {currentPage} de {totalPages} </span>
        <button className="btnPage" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <img className="iconNext" src={"/flechaderecha.png"} alt="derecha" />
        </button>
      </div>
    </div>
  );
};

export default Database;