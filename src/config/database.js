require('dotenv').config()
const mysql = require('mysql');

// DATABASE VARIABLE
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

let connection;
const initialiseConnection = () => {
  connection = mysql.createConnection({
    host     : host,
    user     : username,
    password : password,
    database : database
  });
  connection.connect();
}

const executeQuery = (query, params, callback) => {
  try {
    if(!connection){
      initialiseConnection();
    }

    connection.query(query, params, callback);
    // connection.end();
  } catch (error) {
    console.log(`Database error is: ${error}`);
  }
}

const insertQuery = (query, params, callback) => {
  try {
    if(!connection){
      initialiseConnection();
    }

    connection.beginTransaction((err) => {
      if(err) { throw err; }

      connection.query(query, params, callback);

    });
  } catch (error) {
    console.log(`Database error is: ${error}`);
  }
}

const rollBackTransaction = (error) => {
  if (error) {
    return connection.rollback(function() {
      // connection.end();
      throw error;
    });
  }
}

const commitTransaction = () => {
  connection.commit(function(err) {
    if (err) {
      return connection.rollback(function() {
        throw err;
      });
    }
    console.log('success!');
  });
  // connection.end();
}

module.exports = {
  executeQuery,
  insertQuery,
  rollBackTransaction,
  commitTransaction
}