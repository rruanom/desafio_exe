const queriesRoles = {
    createRole: `INSERT INTO
        rol (name_rol)
    VALUES
        ($1)`,
    editRole:`UPDATE
        rol
    SET name_rol=$1
    WHERE name_rol=$2`
};

module.exports = queriesRoles;