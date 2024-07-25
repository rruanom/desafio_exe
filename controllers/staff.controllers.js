const staffModels = require('../models/staff.models');
const { validationResult } = require('express-validator');

const createStaff = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await staffModels.createStaff(first_name, last_name, email, password);
        if (result === 0) {
            return res.status(500).json({ error: 'Error al crear el miembro del personal' });
        }
        res.status(201).json({ message: 'Miembro Staff creado exitosamente'});
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el miembro del Staff' });
    }
};

const readStaff = async (req, res) => {
    try {
        const staff = await staffModels.readStaff();
        if (!staff) {
            return res.status(404).json({ error: 'Miembros del personal no encontrados' });
        }
        res.status(200).json(staff);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los miembros del personal' });
    }
};

const readStaffByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.params;

    try {
        const staff = await staffModels.readStaffByEmail(email);
        if (!staff) {
            return res.status(404).json({ error: 'Miembro del personal no encontrado' });
        }
        res.status(200).json(staff);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el miembro del personal' });
    }
};

const updateStaffbyStaff = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;

    if (!email || !first_name || !last_name || !password) {
        return res.status(400).json({ error: 'Los campos son requeridos' });
    }

    try {
        const result = await staffModels.updateStaffByStaff({ first_name, last_name, email, password });
        if (result === 0) {
            return res.status(404).json({ error: 'Miembro del Staff no encontrado' });
        }
        res.status(200).json({ message: 'Miembro del Staff actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el miembro del Staff' });
    }
};

const updateStaffbyAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.params
    const { id_role, active } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'El email es requerido para la actualización' });
    }

    try {
        const result = await staffModels.updateStaffByAdmin({ id_role, active, email });
        if (result === 0) {
            return res.status(404).json({ error: 'Miembro del personal no encontrado o no actualizado' });
        }
        res.status(200).json({ message: 'Miembro del personal actualizado exitosamente por el administrador' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el miembro del personal por el administrador' });
    }
};

module.exports = {
    createStaff,
    readStaff,
    readStaffByEmail,
    updateStaffbyStaff,
    updateStaffbyAdmin
};

