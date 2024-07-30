import React, { useRef, useEffect, useState, useCallback } from "react";
import axios from 'axios';
import Chart from 'chart.js/auto';

const Analytics = () => {
  const [candidates, setCandidates] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const polarAreaRef = useRef(null);
  const polarAreaChartInstanceRef = useRef(null);
  const pieChartRef = useRef(null);
  const pieChartInstanceRef = useRef(null);
  const pieChartAcademicRef = useRef(null);
  const pieChartAcademicInstanceRef = useRef(null);
  const pieChartNivelInglesRef = useRef(null);
  const pieChartNivelInglesInstanceRef = useRef(null);
  const barChartRef = useRef(null);
  const barChartInstanceRef = useRef(null);
  const radarChartRef1 = useRef(null);
  const radarChartInstanceRef1 = useRef(null);
  const radarChartRef2 = useRef(null);
  const radarChartInstanceRef2 = useRef(null);
  const radarChartRef3 = useRef(null);
  const radarChartInstanceRef3 = useRef(null);
  const newChartRef = useRef(null);
  const newChartInstanceRef = useRef(null);

  const [allChartData, setAllChartData] = useState({
    polarAreaData: { labels: [], data: [] },
    pieChartData: { labels: [], data: [] },
    pieChartAcademicData: { labels: [], data: [] },
    pieChartNivelInglesData: { labels: [], data: [] },
    barChartData: { labels: [], data: [] },
    radarChartData1: { labels: [], data: [] },
    radarChartData2: { labels: [], data: [] },
    radarChartData3: { labels: [], data: [] },
    newChartData: { labels: [], data: [] },
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidatesData = async () => {
      try {
        const [candidatesResponse, statusesResponse] = await Promise.all([
          axios.get('https://desafio-exe.onrender.com/api/candidate'),
          axios.get('https://desafio-exe.onrender.com/api/status')
        ]);

        setCandidates(candidatesResponse.data);
        setStatuses(statusesResponse.data);
      } catch (err) {
        console.error('Error al hacer la petición:', err);
        setError(err.message);
      }
    };

    fetchCandidatesData();
  }, []);

  const fetchAllData = useCallback(async () => {
    const urls = [
      'https://apis-4945.onrender.com/status',
      'https://apis-4945.onrender.com/generos',
      'https://apis-4945.onrender.com/academic',
      'https://apis-4945.onrender.com/nivel-ingles',
      'https://apis-4945.onrender.com/registros',
      'https://apis-4945.onrender.com/notas-evalgrupal',
      'https://apis-4945.onrender.com/notas-eval1',
      'https://apis-4945.onrender.com/notas-eval2',
      'https://apis-4945.onrender.com/reclutadores',
    ];

    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      const [
        statusData,
        generosData,
        academicData,
        nivelInglesData,
        registrosData,
        notasEvalgroupalData,
        notasEval1Data,
        notasEval2Data,
        reclutadoresData,
      ] = responses.map(response => response.data);

      setAllChartData({
        polarAreaData: { labels: statusData.labels, data: statusData.values },
        pieChartData: { labels: generosData.labels, data: generosData.values },
        pieChartAcademicData: { labels: academicData.labels, data: academicData.values },
        pieChartNivelInglesData: { labels: nivelInglesData.labels, data: nivelInglesData.values },
        barChartData: { labels: registrosData.labels, data: registrosData.values },
        radarChartData1: { labels: notasEvalgroupalData.labels, data: notasEvalgroupalData.values },
        radarChartData2: { labels: notasEval1Data.labels, data: notasEval1Data.values },
        radarChartData3: { labels: notasEval2Data.labels, data: notasEval2Data.values },
        newChartData: { labels: reclutadoresData.labels, data: reclutadoresData.values },
      });
    } catch (error) {
      console.error('Error fetching chart data:', error.message);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const totalCandidates = candidates.length;
  const newCandidatesLastWeek = candidates.filter(
    c => new Date(c.registration_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  const offeredCandidates = candidates.filter(c => c.name_status === 'Ofertado').length;
  const offeredPercentage = (offeredCandidates / totalCandidates * 100).toFixed(2);
  const status2AndMoreCandidates = candidates.filter(c => ['Solicitud', 'CentroEvaluacion', 'Entrevista1', 'Entrevista2', 'Ofertado'].includes(c.name_status)).length;
  const status2AndMorePercentage = (status2AndMoreCandidates / totalCandidates * 100).toFixed(2);

  const createRadarChart = (ctx, data, color, title) => {
    return new Chart(ctx, {
      type: 'radar',
      data: {
        labels: data.labels,
        datasets: [{
          label: title,
          data: data.data,
          backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`,
          borderColor: color,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'none',
            labels: {
              font: {
                size: 10
              },
              boxWidth: 10,
              boxHeight: 10
            }
          }
        }
      }
    });
  };

  const createPieChart = (ctx, data) => {
    return new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
          backgroundColor: [
            'rgba(31, 36, 33, 0.5)',
            'rgba(32, 74, 69, 0.5)',
            'rgba(33, 104, 105, 0.5)',
            'rgba(58, 140, 115, 0.5)',
            'rgba(73, 160, 120, 0.5)'
          ],
          borderColor: [
            'rgba(31, 36, 33, 1)',
            'rgba(32, 74, 69, 1)',
            'rgba(33, 104, 105, 1)',
            'rgba(58, 140, 115, 1)',
            'rgba(73, 160, 120, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 10
              },
              boxWidth: 10,
              boxHeight: 10,
            },
          }
        }
      }
    });
  };

  const createBarChart = (ctx, data) => {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Registros',
          data: data.data,
          backgroundColor: 'rgba(58, 140, 115, 0.5)',
          borderColor: 'rgba(58, 140, 115, 1)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'none',
            labels: {
              font: {
                size: 10
              },
              boxWidth: 10,
              boxHeight: 10
            }
          }
        }
      }
    });
  };

  const createPolarAreaChart = (ctx, data) => {
    return new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: data.labels,
        datasets: [{
          label: '# de Status',
          data: data.data,
          backgroundColor: [
            'rgba(31, 36, 33, 0.5)',
            'rgba(32, 74, 69, 0.5)',
            'rgba(33, 104, 105, 0.5)',
            'rgba(58, 140, 115, 0.5)',
            'rgba(73, 160, 120, 0.5)',
            'rgba(119, 178, 144, 0.5)',
            'rgba(156, 197, 161, 0.5)',
            'rgba(190, 209, 186, 0.5)',
            'rgba(220, 225, 222, 0.5)'
          ],
          borderColor: [
            'rgba(31, 36, 33, 1)',
            'rgba(32, 74, 69, 1)',
            'rgba(33, 104, 105, 1)',
            'rgba(58, 140, 115, 1)',
            'rgba(73, 160, 120, 1)',
            'rgba(119, 178, 144, 1)',
            'rgba(156, 197, 161, 1)',
            'rgba(190, 209, 186, 1)',
            'rgba(220, 225, 222, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 10
              },
              boxWidth: 10,
              boxHeight: 10
            }
          }
        }
      }
    });
  };

  const createChart = useCallback((ref, instanceRef, data, createFunction, ...args) => {
    if (ref.current && data.labels.length > 0) {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
      const ctx = ref.current.getContext('2d');
      instanceRef.current = createFunction(ctx, data, ...args);
    }
  }, []);

  useEffect(() => {
    createChart(polarAreaRef, polarAreaChartInstanceRef, allChartData.polarAreaData, createPolarAreaChart);
    createChart(pieChartRef, pieChartInstanceRef, allChartData.pieChartData, createPieChart);
    createChart(pieChartAcademicRef, pieChartAcademicInstanceRef, allChartData.pieChartAcademicData, createPieChart);
    createChart(pieChartNivelInglesRef, pieChartNivelInglesInstanceRef, allChartData.pieChartNivelInglesData, createPieChart);
    createChart(barChartRef, barChartInstanceRef, allChartData.barChartData, createBarChart);
    createChart(radarChartRef1, radarChartInstanceRef1, allChartData.radarChartData1, createRadarChart, '#1F2421', 'Evaluación Grupal');
    createChart(radarChartRef2, radarChartInstanceRef2, allChartData.radarChartData2, createRadarChart, '#204A45', 'Evaluación 1');
    createChart(radarChartRef3, radarChartInstanceRef3, allChartData.radarChartData3, createRadarChart, '#216869', 'Evaluación 2');
    createChart(newChartRef, newChartInstanceRef, allChartData.newChartData, createPolarAreaChart);

    return () => {
      [polarAreaChartInstanceRef, pieChartInstanceRef, pieChartAcademicInstanceRef, pieChartNivelInglesInstanceRef, 
       barChartInstanceRef, radarChartInstanceRef1, radarChartInstanceRef2, radarChartInstanceRef3, newChartInstanceRef]
        .forEach(ref => {
          if (ref.current) {
            ref.current.destroy();
          }
        });
    };
  }, [allChartData, createChart]);
  
    return (
      <>
        <div className="divChart4">
          <section className="sectionAnalyticsIntro">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Total de Candidatos</h2>
            </span>
            <p className="titleTop">{totalCandidates}</p>
          </section>
          <section className="sectionAnalyticsIntro">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Nuevos Candidatos (semana)</h2>
            </span>
            <p className="titleTop">{newCandidatesLastWeek}</p>
          </section>
          <section className="sectionAnalyticsIntro">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">1er Filtro Superado</h2>
            </span>
            <p className="titleTop">{status2AndMorePercentage}%</p>
          </section>
          <section className="sectionAnalyticsIntro2">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Candidatos Ofertados</h2>
            </span>
            <p className="titleTop">{offeredPercentage}%</p>
          </section>
        </div>
        <div className="divChart3">
          <section className="sectionAnalyticsInd">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Candidatos por Género</h2>
            </span>
            <div className="divGrafica">
              <article className="canvasContainerPie">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <canvas ref={pieChartRef} style={{ width: '100%', height: '400px' }}></canvas>
              </article>
            </div>
          </section>
          <section className="sectionAnalyticsInd">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Candidatos por Nivel de Educación</h2>
            </span>
            <div className="divGrafica">
              <article className="canvasContainerPie2">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <canvas ref={pieChartAcademicRef} style={{ width: '100%', height: '400px' }}></canvas>
              </article>
            </div>
          </section>
          <section className="sectionAnalyticsInd2">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Candidatos por Nivel de Inglés</h2>
            </span>
            <div className="divGrafica">
              <article className="canvasContainerPie">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <canvas ref={pieChartNivelInglesRef} style={{ width: '100%', height: '400px' }}></canvas>
              </article>
            </div>
          </section>
        </div>
        <div className="divBarPolar">
          <section className="sectionAnalytics2">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Cantidatos nuevos por Mes</h2>
            </span>
            <div className="divGraficaBar">
              <article className="canvasContainerBar">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <canvas ref={barChartRef} style={{ width: '100%', height: '400px', flex: '1' }}></canvas>
              </article>
            </div>
          </section>
          <section className="sectionAnalyticsInd2">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Status por Candidatos Activos</h2>
            </span>
            <div className="divGrafica">
              <article className="canvasContainerPolar">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <canvas ref={polarAreaRef} style={{ width: '100%', height: '400px' }}></canvas>
              </article>
            </div>
          </section>
        </div>
        <div className="divChart3">
          <section className="sectionAnalyticsInd">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Calificaciones - Evaluación Grupal</h2>
            </span>
            <div className="divGrafica">
              <article className="canvasContainer">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <canvas ref={radarChartRef1} style={{ width: '100%', height: '400px' }}></canvas>
              </article>
            </div>
          </section>
          <section className="sectionAnalyticsInd">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Calificaciones - Evaluación Final 1</h2>
            </span>
            <div className="divGrafica">
              <article className="canvasContainer">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <canvas ref={radarChartRef2} style={{ width: '100%', height: '400px' }}></canvas>
              </article>
            </div>
          </section>
          <section className="sectionAnalyticsInd2">
            <span className="spanTitleAnalytics">
              <h2 className="titleAnalytics">Calificaciones - Evaluación Final 2</h2>
            </span>
            <div className="divGrafica">
              <article className="canvasContainer">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <canvas ref={radarChartRef3} style={{ width: '100%', height: '400px' }}></canvas>
              </article>
            </div>
          </section>
        </div>
      </>
    );
  };
  
  export default Analytics;