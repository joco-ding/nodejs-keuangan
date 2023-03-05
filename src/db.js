
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 9706,
  user: 'userpk',
  password: 'vCi52Zu2',
  database: 'pengelolaan_keuangan'
});

exports.query = async (sql, values = []) => {
  try {
    const koneksi = await pool.getConnection()
    const barisData = await koneksi.query(sql, values);
    koneksi.release()
    return barisData
  } catch (error) {
    throw error
  }
}