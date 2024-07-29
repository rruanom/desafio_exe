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
    `,
    getFormAndCandidateDataByEmail: `
    SELECT c.id_candidate, c.first_name, c.last_name, c.email, c.gender,
         f.id_form, f.academic_degree, f.average_grade, f.languages, f.experience, f.about_you
    FROM candidate c
    LEFT JOIN form f ON c.id_candidate = f.id_candidate
    WHERE c.email = ?
    `
};

module.exports = queriesForm;