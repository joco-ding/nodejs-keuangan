const express = require('express');
const router = express.Router();
const { tambahTransaksi, getDaftarTransaksi, hapusTransaksi } = require('./handlers');

router.get('/api/transactions', getDaftarTransaksi);
router.post('/api/transactions', tambahTransaksi);
router.delete('/api/transactions/:id', hapusTransaksi);

module.exports = router
