const roleModels = require('../models/role.models');

const createRole = async (req, res) => {
    const { name_role } = req.body;

    if (!name_role) {
        return res.status(400).json({ error: 'El nombre del rol es requerido' });
    }

    try {
        const insertId = await roleModels.createRole(name_role);
        res.status(201).json({ message: 'Rol creado exitosamente', id: insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el rol' });
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleModels.readAllRoles();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
};

const getRoleById = async (req, res) => {
    const { id_role } = req.params;

    try {
        const role = await roleModels.readRoleById(id_role);
        if (!role) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el rol' });
    }
};

const getRoleByName = async (req, res) => {
    const { name_role } = req.params;

    try {
        const role = await roleModels.readRoleByName(name_role);
        if (!role) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el rol' });
    }
};

const updateRole = async (req, res) => {
    const { id_role } = req.params;
    const { name_role } = req.body;

    if (!name_role) {
        return res.status(400).json({ error: 'El nombre del rol es requerido' });
    }

    try {
        const affectedRows = await roleModels.updateRole(id_role, name_role);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el rol' });
    }
};

const deleteRole = async (req, res) => {
    const { name_role } = req.params;
    console.log(req.params)

    try {
        const affectedRows = await roleModels.deleteRole(name_role);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el rol' });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    getRoleByName,
    updateRole,
    deleteRole,
};
