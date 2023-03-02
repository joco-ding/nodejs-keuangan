// Mendapatkan referensi elemen HTML
const form = document.querySelector('#form-transaksi');
const inputJenis = document.querySelector('#jenis');
const inputKeterangan = document.querySelector('#keterangan');
const inputJumlah = document.querySelector('#jumlah');
const inputTanggal = document.querySelector('#tanggal');
const bodiTabel = document.querySelector('#tabel-transaksi tbody');
const elemenSaldo = document.querySelector('#saldo');
const elementotalPemasukan = document.querySelector('#total-pemasukan');
const elementotalPengeluaran = document.querySelector('#total-pengeluaran');
const filter = document.querySelector('#filter');
const cari = document.querySelector('#cari');


// Mendefinisikan variabel global
let transactions = [];

// Mengupdate tampilan tabel transaksi
function updateTable() {
  bodiTabel.innerHTML = '';
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const row = document.createElement('tr');
    row.innerHTML = `
			<td>${transaction.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</td>
			<td>${transaction.keterangan}</td>
			<td>Rp ${parseFloat(transaction.jumlah).toLocaleString()}</td>
			<td>${transaction.tanggal}</td>
			<td><button onclick="deleteTransaction(${transaction.id})">Hapus</button></td>
		`;
    bodiTabel.appendChild(row);
  }
}

// Mengupdate tampilan saldo dan total pemasukan/pengeluaran
function updateBalance() {
  let totalPemasukan = 0;
  let totalPengeluaran = 0;
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    fJumlah = parseFloat(transaction.jumlah);
    if (transaction.jenis === 'pemasukan') {
      totalPemasukan += fJumlah;
    } else {
      totalPengeluaran += fJumlah;
    }
  }
  const saldo = totalPemasukan - totalPengeluaran;
  elemenSaldo.innerHTML = `Rp ${saldo.toLocaleString()}`;
  elementotalPemasukan.innerHTML = `Rp ${totalPemasukan.toLocaleString()}`;
  elementotalPengeluaran.innerHTML = `Rp ${totalPengeluaran.toLocaleString()}`;
}


// Menampilkan daftar transaksi yang telah difilter pada tabel
function updateTableWithTransactions(transactions) {
  bodiTabel.innerHTML = '';
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const row = document.createElement('tr');
    row.innerHTML = `<td>${transaction.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</td><td>${transaction.keterangan}</td><td>Rp ${parseFloat(transaction.jumlah).toLocaleString()}</td><td>${transaction.tanggal}</td><td><button onclick="deleteTransaction(${i})">Hapus</button></td>`;
    bodiTabel.appendChild(row);
  }
}