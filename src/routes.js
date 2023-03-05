const express = require('express');
const router = express.Router();
const { tambahTransaksi, daftarTransaksi, hapusTransaksi } = require('./handlers');

router.get('/transaksi', daftarTransaksi);
router.post('/transaksi', tambahTransaksi);
router.delete('/transaksi/:id', hapusTransaksi);

module.exports = router
