//config
const config = require('config');

// Mongo DB
const db = require('../services/db.service.js'),
    User = require('../model/userModel.js');
//crypt 
const bcrypt = require('bcryptjs');
const saltRounds = 10;
//JSONWebToken
const jwt = require('jsonwebtoken');

//verify jsonwebtoken
const verifyToken = require('../services/jsonWebTokenHelper.js');

//Validation
const { validationResult } = require('express-validator');

let getUsers = async (req, res) => {
    try{
        console.log("Chat api");
        let result = await User.find({
            _id: {
                $nin: [req?.userId]    // Exclude the current Login User
            }
        });
        if(!result){
            res.status(400).send({
                status: 0,
                msg: err,
                data: []
            });
        } 
        res.status(200).send({
            status: 1,
            msg: 'Success',
            data: result
        });
    } catch(err){
        console.log(err);
    }
};

module.exports = {
    getUsers
};
