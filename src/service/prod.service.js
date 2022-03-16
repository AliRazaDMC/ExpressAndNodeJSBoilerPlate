const httpStatus = require('http-status');

const { API_ERROR, API_RESPONSE } = require('../payload');
const { prodModel } = require('../model')

const smartWatches = (callback) => {
    prodModel.smartWatches( (err, result) => {
        if(err){
            callback( new API_RESPONSE(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!', err))
        }

        callback( new API_RESPONSE(httpStatus.OK, 'Products fetched successfully.', result))
        
        // 1
        var val = Math.floor(100000 + Math.random() * 900000);
        console.log('OTP 1: '+val);
        // 2
        var seq = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
        console.log('OTP 2: '+seq);
    })
};

module.exports = {
    smartWatches
}