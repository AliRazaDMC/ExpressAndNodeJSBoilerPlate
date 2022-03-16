const httpStatus = require('http-status');
const bcrypt = require('bcrypt')

const { API_ERROR, API_RESPONSE } = require('../payload');
const { userService } = require('../service');
const db = require('../config/database');
const salt = 10;

const createUser = (req, res) => {
    const user = req.body;
    let email = user.email; 
    let password = user.password;

    userService.isEmailExists(email, (existErr, existResult) => {
        if(existErr){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong');
        }

        if(existResult.length > 0){
            return res.status(httpStatus.OK).send('Email Already Exist');
        }

        bcrypt.hash(password, salt).then((hashPassword) => {
            userService.createUser(user, hashPassword, (createErr, createResullt) => {
                if(createErr){
                    db.rollBackTransaction(createErr);
                    return res.status(httpStatus.OK).send('Something went wrong');
                }
        
                if (createResullt.affectedRows == 1) {
                    db.commitTransaction();
                    return res.status(httpStatus.OK).send('User has been created');                
                }else{
                    db.rollBackTransaction(createErr);
                    return res.status(httpStatus.OK).send('Error while creating user');                
                }
            });
        });
    });
};

const deleteUser = (req, res) => {
    let email = req.query.id
    
    userService.isEmailExists(email, (existErr, existResult) => {
        if(existErr){
            db.rollBackTransaction(existErr);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('From isEmailExists: - Something went wrong!');
        }

        if(existResult.length === 0){
            db.rollBackTransaction(existErr);
            return res.status(httpStatus.NOT_FOUND).send('Email not found. Please provide valid email.');
        }

        userService.deleteUser(email, (deleteErr, deleteResullt) => {
            if(deleteErr){
                db.rollBackTransaction(deleteErr);
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!');
            }
    
            if (deleteResullt.affectedRows > 0) {
                db.commitTransaction();
                return res.status(httpStatus.OK).send('User deleted successfully');                
            }else{
                db.rollBackTransaction(deleteErr);
                return res.status(httpStatus.NOT_MODIFIED).send('Error while deleting user!');                
            }
        });
    });
};

const getUser = (req, res) => {
    let email = req.query.id;
    /* console.log(req.query);
    console.log(req.path); */

    userService.isEmailExists(email, (existErr, existResult) => {
        if(existErr){
            // db.rollBackTransaction(existErr);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('From isEmailExists: - Something went wrong!');
        }

        if(existResult.length === 0){
            // db.rollBackTransaction(existErr);
            return res.status(httpStatus.NOT_FOUND).send('Email not found. Please provide valid email.');
        }

        userService.getUser(email, (err, result) => {
            if(err){
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!');
            }
    
            res.send(new API_RESPONSE(httpStatus.OK, 'User Fetched Successfully', result));
        });        
    });
};

const getUsers = (req, res) => {
    userService.getUsers((err, result) => {
        if(err){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong');
        }

        res.send(new API_RESPONSE(httpStatus.OK, 'Fetching Users Successful', result));
    });
};

const updateUser = (req, res) => {
    const user = req.body;
    let email = req.query.id;
    console.log(`User email is ${email}`);

    userService.isEmailExists(email, (existErr, existResult) => {
        if(existErr){
            db.rollBackTransaction(existErr);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('From isEmailExists: - Something went wrong!');
        }

        if(existResult.length === 0){
            db.rollBackTransaction(existErr);
            return res.status(httpStatus.NOT_FOUND).send('Email not found. Please provide valid email.');
        }

        userService.updateUser(user, email, (updateErr, updateResullt) => {
            if(updateErr){
                db.rollBackTransaction(updateErr);
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!');
            }
    
            if (updateResullt.affectedRows > 0) {
                db.commitTransaction();
                return res.status(httpStatus.OK).send('User has been updated successfully');                
            }else{
                db.rollBackTransaction(updateErr);
                return res.status(httpStatus.NOT_MODIFIED).send('Error while updating user');                
            }
        });
    });
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}