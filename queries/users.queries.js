const queries = {
    getUserByEmail: `
    SELECT id_user, name, lastname, username, image, password, email, isadmin
    FROM public.users
    WHERE email=$1`,
    getNonAdminUsers: `
    SELECT id_user, name, lastname, username, image, password, email, isadmin
    FROM users
    WHERE isadmin=false`,
    getAllUsers: `
    SELECT id_user, name, lastname, username, image, password, email, isadmin
    FROM users;`,
    createUser: `
    INSERT INTO users (name, lastname, username, email, password, image, isadmin, last_logged_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    updateUser: `
    UPDATE users 
    SET 
    name=$1,
    lastname=$2,
    username=$3,
    email=$4,
    password=$5,
    image=$6
    WHERE email=$7`,
    updateUsername: `
    UPDATE users 
    SET
    username=$1
    WHERE email=$2`,
    updatePassword: `
    UPDATE users 
    SET
    password=$1
    WHERE email=$2`,
    deleteUser:`
    DELETE FROM users
    WHERE email=$1`
}

module.exports = queries;