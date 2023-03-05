# Daftar Transaksi
curl http://localhost:8080/api/transaksi -v

# Tambah
curl -X POST -H "Content-Type:application/json" -d "{\"jenis\":\"pemasukan\",\"keterangan\":\"Gaji bulan Januari 2023\",\"jumlah\":15000000,\"tanggal\":\"2023-01-01\"}" http://localhost:8080/api/transaksi -v

curl -X POST -H "Content-Type:application/json" -d "{\"jenis\":\"pengeluaran\",\"keterangan\":\"Listrik\",\"jumlah\":500000,\"tanggal\":\"2023-03-01\"}" http://localhost:8080/api/transaksi -v

# Hapus Transaksi
curl -X DELETE http://localhost:8080/api/transaksi/31