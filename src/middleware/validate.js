const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
    let { value, error } = schema.validate(req.body);

    if(error){
        let message = error.details[0].message;
        return res.status(httpStatus.BAD_REQUEST).send(message);
    }

    next();
}

module.exports = validate;