// Mendapatkan referensi elemen HTML
const formTransaksi = document.querySelector('#form-transaksi');
const inputJenis = document.querySelector('#jenis');
const inputKeterangan = document.querySelector('#keterangan');
const inputJumlah = document.querySelector('#jumlah');
const inputTanggal = document.querySelector('#tanggal');
const bodiTabel = document.querySelector('#tabel-transaksi tbody');
const elemenSaldo = document.querySelector('#saldo');
const elementotalPemasukan = document.querySelector('#total-pemasukan');
const elementotalPengeluaran = document.querySelector('#total-pengeluaran');
const inputFilter = document.querySelector('#filter');
const inputCari = document.querySelector('#cari');


// Mendefinisikan variabel global
let daftarTransaksi = [];

// Mengupdate tampilan tabel transaksi
function updateTabel() {
  bodiTabel.innerHTML = '';
  const opsitanggal = { year: 'numeric', month: 'long', day: 'numeric' };
  for (let i = 0; i < daftarTransaksi.length; i++) {
    const transaksi = daftarTransaksi[i];
    const tanggal = new Date(transaksi.tanggal)
    const baris = document.createElement('tr');
    baris.innerHTML = `
			<td>${transaksi.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</td>
			<td>${transaksi.keterangan}</td>
			<td>Rp ${parseFloat(transaksi.jumlah).toLocaleString()}</td>
			<td>${tanggal.toLocaleDateString('id-ID', opsitanggal)}</td>
			<td><button onclick="hapusTransaksi(${transaksi.id})">Hapus</button></td>
		`;
    bodiTabel.appendChild(baris);
  }
}

// Mengupdate tampilan saldo dan total pemasukan/pengeluaran
function updateSaldo() {
  let totalPemasukan = 0;
  let totalPengeluaran = 0;
  for (let i = 0; i < daftarTransaksi.length; i++) {
    const transaksi = daftarTransaksi[i];
    fJumlah = parseFloat(transaksi.jumlah);
    if (transaksi.jenis === 'pemasukan') {
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
function updateTabeldenganTransaksi(daftarTransaksi) {
  bodiTabel.innerHTML = '';
  for (let i = 0; i < daftarTransaksi.length; i++) {
    const transaksi = daftarTransaksi[i];
    const baris = document.createElement('tr');
    baris.innerHTML = `<td>${transaksi.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</td><td>${transaksi.keterangan}</td><td>Rp ${parseFloat(transaksi.jumlah).toLocaleString()}</td><td>${transaksi.tanggal}</td><td><button onclick="hapusTransaksi(${transaksi.id})">Hapus</button></td>`;
    bodiTabel.appendChild(row);
  }
}