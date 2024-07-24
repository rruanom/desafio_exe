const queriesCandidates = {
    createCandidate: `
    INSERT INTO candidate (first_name, last_name, email, password, gender, id_status, registration_date, logged, last_logged_date, active)
    VALUES (?, ?, ?, ?, ?, 1, NOW(), false, NOW(), true)
    `,
    readCandidates: `
    SELECT c.id_candidate, c.first_name, c.last_name, c.email, c.gender, s.name_status, c.registration_date, c.logged, c.last_logged_date, c.active
    FROM candidate AS c
    INNER JOIN status AS s ON s.id_status = c.id_status
    `,
    readCandidateByEmail: `
    SELECT c.id_candidate, c.first_name, c.last_name, c.email, c.gender, s.name_status, c.registration_date, c.logged, c.last_logged_date, c.active
    FROM candidate AS c
    INNER JOIN status AS s ON s.id_status = c.id_status
    WHERE c.email = ?
    `,
    updateCandidateByCandidate: `
    UPDATE candidate
    SET first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        gender = COALESCE(?, gender)
    WHERE email = ?
    `,
    updateCandidateByAdmin: `
    UPDATE candidate
    SET id_status = COALESCE(?, id_status),
        active = COALESCE(?, active)
    WHERE email = ?
    `,
    deleteCandidate: `
    DELETE FROM candidate
    WHERE email = ?
    `
};

module.exports = queriesCandidates;