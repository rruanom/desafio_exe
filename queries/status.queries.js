const queriesStatus = {
    createStatus: `
        INSERT INTO status (name_status) 
        VALUES (?)
    `,
    readAllStatus: `
        SELECT * FROM status
    `,
    deleteStatus: `
        DELETE FROM status 
        WHERE name_status = ?
    `
};

module.exports = queriesStatus;