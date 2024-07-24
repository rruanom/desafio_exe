const queriesForm = {
    insertForm: `
    INSERT INTO form (id_candidate, academic_degree, average_grade, languages, experience, about_you, email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    readFormByEmail: `
    SELECT * FROM form WHERE email = ?
    `,
    deleteForm: `
    DELETE FROM form WHERE id_form = ?
    `
};

module.exports = queriesForm;