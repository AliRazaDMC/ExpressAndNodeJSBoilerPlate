const { login, register } = require('./auth.validation');
const { create_User } = require('./user.validation');

module.exports = {
    login,
    register,
    create_User
}