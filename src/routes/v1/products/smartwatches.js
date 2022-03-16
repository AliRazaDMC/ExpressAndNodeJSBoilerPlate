const express = require('express');

// VARIABLES
const router = express.Router();
const { prod_controller } = require('../../../controller');
/* const validate = require('../../middleware/validate');
const { login, register } = require('../../validation'); */

router.get('/smartwatches', prod_controller.smartWatches);

module.exports = router;