// Menambahkan transaksi baru ke dalam daftar transaksi
async function tambahTransaksi(transaksi) {
  try {
    const response = await fetch('/api/transaksi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaksi)
    });
    if (response.ok) {
      ambilTransaksi()
      return
    }
  } catch (error) {
    console.error(error)
  }
  alert('Gagal menambah transaksi.');
}

// Menghapus transaksi dari daftar transaksi
async function hapusTransaksi(id) {
  if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
    try {
      const response = await fetch(`/api/transaksi/${id}`, { method: 'DELETE' })
      if (response.ok) {
        ambilTransaksi()
        return
      }
    } catch (error) {
      console.error(error)
    }
    alert('Gagal menghapus transaksi.');
  }
}

// Mengambil daftar transaksi dari API
async function ambilTransaksi() {
  try {
    const response = await fetch('/api/transaksi');
    if (response.ok) {
      const data = await response.json();
      daftarTransaksi = data;
      updateTabel(daftarTransaksi);
      updateSaldo();
      return
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
