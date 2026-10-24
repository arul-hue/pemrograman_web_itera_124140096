const daftarFilm = [
  { judul: 'Laskar Pelangi', tahun: 2008, rating: 8.2 },
  { judul: 'Pengabdi Setan', tahun: 2017, rating: 6.5 },
  { judul: 'Dilan 1990', tahun: 2018, rating: 6.7 }
];

// membuat string HTML pakai template literal
function tampilkanList() {
  const html = `
    <h3>Daftar Film (${daftarFilm.length})</h3>
    <ul>
      ${daftarFilm.map(film => `
        <li>
          <b>${film.judul}</b> (${film.tahun}) - rating ${film.rating}
          ${film.rating >= 7 ? '&#9733; bagus' : ''}
        </li>`).join('')}
    </ul>
  `;

  document.getElementById('hasil1').innerHTML = html;
}

function bandingkan() {
  const nama = 'Syahrul';
  const umur = 20;

  const caraLama = 'Halo, ' + nama + '! Umur kamu ' + umur + ' tahun.';
  const caraBaru = `Halo, ${nama}! Umur kamu ${umur} tahun.`;
  const ekspresi = `Tahun depan umur kamu ${umur + 1} tahun.`;
  const banyakBaris = `Baris pertama
Baris kedua`;

  document.getElementById('hasil2').textContent =
    `Cara lama : ${caraLama}\nCara baru : ${caraBaru}\nEkspresi  : ${ekspresi}\n\nMulti baris:\n${banyakBaris}`;
}
