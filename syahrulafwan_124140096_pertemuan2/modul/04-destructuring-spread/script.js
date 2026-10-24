// Soal 1: nested destructuring 3 level
const buku = {
  judul: 'Bumi Manusia',
  penulis: {
    nama: 'Pramoedya Ananta Toer',
    lahir: {
      kota: 'Blora',
      tahun: 1925
    }
  }
};

function soal1() {
  const {
    judul,
    penulis: {
      nama,
      lahir: { kota, tahun }
    }
  } = buku;

  document.getElementById('hasil1').textContent =
    `judul : ${judul}\npenulis: ${nama}\nkota  : ${kota}\ntahun : ${tahun}`;
}

// Soal 2: rest parameters
const statistik = (...angka) => {
  const total = angka.reduce((a, b) => a + b, 0);
  return {
    min: Math.min(...angka),
    max: Math.max(...angka),
    average: total / angka.length
  };
};

function soal2() {
  const { min, max, average } = statistik(10, 5, 20, 8, 12);
  document.getElementById('hasil2').textContent =
    `statistik(10, 5, 20, 8, 12)\nmin     : ${min}\nmax     : ${max}\naverage : ${average}`;
}

// Soal 3: merge 3 object dengan spread
const bawaan = { tema: 'terang', bahasa: 'id', ukuranFont: 14 };
const pengaturanKelas = { bahasa: 'en', ukuranFont: 16 };
const pengaturanUser = { tema: 'gelap' };

function soal3() {
  const hasil = { ...bawaan, ...pengaturanKelas, ...pengaturanUser, ukuranFont: 18 };

  document.getElementById('hasil3').textContent =
    `bawaan         : ${JSON.stringify(bawaan)}
pengaturanKelas: ${JSON.stringify(pengaturanKelas)}
pengaturanUser : ${JSON.stringify(pengaturanUser)}

hasil merge    : ${JSON.stringify(hasil)}
(properti yang ditulis belakangan menimpa yang sebelumnya)`;
}

// Soal 4: destructuring di for...of
const pemain = [
  { nama: 'Andi', posisi: 'Kiper', nomor: 1 },
  { nama: 'Budi', posisi: 'Bek', nomor: 4 },
  { nama: 'Citra', posisi: 'Striker', nomor: 9 }
];

function soal4() {
  let hasil = '';
  for (const { nama, posisi, nomor } of pemain) {
    hasil += `#${nomor} ${nama} - ${posisi}\n`;
  }

  hasil += '\nPakai entries() supaya dapat indeks:\n';
  for (const [i, { nama }] of pemain.entries()) {
    hasil += `${i + 1}. ${nama}\n`;
  }

  document.getElementById('hasil4').textContent = hasil;
}
