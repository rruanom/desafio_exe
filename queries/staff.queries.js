const queriesStaff = {
    createStaff: `INSERT INTO personal(nombre, apellido, email, contrasena, id_rol, logged, active)
    VALUES ($1, $2, $3, $4, 1, false, true);`,
    readStaff: `SELECT p.name, p.apellido, p.email, r.name_rol
    FROM personal as p
    INNER JOIN rol as r on r.id_rol = p.id_rol`,
    readStaffByEmail: `SELECT p.name, p.apellido, p.email, r.name_rol
    FROM personal as p
    INNER JOIN rol as r on r.id_rol = p.id_rol
    WHERE p.email = $1`,
    updateStaffbyStaff: `UPDATE personal
    SET nombre = COALESCE($1, nombre),
    SET apellido = COALESCE($2, apellido),
    SET contrasena = COALESCE($3, contrasena),
    WHERE email = $4`,
    updateStaffbyAdmin: `UPDATE personal
    SET id_rol = COALESCE($1, id_rol),
    SET active = COALESCE($2, active),
    WHERE email = $3`,
    deleteStaff: `DELETE FROM personal
    WHERE email = $1`
}
module.exports = queriesStaff;