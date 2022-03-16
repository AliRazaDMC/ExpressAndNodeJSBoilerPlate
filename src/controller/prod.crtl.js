const httpStatus = require('http-status');

const { prodService } = require('../service');

const smartWatches = (req, res) => {
    prodService.smartWatches( (err, result) => {
        if(err){
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
        res.status(httpStatus.OK).send(result)
    });
};

module.exports = {
    smartWatches
}