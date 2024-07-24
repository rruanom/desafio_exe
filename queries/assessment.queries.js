const queriesAssessment = {
    createAssessment: `
        INSERT INTO assessment (name_assessment) 
        VALUES (?)
    `,
    getAllAssessment: `
        SELECT * FROM assessment
    `,
    deleteAssessment: `
        DELETE FROM assessment 
        WHERE name_assessment = ?
    `
};

module.exports = queriesAssessment;