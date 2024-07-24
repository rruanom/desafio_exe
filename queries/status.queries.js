const queriesStatus = {
    createStatus: `
    INSERT INTO status (nombre_s) VALUES (?)
    `,
    readAllStatus: `
    SELECT * FROM status
    `,
    readStatusById: `
    SELECT * FROM status WHERE id_status = ?
    `,
    readStatusByName: `
    SELECT * FROM status WHERE nombre_s = ?
    `,
    updateStatus: `
    UPDATE status SET nombre_s = ? WHERE id_status = ?
    `,
    deleteStatus: `
    DELETE FROM status WHERE id_status = ?
    `
};

module.exports = queriesStatus;