const db = require('../config/database');

const createUser = (user, password, callback) => {
    const query = "INSERT INTO `users`(`firstname`, `middlename`, `lastname`, `age`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?)"
    db.insertQuery(query, [user.firstname, user.middlename, user.lastname, user.age, user.email, password], callback);
}

const deleteUser = (email, callback) => {
    db.executeQuery('DELETE FROM users WHERE email = ?', [email], callback);
}

const getUserByEmail = (email, callback) => {
    db.executeQuery('SELECT * FROM users WHERE email = ?', [email], callback);
}

const getUsers = (callback) => {
    db.executeQuery('SELECT * FROM users', [], callback);
}

const isEmailExists = (email, callback) => {
    db.executeQuery('SELECT email FROM users WHERE email = ?', [email], callback);
}

const updateUser = (user, email, callback) => {
    const query ="UPDATE users SET firstname=?, middlename=?, lastname=?, age=? WHERE email = ?"
    db.insertQuery(query, [user.firstname, user.middlename, user.lastname, user.age, email], callback);
}

module.exports = {
    createUser,
    deleteUser,
    getUsers,
    getUserByEmail,
    isEmailExists,
    updateUser
}