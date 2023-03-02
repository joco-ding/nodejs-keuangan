const express = require('express');
const router = express.Router();
const { tambahTransaksi, getDaftarTransaksi, hapusTransaksi } = require('./handlers');

router.get('/transaksi', getDaftarTransaksi);
router.post('/transaksi', tambahTransaksi);
router.delete('/transaksi/:id', hapusTransaksi);

module.exports = router
