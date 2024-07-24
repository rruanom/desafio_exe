const queriesAssessment = {
    createAssessment: `
        INSERT INTO assessment (name_assessment) 
        VALUES (?)
    `,
    readAllAssessments: `
        SELECT * FROM assessment
    `,
    deleteAssessment: `
        DELETE FROM assessment 
        WHERE id_assessment = ?
    `
};

module.exports = queriesAssessment;