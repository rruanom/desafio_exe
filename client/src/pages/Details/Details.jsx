import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Grades from '../../components/Grades';
import Profile from '../../components/Profile';

const Details = () => {
  const [candidate, setCandidate] = useState(null);
  const [grades, setGrades] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [showGrades, setShowGrades] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { email } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidateResponse, gradesResponse, assessmentsResponse] = await Promise.all([
          axios.get(`https://desafio-exe.onrender.com/api/candidate/${email}`),
          axios.get(`https://desafio-exe.onrender.com/api/grades/${email}`),
          axios.get('https://desafio-exe.onrender.com/api/assessment')
        ]);
        setCandidate(candidateResponse.data);
        setGrades(gradesResponse.data);
        setAssessments(assessmentsResponse.data);
      } catch (error) {
        console.error('Error al hacer las peticiones:', error);
      }
    };
    fetchData();
  }, [email]);

  const getDaysSinceLastAssessment = () => {
    if (grades.length === 0) return null;
    const lastAssessmentDate = new Date(Math.max(...grades.map(g => new Date(g.assessment_date))));
    const today = new Date();
    const diffTime = Math.abs(today - lastAssessmentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!candidate) return 'Cargando...';

  const daysSinceLastAssessment = getDaysSinceLastAssessment();

  return (
    <div className="details-container">
      <Card className="details-card">
        <CardContent>
          <h2>
            {candidate.first_name} {candidate.last_name}
          </h2>
          <p>
            Fecha de registro: {new Date(candidate.registration_date).toLocaleDateString()}
          </p>
          {daysSinceLastAssessment !== null && (
            <p>
              Días desde la última evaluación: {daysSinceLastAssessment}
            </p>
          )}
        </CardContent>
        <CardActions className="card-actions">
          <Button onClick={() => setShowGrades(!showGrades)} className="button-grades">
            {showGrades ? 'Ocultar Notas' : 'Notas'}
          </Button>
          <Button onClick={() => setShowProfile(!showProfile)} className="button-profile">
            {showProfile ? 'Ocultar Perfil' : 'Perfil'}
          </Button>
        </CardActions>
        {showGrades && <Grades grades={grades} assessments={assessments} candidateName={`${candidate.first_name} ${candidate.last_name}`} />}
        {showProfile && <Profile candidate={candidate} />}
      </Card>
    </div>
  );
};

export default Details;

// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Card, CardContent, CardActions, Button, Typography, Modal } from '@mui/material';
// import Grades from '../../components/Grades';
// import Profile from '../../components/Profile';

// const Details = () => {
//   const [candidate, setCandidate] = useState(null);
//   const [grades, setGrades] = useState([]);
//   const [assessments, setAssessments] = useState([]);
//   const [showGrades, setShowGrades] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const { email } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [candidateResponse, gradesResponse, assessmentsResponse] = await Promise.all([
//           axios.get(`https://desafio-exe.onrender.com/api/candidate/${email}`),
//           axios.get(`https://desafio-exe.onrender.com/api/grades/${email}`),
//           axios.get('https://desafio-exe.onrender.com/api/assessment')
//         ]);
//         setCandidate(candidateResponse.data);
//         setGrades(gradesResponse.data);
//         setAssessments(assessmentsResponse.data);
//       } catch (error) {
//         console.error('Error al hacer las peticiones:', error);
//       }
//     };
//     fetchData();
//   }, [email]);

//   const getDaysSinceLastAssessment = () => {
//     if (grades.length === 0) return null;
//     const lastAssessmentDate = new Date(Math.max(...grades.map(g => new Date(g.assessment_date))));
//     const today = new Date();
//     const diffTime = Math.abs(today - lastAssessmentDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   if (!candidate) return <Typography>Cargando...</Typography>;

//   const daysSinceLastAssessment = getDaysSinceLastAssessment();

//   return (
//     <div className="details-container">
//       <Card className="details-card">
//         <CardContent>
//           <Typography variant="h5" component="div">
//             {candidate.first_name} {candidate.last_name}
//           </Typography>
//           <Typography color="text.secondary">
//             Fecha de registro: {new Date(candidate.registration_date).toLocaleDateString()}
//           </Typography>
//           {daysSinceLastAssessment && (
//             <Typography color="text.secondary">
//               Días desde la última evaluación: {daysSinceLastAssessment}
//             </Typography>
//           )}
//         </CardContent>
//         <CardActions className="card-actions">
//           <Button
//             className="button-grades"
//             onClick={() => setShowGrades(!showGrades)}
//           >
//             {showGrades ? 'Ocultar Notas' : 'Notas'}
//           </Button>
//           <Button
//             className="button-profile"
//             onClick={() => setShowProfile(true)}
//           >
//             Perfil
//           </Button>
//         </CardActions>
//         {showGrades && <Grades grades={grades} assessments={assessments} candidateName={`${candidate.first_name} ${candidate.last_name}`} />}
//         <Modal
//           open={showProfile}
//           onClose={() => setShowProfile(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <div className="modal-content">
//             <Profile candidate={candidate} />
//           </div>
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default Details;

