const express = require('express');

// VARIABLES
const router = express.Router();
const { user_controller } = require('../../controller');
const validate = require('../../middleware/validate');
const { create_User } = require('../../validation');

router.get('/users', user_controller.getUsers);
router.get('/user/:id', user_controller.getUser);
router.post('/create', validate(create_User), user_controller.createUser);
router.put('/update/:id', user_controller.updateUser);
router.delete('/delete/:id', user_controller.deleteUser);

module.exports = router;