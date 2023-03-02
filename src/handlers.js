const pool = require("./db");

// handlers.js
exports.getDaftarTransaksi = async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const [rows] = await pool.query('SELECT DATE_FORMAT(tanggal, ?) as tanggal, jenis, jumlah, keterangan FROM transaksi', ['%d-%m-%Y']);
    conn.release()
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
};

exports.tambahTransaksi =  async (req, res) => {
  const { jenis, tanggal, jumlah, keterangan } = req.body;
  try {
    const conn = await pool.getConnection()
    await pool.query('INSERT INTO transaksi (jenis, tanggal, jumlah, keterangan) VALUES (?, ?, ?, ?)', [jenis, tanggal, jumlah, keterangan]);
    conn.release()
    res.status(201).json({ message: 'Transaksi berhasil ditambahkan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
};

exports.hapusTransaksi = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection()
    await pool.query('DELETE FROM transaksi WHERE id = ?', [id]);
    conn.release()
    res.status(200).json({ message: 'Transaksi berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
};
