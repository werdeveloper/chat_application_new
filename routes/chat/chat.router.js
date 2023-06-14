var express = require('express');
var router = express.Router();
//call controller
var chatController = require('../../controller/chat.controller');
//verify tiken
const verifyToken = require('../../services/jsonWebTokenHelper');


//Validation
const { check, validationResult } = require('express-validator');
//custom validation
const checkValidation = require('../../services/validations');

//all user list
router.get('/getUsers', verifyToken.verifyToken, chatController.getUsers);

module.exports = router;
