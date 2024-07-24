const queriesStaff = {
    createStaff: `INSERT INTO personal(nombre, apellido, email, contrasena, id_rol, logged, active)
    VALUES (?, ?, ?, ?, 1, false, true)`,
    readStaff: `SELECT p.nombre, p.apellido, p.email, r.name_rol
    FROM personal as p
    INNER JOIN rol as r ON r.id_rol = p.id_rol`,
    readStaffByEmail: `SELECT p.name, p.apellido, p.email, r.name_rol
    FROM personal as p
    INNER JOIN rol as r ON r.id_rol = p.id_rol
    WHERE p.email = ?`,
    updateStaffbyStaff: `UPDATE personal
    SET nombre = COALESCE(?, nombre),
        apellido = COALESCE(?, apellido),
        contrasena = COALESCE(?, contrasena)
    WHERE email = ?`,
    updateStaffbyAdmin: `UPDATE personal
    SET id_rol = COALESCE(?, id_rol),
        active = COALESCE(?, active)
    WHERE email = ?`,
    deleteStaff: `DELETE FROM personal
    WHERE email = ?`
}

module.exports = queriesStaff;