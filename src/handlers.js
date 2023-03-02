const db = require("./db");

// handlers.js
exports.getDaftarTransaksi = async (req, res) => {
  try {
    const [rows] = await db('SELECT id, DATE_FORMAT(tanggal, ?) as tanggal, jenis, jumlah, keterangan FROM transaksi', ['%d-%m-%Y']);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
};

exports.tambahTransaksi =  async (req, res) => {
  const { jenis, tanggal, jumlah, keterangan } = req.body;
  try {
    await db('INSERT INTO transaksi (jenis, tanggal, jumlah, keterangan) VALUES (?, ?, ?, ?)', [jenis, tanggal, jumlah, keterangan]);
    res.status(201).json({ message: 'Transaksi berhasil ditambahkan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
};

exports.hapusTransaksi = async (req, res) => {
  const { id } = req.params;
  try {
    await db('DELETE FROM transaksi WHERE id = ?', [id]);
    res.status(200).json({ message: 'Transaksi berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
};
