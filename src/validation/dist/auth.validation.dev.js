"use strict";

var Joi = require('joi');

var login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});
var register = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net']
    }
  }).required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{3,5}$')).required(),
  age: Joi.number().required().min(18).max(120)
});
module.exports = {
  login: login,
  register: register
};