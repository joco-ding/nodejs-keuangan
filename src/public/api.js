// Menambahkan transaksi baru ke dalam daftar transaksi
async function tambahTransaksi(transaction) {
  try {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    if (response.ok) {
      getTransactions()
    } else {
      alert('Gagal menambah transaksi.');
    }
  } catch (error) {
    console.error(error)
  }
}

// Menghapus transaksi dari daftar transaksi
async function deleteTransaction(id) {
  if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
    try {
      const response = await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
      if (response.ok) {
        getTransactions()
      } else {
        alert('Gagal menghapus transaksi.');
      }
    } catch (error) {
      console.error(error)
    }
  }
}

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
