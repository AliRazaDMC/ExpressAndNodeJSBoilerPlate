const mysql = require('mysql');

// DATABASE VARIABLE
const host = 'localhost';
const username = 'root';
const password = '';
const database = 'nodepractice';

const executeQuery = (query, params, callback) => {
  let connection;
  try {
    connection = mysql.createConnection({
      host     : host,
      user     : username,
      password : password,
      database : database
    });

    connection.connect();
    connection.query(query, params, callback);
    connection.end();
  } catch (error) {
    console.log(`Database error is: ${error}`);
  }
}

module.exports = {
  executeQuery
}