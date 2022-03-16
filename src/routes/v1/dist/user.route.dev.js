"use strict";

var express = require('express'); // VARIABLES


var router = express.Router();

var _require = require('../../controller'),
    user_controller = _require.user_controller;

var validate = require('../../middleware/validate');

var _require2 = require('../../validation'),
    login = _require2.login,
    register = _require2.register,
    create_User = _require2.create_User;

router.get('/users', user_controller.getUsers);
router.get('/user/:id', user_controller.getUser);
router.post('/create', validate(create_User), user_controller.createUser);
router.put('/update/:id', user_controller.updateUser);
router.post('/delete/:id', user_controller.deleteUser);
module.exports = router;