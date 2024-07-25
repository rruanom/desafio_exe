const statusModels = require('../models/status.models');
const { validationResult } = require('express-validator');

const createStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name_status } = req.body;

    if (!name_status) {
        return res.status(400).json({ error: 'El nombre del estado es requerido' });
    }

    try {
        const insertId = await statusModels.createStatus(name_status);
        res.status(201).json({ message: 'Estado creado exitosamente', id: insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el estado' });
    }
};

const getAllStatus = async (req, res) => {
    try {
        const allStatus = await statusModels.readAllStatus();
        res.status(200).json(allStatus);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los estados' });
    }
};

const deleteStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name_status } = req.body;

    try {
        const affectedRows = await statusModels.deleteStatus(name_status);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        res.status(200).json({ message: 'Estado eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el estado' });
    }
};

module.exports = {
    createStatus,
    getAllStatus,
    deleteStatus,
};

