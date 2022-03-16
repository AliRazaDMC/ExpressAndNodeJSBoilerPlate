const db = require('../config/database');

const smartWatches = (callback) => {
    db.executeQuery('SELECT * FROM products', [], callback)
}

module.exports = {
    smartWatches
}