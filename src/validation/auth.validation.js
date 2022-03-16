const Joi = require('joi');

const login = Joi.object(
    {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required()
    }
);

const register = Joi.object(
    {
        firstname: Joi.string().min(3).max(25).required(),
        middlename: Joi.string().min(3).max(25),
        lastname: Joi.string().min(3).max(25).required(),
        age: Joi.number().min(18).max(120).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{3,5}$')).required()
    }
);

module.exports = {
    login,
    register
}