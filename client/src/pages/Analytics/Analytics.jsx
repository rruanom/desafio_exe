import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import Chart from 'chart.js/auto';

const Analytics = () => {
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

  // Nuevos refs y states para el nuevo gráfico
  const newChartRef = useRef(null);
  const newChartInstanceRef = useRef(null);
  const [newChartData, setNewChartData] = useState({ labels: [], data: [] });

  const [polarAreaData, setPolarAreaData] = useState({ labels: [], data: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], data: [] });
  const [pieChartAcademicData, setPieChartAcademicData] = useState({ labels: [], data: [] });
  const [pieChartNivelInglesData, setPieChartNivelInglesData] = useState({ labels: [], data: [] });
  const [barChartData, setBarChartData] = useState({ labels: [], data: [] });
  const [radarChartData1, setRadarChartData1] = useState({ labels: [], data: [] });
  const [radarChartData2, setRadarChartData2] = useState({ labels: [], data: [] });
  const [radarChartData3, setRadarChartData3] = useState({ labels: [], data: [] });
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await axios.get(url);
        const dataFetch = response.data;
        if (!dataFetch.labels || !dataFetch.values) {
          throw new Error('Unexpected data format');
        }
        setData({ labels: dataFetch.labels, data: dataFetch.values });
      } catch (error) {
        console.error('Error fetching chart data:', error.message);
        setError(error.message);
      }
    };

    fetchData('https://apis-4945.onrender.com/status', setPolarAreaData);
    fetchData('https://apis-4945.onrender.com/generos', setPieChartData);
    fetchData('https://apis-4945.onrender.com/academic', setPieChartAcademicData);
    fetchData('https://apis-4945.onrender.com/nivel-ingles', setPieChartNivelInglesData);
    fetchData('https://apis-4945.onrender.com/registros', setBarChartData);
    fetchData('https://apis-4945.onrender.com/notas-evalgrupal', setRadarChartData1);
    fetchData('https://apis-4945.onrender.com/notas-eval1', setRadarChartData2);
    fetchData('https://apis-4945.onrender.com/notas-eval2', setRadarChartData3);
    fetchData('https://apis-4945.onrender.com/reclutadores', setNewChartData); // Nuevo gráfico
  }, []);

  useEffect(() => {
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

    if (polarAreaChartInstanceRef.current) {
      polarAreaChartInstanceRef.current.destroy();
    }
    if (pieChartInstanceRef.current) {
      pieChartInstanceRef.current.destroy();
    }
    if (pieChartAcademicInstanceRef.current) {
      pieChartAcademicInstanceRef.current.destroy();
    }
    if (pieChartNivelInglesInstanceRef.current) {
      pieChartNivelInglesInstanceRef.current.destroy();
    }
    if (barChartInstanceRef.current) {
      barChartInstanceRef.current.destroy();
    }
    if (radarChartInstanceRef1.current) {
      radarChartInstanceRef1.current.destroy();
    }
    if (radarChartInstanceRef2.current) {
      radarChartInstanceRef2.current.destroy();
    }
    if (radarChartInstanceRef3.current) {
      radarChartInstanceRef3.current.destroy();
    }
    if (newChartInstanceRef.current) {
      newChartInstanceRef.current.destroy();
    }

    if (polarAreaRef.current) {
      const ctxPolarArea = polarAreaRef.current.getContext('2d');
      polarAreaChartInstanceRef.current = createPolarAreaChart(ctxPolarArea, polarAreaData);
    }

    if (pieChartRef.current) {
      const ctxPieChart = pieChartRef.current.getContext('2d');
      pieChartInstanceRef.current = createPieChart(ctxPieChart, pieChartData);
    }

    if (pieChartAcademicRef.current) {
      const ctxPieChartAcademic = pieChartAcademicRef.current.getContext('2d');
      pieChartAcademicInstanceRef.current = createPieChart(ctxPieChartAcademic, pieChartAcademicData);
    }

    if (pieChartNivelInglesRef.current) {
      const ctxPieChartNivelIngles = pieChartNivelInglesRef.current.getContext('2d');
      pieChartNivelInglesInstanceRef.current = createPieChart(ctxPieChartNivelIngles, pieChartNivelInglesData);
    }

    if (barChartRef.current) {
      const ctxBarChart = barChartRef.current.getContext('2d');
      barChartInstanceRef.current = createBarChart(ctxBarChart, barChartData);
    }

    if (radarChartRef1.current) {
      const ctxRadarChart1 = radarChartRef1.current.getContext('2d');
      radarChartInstanceRef1.current = createRadarChart(ctxRadarChart1, radarChartData1, '#1F2421', 'Evaluación Grupal');
    }

    if (radarChartRef2.current) {
      const ctxRadarChart2 = radarChartRef2.current.getContext('2d');
      radarChartInstanceRef2.current = createRadarChart(ctxRadarChart2, radarChartData2, '#204A45', 'Evaluación 1');
    }

    if (radarChartRef3.current) {
      const ctxRadarChart3 = radarChartRef3.current.getContext('2d');
      radarChartInstanceRef3.current = createRadarChart(ctxRadarChart3, radarChartData3, '#216869', 'Evaluación 2');
    }

    if (newChartRef.current) {
      const ctxNewChart = newChartRef.current.getContext('2d');
      newChartInstanceRef.current = createPolarAreaChart(ctxNewChart, newChartData); // Puedes usar otro tipo de gráfico si prefieres
    }

    return () => {
      if (polarAreaChartInstanceRef.current) {
        polarAreaChartInstanceRef.current.destroy();
      }
      if (pieChartInstanceRef.current) {
        pieChartInstanceRef.current.destroy();
      }
      if (pieChartAcademicInstanceRef.current) {
        pieChartAcademicInstanceRef.current.destroy();
      }
      if (pieChartNivelInglesInstanceRef.current) {
        pieChartNivelInglesInstanceRef.current.destroy();
      }
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
      }
      if (radarChartInstanceRef1.current) {
        radarChartInstanceRef1.current.destroy();
      }
      if (radarChartInstanceRef2.current) {
        radarChartInstanceRef2.current.destroy();
      }
      if (radarChartInstanceRef3.current) {
        radarChartInstanceRef3.current.destroy();
      }
      if (newChartInstanceRef.current) {
        newChartInstanceRef.current.destroy();
      }
    };
  }, [polarAreaData, pieChartData, pieChartAcademicData, pieChartNivelInglesData, barChartData, radarChartData1, radarChartData2, radarChartData3, newChartData]);

  return (
    <>
    <div className="divChart3">
      <section className="sectionAnalyticsInd">
      <span className="spanTitleAnalytics">
          <h2 className="titleAnalytics">Géneros</h2>
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
          <h2 className="titleAnalytics">Nivel de Educación</h2>
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
          <h2 className="titleAnalytics">Nivel de Inglés</h2>
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
      <section className="sectionAnalytics">
        <span className="spanTitleAnalytics">
          <h2 className="titleAnalytics">Calificaciones Medias</h2>
        </span>
        <div className="divGrafica">
          <article className="canvasContainer">
          <h3 className="titleChartRadar">Evaluación Grupal</h3>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <canvas ref={radarChartRef1} style={{ width: '100%', height: '400px' }}></canvas>
          </article>
          <article className="canvasContainer">
          <h3 className="titleChartRadar">Evaluación Final 1</h3>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <canvas ref={radarChartRef2} style={{ width: '100%', height: '400px' }}></canvas>
          </article>
          <article className="canvasContainer">
          <h3 className="titleChartRadar">Evaluación Final 2</h3>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <canvas ref={radarChartRef3} style={{ width: '100%', height: '400px' }}></canvas>
          </article>
        </div>
      </section>
    </>
  );
};

export default Analytics;
