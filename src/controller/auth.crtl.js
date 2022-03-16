const httpStatus = require('http-status');

const { authService } = require('../service');

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    authService.login(email, password, (err, result) => {
        if(err){
           return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        }       
        res.status(httpStatus.OK).send(result); 
    });
};

const register = (req, res) => {
    const user = req.body;
    authService.signUp(user, (err, result) => {
        if(err){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
        res.status(httpStatus.OK).send(result);
    });
};

module.exports = {
    login,
    register
}