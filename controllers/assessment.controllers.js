const assessmentModels = require('../models/assessment.models');

const createAssessment = async (req, res) => {
    const { name_assessment } = req.body;

    if (!nombre_eval) {
        return res.status(400).json({ error: 'El nombre de la evaluación es requerido' });
    }

    try {
        const insertId = await assessmentModels.createAssessment(name_assessment);
        res.status(201).json({ message: 'Evaluación creada exitosamente', id: insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la evaluación' });
    }
};

const getAllAssessment = async (req, res) => {
    try {
        const assessments = await assessmentModels.readAllAssessment();
        res.status(200).json(assessments);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las evaluaciones' });
    }
};

const deleteAssessment = async (req, res) => {
    const { id_assessment } = req.params;

    try {
        const affectedRows = await assessmentModels.deleteAssessment(id_assessment);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Evaluación no encontrada' });
        }
        res.status(200).json({ message: 'Evaluación eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la evaluación' });
    }
};

module.exports = {
    createAssessment,
    getAllAssessment,
    deleteAssessment,
};