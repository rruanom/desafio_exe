const queriesRoles = {
    createRole: `
    INSERT INTO role (name_role) VALUES (?)
    `,
    readAllRoles: `
    SELECT * FROM role
    `,
    readRoleById: `
    SELECT * FROM role WHERE id_role = ?
    `,
    readRoleByName: `
    SELECT * FROM role WHERE name_role = ?
    `,
    updateRole: `
    UPDATE role SET name_role = ? WHERE id_role = ?
    `,
    deleteRole: `
    DELETE FROM role WHERE name_role = ?
    `
};

module.exports = queriesRoles;