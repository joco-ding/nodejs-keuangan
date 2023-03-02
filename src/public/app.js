// Mendapatkan referensi elemen HTML
const form = document.querySelector('#transaction-form');
const inputJenis = document.querySelector('#jenis');
const inputKeterangan = document.querySelector('#keterangan');
const inputJumlah = document.querySelector('#jumlah');
const inputTanggal = document.querySelector('#tanggal');
const table = document.querySelector('#transaction-table tbody');
const elemenSaldo = document.querySelector('#saldo');
const elementotalPemasukan = document.querySelector('#total-pemasukan');
const elementotalPengeluaran = document.querySelector('#total-pengeluaran');
const filter = document.querySelector('#filter');
const search = document.querySelector('#search');

// Mendefinisikan variabel global
let transactions = [];


// Mengambil daftar transaksi dari API
async function getTransactions() {
  try {
    const response = await fetch('/api/transactions');
    if (response.ok) {
      const data = await response.json();
      transactions = data;
      updateTable();
      updateBalance();
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  getTransactions();
});

// Menambahkan event listener pada form
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const jenis = inputJenis.value;
  const keterangan = inputKeterangan.value.trim();
  const jumlah = parseFloat(inputJumlah.value);
  const tanggal = inputTanggal.value;
  if (!keterangan || !jumlah || !tanggal) {
    alert('Silakan isi semua kolom.');
    return;
  }
  const transaction = {
    jenis: jenis,
    keterangan: keterangan,
    jumlah: jumlah,
    tanggal: tanggal
  };
  addTransaction(transaction);
  form.reset();
});

// Menambahkan transaksi baru ke dalam daftar transaksi
function addTransaction(transaction) {
  fetch('/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction)
  })
    .then(response => {
      if (response.ok) {
        getTransactions()
      } else {
        alert('Gagal menambah transaksi.');
      }
    })
    .catch(error => console.error(error));
}

// Mengupdate tampilan tabel transaksi
function updateTable() {
  table.innerHTML = '';
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const row = document.createElement('tr');
    row.innerHTML = `
			<td>${transaction.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</td>
			<td>${transaction.keterangan}</td>
			<td>Rp ${parseFloat(transaction.jumlah).toLocaleString()}</td>
			<td>${transaction.tanggal}</td>
			<td><button onclick="deleteTransaction(${i})">Hapus</button></td>
		`;
    table.appendChild(row);
  }
}

// Menghapus transaksi dari daftar transaksi
function deleteTransaction(id) {
  if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
    fetch(`/api/transactions/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          getTransactions()

        } else {
          alert('Gagal menghapus transaksi.');
        }
      })
      .catch(error => console.error(error));
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

// Menambahkan event listener pada filter transaksi
filter.addEventListener('change', function (event) {
  const selectedValue = event.target.value;
  if (selectedValue === 'semua') {
    updateTable();
  } else if (selectedValue === 'pemasukan') {
    const filteredTransactions = transactions.filter(transaction => transaction.jenis === 'pemasukan');
    updateTableWithTransactions(filteredTransactions);
  } else if (selectedValue === 'pengeluaran') {
    const filteredTransactions = transactions.filter(transaction => transaction.jenis === 'pengeluaran');
    updateTableWithTransactions(filteredTransactions);
  }
});

// Menampilkan daftar transaksi yang telah difilter pada tabel
function updateTableWithTransactions(transactions) {
  table.innerHTML = '';
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const row = document.createElement('tr');
    row.innerHTML = `<td>${transaction.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</td><td>${transaction.keterangan}</td><td>Rp ${parseFloat(transaction.jumlah).toLocaleString()}</td><td>${transaction.tanggal}</td><td><button onclick="deleteTransaction(${i})">Hapus</button></td>`;
    table.appendChild(row);
  }
}

// Menambahkan event listener pada kolom pencarian
search.addEventListener('input', function (event) {
  const keyword = event.target.value.toLowerCase();
  const filteredTransactions = transactions.filter(transaction => {
    const keterangan = transaction.keterangan.toLowerCase();
    const jenis = transaction.jenis === 'pemasukan' ? 'pemasukan' : 'pengeluaran';
    return keterangan.includes(keyword) || jenis.includes(keyword);
  });
  updateTableWithTransactions(filteredTransactions);
});


