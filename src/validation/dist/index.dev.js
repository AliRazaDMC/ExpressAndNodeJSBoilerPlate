"use strict";

var _require = require('./auth.validation'),
    login = _require.login,
    register = _require.register;

var _require2 = require('./user.validation'),
    create_User = _require2.create_User;

module.exports = {
  login: login,
  register: register,
  create_User: create_User
};