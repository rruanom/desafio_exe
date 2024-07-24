const queriesRoles = {
    createRole: `
    INSERT INTO rol (name_rol) VALUES (?)
    `,
    readAllRoles: `
    SELECT * FROM rol
    `,
    readRoleById: `
    SELECT * FROM rol WHERE id_rol = ?
    `,
    readRoleByName: `
    SELECT * FROM rol WHERE name_rol = ?
    `,
    updateRole: `
    UPDATE rol SET name_rol = ? WHERE id_rol = ?
    `,
    deleteRole: `
    DELETE FROM rol WHERE id_rol = ?
    `
};

module.exports = queriesRoles;