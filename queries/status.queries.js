const queriesStatus = {
    createStatus: `
        INSERT 
            INTO 
                status (nombre_s) 
            VALUES (?)
    `,
    readAllStatus: `
        SELECT 
            * 
        FROM 
            status
    `,
    deleteStatus: `
        DELETE 
            FROM 
                status 
            WHERE 
                id_status = ?
    `
};

module.exports = queriesStatus;