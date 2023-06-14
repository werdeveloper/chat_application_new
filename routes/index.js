var express = require('express');
var router = express.Router();
var usersRoute = require('./users/users.router');
var chatRoute = require('./chat/chat.router');

router.use('/users', usersRoute);
router.use('/chat', chatRoute);

module.exports = router;