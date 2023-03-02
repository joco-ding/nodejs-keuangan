
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 9706,
  user: 'userpk',
  password: 'vCi52Zu2',
  database: 'pengelolaan_keuangan'
});

module.exports = async (sql, values = []) => {
  try {
    const conn = await pool.getConnection()
    const rows = await conn.query(sql, values);
    conn.release()
    return rows
  } catch (error) {
    throw error
  }
}