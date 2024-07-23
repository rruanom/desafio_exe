const { body, query } = require("express-validator");

const validateGetUserByEmail = [
    query('email')
        .notEmpty().withMessage("Email should be provided to get user")
        .isEmail().withMessage("Valid email is required")
];

const validateCreateUser = [
    body("name")
        .exists().withMessage("User name is required")
        .isString().withMessage("Name should be a string"),
    body("lastname")
        .exists().withMessage("User lastname is required")
        .isString().withMessage("Lastname should be a string"),
    body("username")
        .exists().withMessage("Username is required")
        .isString().withMessage("Username should be a string"),
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required"),
    body("password")
        .exists().withMessage("User password is required")
        .isString().withMessage("Password should be a string"),
    body("image")
        .optional()
        .isString().withMessage("Image should be a string"),
    body("isadmin")
        .optional()
        .isBoolean().withMessage("Admin status should be a boolean")
];

const validateUpdateUser = [
    body("name").optional().isString().withMessage("Name should be a string"),
    body("lastname").optional().isString().withMessage("Lastname should be a string"),
    body("username").optional().isString().withMessage("Username should be a string"),
    body("email").optional().isEmail().withMessage("Valid email is required"),
    body("password").optional().isString().withMessage("Password should be a string"),
    body("image").optional().isString().withMessage("Image should be a string"),
    body("isadmin").optional().isBoolean().withMessage("Admin status should be a boolean")
];

const validateDeleteUser = [
    query('email')
        .notEmpty().withMessage("Email should be provided to delete user")
        .isEmail().withMessage("Valid email is required")
];

module.exports = {
    validateGetUserByEmail,
    validateCreateUser,
    validateUpdateUser,
    validateDeleteUser
};