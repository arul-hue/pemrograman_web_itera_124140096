const barang = [
  { nama: 'Beras', kategori: 'makanan', harga: 14000, stok: 20 },
  { nama: 'Mie Instan', kategori: 'makanan', harga: 3500, stok: 50 },
  { nama: 'Sabun', kategori: 'kebersihan', harga: 5000, stok: 0 },
  { nama: 'Shampo', kategori: 'kebersihan', harga: 12000, stok: 10 },
  { nama: 'Teh Botol', kategori: 'minuman', harga: 4500, stok: 30 },
  { nama: 'Air Mineral', kategori: 'minuman', harga: 3000, stok: 40 }
];

document.getElementById('data').textContent = barang
  .map(b => `${b.nama} | ${b.kategori} | Rp${b.harga} | stok ${b.stok}`)
  .join('\n');

// Soal 1: groupBy dengan reduce
const groupBy = (array, key) => {
  return array.reduce((hasil, item) => {
    const grup = item[key];
    if (!hasil[grup]) {
      hasil[grup] = [];
    }
    hasil[grup].push(item);
    return hasil;
  }, {});
};

function soal1() {
  const hasil = groupBy(barang, 'kategori');
  let teks = '';
  for (const kategori in hasil) {
    teks += `${kategori}: ${hasil[kategori].map(b => b.nama).join(', ')}\n`;
  }
  document.getElementById('hasil1').textContent = teks;
}

// Soal 2: rata-rata array of objects
const rataRata = (array, key) => {
  const total = array.reduce((jumlah, item) => jumlah + item[key], 0);
  return total / array.length;
};

function soal2() {
  document.getElementById('hasil2').textContent =
    `rata-rata harga: ${rataRata(barang, 'harga').toFixed(2)}\nrata-rata stok : ${rataRata(barang, 'stok').toFixed(2)}`;
}

// Soal 3: array bersarang jadi flat
function soal3() {
  const angka = [1, [2, 3], [4, [5, 6]]];

  const toko = [
    { nama: 'Toko A', produk: ['pensil', 'buku'] },
    { nama: 'Toko B', produk: ['penggaris'] }
  ];
  const daftarProduk = toko.flatMap(t => t.produk.map(p => `${p} (${t.nama})`));

  document.getElementById('hasil3').textContent =
    `array asli      : ${JSON.stringify(angka)}
flat()          : ${JSON.stringify(angka.flat())}
flat(Infinity)  : ${JSON.stringify(angka.flat(Infinity))}

flatMap produk toko:
${daftarProduk.join('\n')}`;
}

// Soal 4: filter + map + reduce
function soal4() {
  // barang yang stoknya ada -> hitung nilai stok -> jumlahkan
  const tersedia = barang.filter(b => b.stok > 0);
  const nilaiStok = tersedia.map(b => b.harga * b.stok);
  const totalNilai = nilaiStok.reduce((a, b) => a + b, 0);

  document.getElementById('hasil4').textContent =
    `barang tersedia : ${tersedia.map(b => b.nama).join(', ')}
nilai stok      : ${nilaiStok.join(', ')}
total nilai stok: Rp${totalNilai.toLocaleString('id-ID')}`;
}
