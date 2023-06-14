//Validation
const { check, validationResult } = require('express-validator');

const loginValidation = [
    check('email', 'Please enter valid mail id').isEmail(),
    check('password', 'Please enter minimum 6 digit password').isLength({ min: 6 })
];

module.exports = { 
    loginValidation: loginValidation
};