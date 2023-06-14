var express = require('express');
var router = express.Router();
//call controller
var userController = require('../../controller/user.controller');
//verify tiken
const verifyToken = require('../../services/jsonWebTokenHelper');

//create user
router.post('/createUser', userController.createUser);

//Validation
const { check, validationResult } = require('express-validator');
//custom validation
const checkValidation = require('../../services/validations');

//login user
router.post('/login', checkValidation.loginValidation, userController.login);
//logout user
router.post('/logout', verifyToken.verifyToken, userController.logout);
//all user list
router.get('/getUsers', verifyToken.verifyToken, userController.getUsers);
//single user detail
router.get('/getUsers/:id', verifyToken.verifyToken, userController.getSingleUser);
//update user detail
router.put('/updateUser/:id', verifyToken.verifyToken, userController.updateUser);
//delete user
router.delete('/deleteUser/:id', verifyToken.verifyToken, userController.deleteUser);

module.exports = router;
