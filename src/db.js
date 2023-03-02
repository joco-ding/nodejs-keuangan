
const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: 'localhost',
  port: 9706,
  user: 'userpk',
  password: 'vCi52Zu2',
  database: 'pengelolaan_keuangan'
});