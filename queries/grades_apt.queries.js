const queriesGrades = {
    createGrades: `
    INSERT INTO grades_apt (id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, assessment_date, id_staff, feedback)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
    `,
    readGrades: `
    SELECT c.first_name, c.last_name, c.email, ga.professionality, ga.domain, ga.resilience, ga.social_hab, ga.leadership, ga.collaboration, ga.commitment, ga.initiative, a.name_assessment, ga.assessment_date, s.first_name
    FROM grades_apt AS ga
    INNER JOIN candidate AS c ON ga.id_candidate = c.id_candidate
    INNER JOIN assessment AS a ON ga.id_assessment = a.id_assessment
    INNER JOIN staff AS s ON ga.id_staff = s.id_staff
    `,
    readGradesByEmail: `
    SELECT c.first_name, c.last_name, c.email, ga.professionality, ga.domain, ga.resilience, ga.social_hab, ga.leadership, ga.collaboration, ga.commitment, ga.initiative, a.name_assessment, ga.assessment_date, s.first_name
    FROM grades_apt AS ga
    INNER JOIN candidate AS c ON ga.id_candidate = c.id_candidate
    INNER JOIN assessment AS a ON ga.id_assessment = a.id_assessment
    INNER JOIN staff AS s ON ga.id_staff = s.id_staff
    WHERE c.email = ?
    `,
    updateGradesByAdmin: `
    UPDATE grades_apt AS ga
    SET ga.id_candidate = COALESCE(?, ga.id_candidate),
        ga.professionality = COALESCE(?, ga.professionality),
        ga.domain = COALESCE(?, ga.domain),
        ga.resilience = COALESCE(?, ga.resilience),
        ga.social_hab = COALESCE(?, ga.social_hab),
        ga.leadership = COALESCE(?, ga.leadership),
        ga.collaboration = COALESCE(?, ga.collaboration),
        ga.commitment = COALESCE(?, ga.commitment),
        ga.initiative = COALESCE(?, ga.initiative),
        ga.id_assessment = COALESCE(?, ga.id_assessment),
        ga.id_staff = COALESCE(?, ga.id_staff),
        ga.feedback = COALESCE(?, ga.feedback)
    INNER JOIN candidate AS c ON ga.id_candidate = c.id_candidate
    WHERE c.email = ?
    `,
    deleteGrades: `
    DELETE FROM grades_apt
    INNER JOIN candidate AS c ON ga.id_candidate = c.id_candidate
    WHERE c.email = ?
    `
};

module.exports = queriesGrades;