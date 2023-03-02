document.addEventListener('DOMContentLoaded', function () {
  ambilTransaksi();
});

// Menambahkan event listener pada filter transaksi
inputFilter.addEventListener('change', function (event) {
  const selectedValue = event.target.value;
  if (selectedValue === 'semua') {
    updateTabel();
  } else if (selectedValue === 'pemasukan') {
    const transaksiTerfilter = transaksiTerfilter.filter(transaction => transaction.jenis === 'pemasukan');
    updateTabeldenganTransaksi(transaksiTerfilter);
  } else if (selectedValue === 'pengeluaran') {
    const transaksiTerfilter = daftarTransaksi.filter(transaction => transaction.jenis === 'pengeluaran');
    updateTabeldenganTransaksi(transaksiTerfilter);
  }
});

// Menambahkan event listener pada kolom pencarian
inputCari.addEventListener('input', function (event) {
  const keyword = event.target.value.toLowerCase();
  const filteredTransactions = daftarTransaksi.filter(transaction => {
    const keterangan = transaction.keterangan.toLowerCase();
    const jenis = transaction.jenis === 'pemasukan' ? 'pemasukan' : 'pengeluaran';
    return keterangan.includes(keyword) || jenis.includes(keyword);
  });
  updateTabeldenganTransaksi(filteredTransactions);
});

// Menambahkan event listener pada form
formTransaksi.addEventListener('submit', function (event) {
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
  formTransaksi.reset();
});