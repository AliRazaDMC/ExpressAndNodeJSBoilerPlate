const { userModel } = require('../model/user.model');

const users = [
    {
        'firstname': 'Ali',
        'middlename': 'Raza',
        'lastname': 'Channa',
        'age': 29,
        'email': 'ali@test.com',
        'password': 'abc123',
    },
    {
        'firstname': 'Shayan',
        'middlename': 'Shoaib',
        'lastname': 'Memon',
        'age': 27,
        'email': 'shayan@test.com',
        'password': 'abc123',
    },
    {
        'firstname': 'Abdur',
        'middlename': 'Rehman',
        'lastname': 'Memon',
        'age': 23,
        'email': 'rehman@test.com',
        'password': 'abc123',
    },
];

const createUser = (user, password, callback) => {
    // create user in model from user.model
    // Create role of user from role.model
    // generate random OTP from util
    //  send verification email to user from emial.service()

    return userModel.createUser(user, password, callback);
}

const deleteUser = (email, callback) => {
    userModel.deleteUser(email, callback);
}

const getUser = (email, callback) => {
    userModel.getUserByEmail(email, callback);
}

const getUsers = (callback) => {
    userModel.getUsers(callback);
}

const isEmailExists = (email, callback) => {
    return userModel.isEmailExists(email, callback);
}

const updateUser = (user, email, callback) => {
    return userModel.updateUser(user, email, callback);
}

module.exports = {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    isEmailExists,
    updateUser
}