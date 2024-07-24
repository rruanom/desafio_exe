const candidateModels = require('../models/candidate.models');

const createCandidate = async (req, res) => {
    const { first_name, last_name, email, password, gender } = req.body;

    if (!first_name || !last_name || !email || !password || !gender) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await candidateModels.createCandidate(first_name, last_name, email, password, gender);
        if (result === 0) {
            return res.status(500).json({ error: 'Error al crear el candidato' });
        }
        res.status(201).json({ message: 'Candidato creado exitosamente'});
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el Candidato' });
    }
};

const readCandidate = async (req, res) => {
    try {
        const candidate = await candidateModels.readCandidates();
        if (!candidate) {
            return res.status(404).json({ error: 'Candidato no encontrados' });
        }
        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los candidatos' });
    }
};

const readCandidateByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const candidate = await candidateModels.readCandidateByEmail(email);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el candidato' });
    }
};

const updateCandidateByCandidate = async (req, res) => {
    const { first_name, last_name, gender, email } = req.body;

    if (!email || !first_name || !last_name || !gender) {
        return res.status(400).json({ error: 'Los campos son requeridos' });
    }

    try {
        const result = await candidateModels.updateCandidatebyCandidate({ first_name, last_name, gender, email });
        if (result === 0) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json({ message: 'Candidato actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el candidato' });
    }
};

const updateCandidateByAdmin = async (req, res) => {
    const { email } = req.params;
    const { id_status, active } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'El email es requerido para la actualización' });
    }

    try {
        const result = await candidateModels.updateCandidateByAdmin({ id_status, active, email });
        if (result === 0) {
            return res.status(404).json({ error: 'Candidate no encontrado o no actualizado' });
        }
        res.status(200).json({ message: 'Candidate actualizado exitosamente por el administrador' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el candidato por el administrador' });
    }
};

const deleteCandidate = async (req, res) => {
    const { email } = req.params;

    try {
        const result = await candidateModels.deleteCandidate(email);
        if (!result) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json({ message: 'Candidato eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al borrar el Candidato' });
    }
};

module.exports = {
    createCandidate,
    readCandidate,
    readCandidateByEmail,
    updateCandidateByCandidate,
    updateCandidateByAdmin,
    deleteCandidate
};

