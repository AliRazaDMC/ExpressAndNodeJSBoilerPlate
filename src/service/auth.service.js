const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authModel } = require('../model/auth.model');
const { API_ERROR, API_RESPONSE } = require('../payload');
const db = require('../config/database');
const salt = 10;

const login = async (email, password, callback) => {

    authModel.login(email, '', (loginError, loginResult) => {
        if(loginError){
            console.log('Login Error',loginError);
            return loginError;
        }

        let user = loginResult;
        const hash = loginResult[0].password;

        bcrypt.compare(password, hash).then((result) => {
            if(!result){
                callback(new API_RESPONSE(httpStatus.NON_AUTHORITATIVE_INFORMATION, 'Wrong password. Kindly provide right password.', result));
            }

            let token = jwt.sign({email, password}, process.env.JWT_SECRET_KEY);
            callback(new API_RESPONSE(httpStatus.OK, 'Correct password', token));
            let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(data);
        });
    });
}

const signUp = (user, callback) => {
    let email = user.email;
    let password = user.password;

    authModel.isEmailExists(email, (existErr, existResult) => {
        if(existErr){
            callback( new API_RESPONSE(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong', existErr));
        }

        if(existResult.length > 0){
            callback( new API_RESPONSE(httpStatus.NOT_ACCEPTABLE, 'Email Already Exist', existResult));
        }

        bcrypt.hash(password, salt).then((hashPassword) => {
            authModel.register(user, hashPassword, (createErr, createResullt) => {
                if(createErr){
                    db.rollBackTransaction(createErr);
                    callback( new API_RESPONSE(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong', createErr));
                }
        
                if (createResullt.affectedRows == 1) {
                    db.commitTransaction();
                    callback( new API_RESPONSE(httpStatus.OK, 'User has been created'));   
                }else{
                    db.rollBackTransaction(createErr);
                    callback( new API_RESPONSE(httpStatus.NOT_FOUND, 'Error while creating user', createErr));
                }
            });
        });
    });
}

module.exports = {
    login,
    signUp
}