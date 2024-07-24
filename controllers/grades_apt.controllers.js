const gradesModels = require('../models/grades_apt.models');

const createGrades = async (req, res) => {
    const { id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback } = req.body;

    if (!id_candidate || !professionality || !domain || !resilience || !social_hab || !leadership || !collaboration || !commitment || !initiative || !id_assessment || !id_staff || !feedback) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await gradesModels.createGrades(id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback);
        if (result === 0) {
            return res.status(500).json({ error: 'Error al crear las notas' });
        }
        res.status(201).json({ message: 'Notas creadas exitosamente'});
    } catch (err) {
        res.status(500).json({ error: 'Error al crear las notas' });
    }
};

const readGrades = async (req, res) => {
    try {
        const grades = await gradesModels.readGrades();
        if (!grades) {
            return res.status(404).json({ error: 'Candidatos no cuentan con notas' });
        }
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las notas de los candidatos' });
    }
};

const readGradesByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const grades = await gradesModels.readGradesByEmail(email);
        if (!grades) {
            return res.status(404).json({ error: 'Candidato no cuenta con notas' });
        }
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las notas del candidato' });
    }
};

const updateGradebyAdmin = async (req, res) => {
    const { id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback } = req.body;

    if ( !id_candidate || !professionality || !domain || !resilience || !social_hab || !leadership || !collaboration || !commitment || !initiative || !id_assessment || !id_staff || !feedback) {
        return res.status(400).json({ error: 'Los campos son requeridos' });
    }

    try {
        const result = await gradesModels.updateGradesByAdmin({ id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback });
        if (result === 0) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json({ message: 'Notas de candidato actualizadas correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar las notas del candidato' });
    }
};

const deleteGrades = async (req, res) => {
    const { email } = req.params;

    try {
        const grades = await gradesModels.deleteGrades(email);
        if (!grades) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json({ message: 'Notas de candidato eliminadas exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al borrar las notas el candidato' });
    }
};

module.exports = {
    createGrades,
    readGrades,
    readGradesByEmail,
    updateGradebyAdmin,
    deleteGrades
};

