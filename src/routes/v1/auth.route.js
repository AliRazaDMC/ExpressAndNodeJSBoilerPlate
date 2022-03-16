const express = require('express');

// VARIABLES
const router = express.Router();
const { auth_controller } = require('../../controller');
const validate = require('../../middleware/validate');
const { login, register } = require('../../validation');

router.post('/login', validate(login), auth_controller.login);
router.post('/register', validate(register), auth_controller.register);

module.exports = router;