
document.addEventListener('DOMContentLoaded', function () {
  getTransactions();
});

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

// Menambahkan event listener pada kolom pencarian
cari.addEventListener('input', function (event) {
  const keyword = event.target.value.toLowerCase();
  const filteredTransactions = transactions.filter(transaction => {
    const keterangan = transaction.keterangan.toLowerCase();
    const jenis = transaction.jenis === 'pemasukan' ? 'pemasukan' : 'pengeluaran';
    return keterangan.includes(keyword) || jenis.includes(keyword);
  });
  updateTableWithTransactions(filteredTransactions);
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
  tambahTransaksi({ jenis, keterangan, jumlah, tanggal });
  form.reset();
});