const formModel = require('../models/form.models');
const { validationResult } = require('express-validator');


const createForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_candidate, academic_degree, average_grade, languages, experience, about_you } = req.body;

    if (!id_candidate || !academic_degree || !average_grade || !languages || !experience || !about_you) {
        return res.status(400).json({ error: 'Todos los campos son necesarios' });
    }

    try {
        const insertId = await formModel.createForm({ id_candidate, academic_degree, average_grade, languages, experience, about_you });
        res.status(201).json({ message: 'Formulario creado', id: insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el formulario' });
    }
};

const getFormByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.params;

    try {
        const form = await formModel.readFormByEmail(email);
        if (!form) {
            return res.status(404).json({ error: 'Formulario no encontrado' });
        }
        res.status(200).json(form);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el formulario' });
    }
};

const deleteForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_form } = req.params;

    try {
        const affectedRows = await formModel.deleteForm(id_form);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Formulario no encontrado' });
        }
        res.status(200).json({ message: 'Formulario eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el formulario' });
    }
};

module.exports = {
    createForm,
    getFormByEmail,
    deleteForm
};