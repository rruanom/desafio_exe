const queriesForm = {
    createForm: `
    INSERT INTO form (id_candidate, academic_degree, average_grade, languages, experience, about_you)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    readFormByEmail: `
    SELECT f.*, c.email
    FROM form f
    INNER JOIN candidate c ON f.id_candidate = c.id_candidate
    WHERE c.email = ?
    `,
    deleteForm: `
    DELETE FROM form WHERE id_form = ?
    `
};

module.exports = queriesForm;