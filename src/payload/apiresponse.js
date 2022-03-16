class API_RESPONSE {
    constructor(status, message, data){
        this.status = status;
        this.message = message;
        this.data = data
    }
}

module.exports = { API_RESPONSE }