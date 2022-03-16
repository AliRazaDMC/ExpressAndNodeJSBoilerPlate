const db = require('../config/database');

const isEmailExists = (email, callback) => {
    db.executeQuery('SELECT email FROM users WHERE email = ?', [email], callback);
}

const login = (email, password, callback) => {
    const query = "SELECT email, password FROM users WHERE email = ?"
    db.executeQuery(query, [email], callback);
}

const register = (user, password, callback) => {
    const query = "INSERT INTO `users`(`firstname`, `middlename`, `lastname`, `age`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?)"
    db.insertQuery(query, [user.firstname, user.middlename, user.lastname, user.age, user.email, password], callback);
}

module.exports = {
    isEmailExists,
    login,
    register
}