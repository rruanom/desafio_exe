const queriesAssessment = {
    createAssessment: `
        INSERT 
            INTO 
                evaluacion (nombre_eval) 
            VALUES (?)
    `,
    readAllAssessment: `
        SELECT 
            * 
        FROM 
            evaluacion
    `,
    deleteAssessment: `
        DELETE 
            FROM 
                evaluacion 
            WHERE 
                id_eval = ?
    `
};

module.exports = queriesAssessment;