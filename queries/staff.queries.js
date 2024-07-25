const queriesStaff = {
    createStaff: `INSERT INTO staff (first_name, last_name, email, password, id_role, logged, last_logged_date, active)
    VALUES (?, ?, ?, ?, ?, false, NOW(), true)`,
    readStaff: `SELECT s.id_staff, s.first_name, s.last_name, s.email, s.password, r.name_role, s.logged, s.last_logged_date, s.active
    FROM staff as s
    INNER JOIN role as r ON r.id_role = s.id_role`,
    readStaffByEmail: `SELECT s.id_staff, s.first_name, s.last_name, s.email, s.password, r.name_role, s.logged, s.last_logged_date, s.active
    FROM staff as s
    INNER JOIN role as r ON r.id_role = s.id_role
    WHERE s.email = ?`,
    updateStaffByStaff: `UPDATE staff
    SET first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        password = COALESCE(?, password)
    WHERE email = ?`,
    updateStaffByAdmin: `UPDATE staff
    SET id_role = COALESCE(?, id_role),
        active = COALESCE(?, active),
        logged = COALESCE(?, logged),
        last_logged_date = COALESCE(?, last_logged_date)
    WHERE email = ?`,
    deleteStaff: `DELETE FROM staff
    WHERE email = ?`
};

module.exports = queriesStaff;