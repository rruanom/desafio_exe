import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchDashboard from "../../components/SearchDashboard/SearchDashboard";
import Redirector from '../../components/Redirector';
import Overview from '../../components/Overview';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidatesResponse, statusesResponse] = await Promise.all([
          axios.get(`${API_URL}/candidate`),
          axios.get(`${API_URL}/status`)
        ]);

        setCandidates(candidatesResponse.data);
        setStatuses(statusesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al hacer la petición:', err);
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const totalCandidates = candidates.length;
  const newCandidatesLastWeek = candidates.filter(
    c => new Date(c.registration_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  const offeredCandidates = candidates.filter(c => c.name_status === 'Ofertado').length;
  const offeredPercentage = (offeredCandidates / totalCandidates * 100).toFixed(2);
  const status2AndMoreCandidates = candidates.filter(c => ['Solicitud', 'CentroEvaluacion', 'Entrevista1', 'Entrevista2', 'Ofertado'].includes(c.name_status)).length;
  const status2AndMorePercentage = (status2AndMoreCandidates / totalCandidates * 100).toFixed(2);

  return (
    <section className="dashboard">
      <article>
        <SearchDashboard candidates={candidates} />
        <Redirector />
        <Overview 
          totalCandidates={totalCandidates}
          newCandidatesLastWeek={newCandidatesLastWeek}
          offeredPercentage={offeredPercentage}
          status2AndMorePercentage={status2AndMorePercentage}
        />
      </article>
    </section>
  );
};

export default Dashboard;
