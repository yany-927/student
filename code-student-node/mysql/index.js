const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '619111wy',
  database: 'mystudent'
})

module.exports = db
