const queriesCandidates = {
    createCandidate: `
    INSERT INTO candidatos (nombre, apellido, email, contrasena, sexo, id_status, fecha_registro, logged, last_logged_day, active)
    VALUES (?, ?, ?, ?, ?, 1, NOW(), false, NOW(), true)
    `,
    readCandidates: `
    SELECT c.id_candidato, c.nombre, c.apellido, c.email, c.sexo, s.nombre_s, c.fecha_registro, c.logged, c.last_logged_day, c.active
    FROM candidatos AS c
    INNER JOIN status AS s ON s.id_status = c.id_status
    `,
    readCandidateByEmail: `
    SELECT c.id_candidato, c.nombre, c.apellido, c.email, c.sexo, s.nombre_s, c.fecha_registro, c.logged, c.last_logged_day, c.active
    FROM candidatos AS c
    INNER JOIN status AS s ON s.id_status = c.id_status
    WHERE c.email = ?
    `,
    updateCandidateByCandidate: `
    UPDATE candidatos
    SET nombre = COALESCE(?, nombre),
        apellido = COALESCE(?, apellido),
        sexo = COALESCE(?, sexo),
    WHERE email = ?
    `,

   updateCandidateByAdmin: `
UPDATE candidatos
SET id_status = COALESCE(?, id_status),
    active = COALESCE(?, active)
WHERE email = ?
`,
    deleteCandidate: `
    DELETE FROM candidatos
    WHERE email = ?
    `
};

module.exports = queriesCandidates;