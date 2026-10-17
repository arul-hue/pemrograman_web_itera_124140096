const API = 'https://jsonplaceholder.typicode.com';

// helper: fetch lalu ubah ke json, error kalau status bukan 2xx
const ambil = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('HTTP ' + res.status);
  }
  return res.json();
};

const tunggu = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Soal 1: fetch beberapa endpoint lalu digabung
async function soal1() {
  const hasil = document.getElementById('hasil1');
  hasil.textContent = 'Loading...';

  try {
    const [user, posts, todos] = await Promise.all([
      ambil(`${API}/users/1`),
      ambil(`${API}/posts?userId=1&_limit=3`),
      ambil(`${API}/todos?userId=1&_limit=3`)
    ]);

    const gabungan = { nama: user.name, email: user.email, posts, todos };

    hasil.textContent = `Nama  : ${gabungan.nama}
Email : ${gabungan.email}

Post:
${gabungan.posts.map(p => '- ' + p.title).join('\n')}

Todo:
${gabungan.todos.map(t => (t.completed ? '[x] ' : '[ ] ') + t.title).join('\n')}`;
  } catch (error) {
    hasil.textContent = 'Gagal: ' + error.message;
  }
}

// Soal 2: retry dengan exponential backoff
// delay: 500ms, 1000ms, 2000ms, ... (dikali 2 tiap gagal)
async function retry(fungsi, maksimal = 4, delay = 500) {
  for (let i = 1; i <= maksimal; i++) {
    try {
      return await fungsi(i);
    } catch (error) {
      tulis2(`Percobaan ${i} gagal (${error.message})`);
      if (i === maksimal) {
        throw error;
      }
      tulis2(`  tunggu ${delay} ms...`);
      await tunggu(delay);
      delay = delay * 2;
    }
  }
}

function tulis2(teks) {
  document.getElementById('hasil2').textContent += teks + '\n';
}

async function soal2() {
  document.getElementById('hasil2').textContent = '';

  // fungsi simulasi: gagal 2 kali, baru berhasil di percobaan ke-3
  const fungsiTidakStabil = async (percobaan) => {
    if (percobaan < 3) {
      throw new Error('server sibuk');
    }
    return 'data berhasil diambil';
  };

  try {
    const hasil = await retry(fungsiTidakStabil);
    tulis2('Berhasil: ' + hasil);
  } catch (error) {
    tulis2('Menyerah: ' + error.message);
  }
}

// Soal 3: loading state
async function soal3(urlBenar) {
  const kotak = document.getElementById('hasil3');
  kotak.textContent = 'Loading...';

  try {
    await tunggu(1000); // supaya tulisan loading sempat terlihat
    const url = urlBenar ? `${API}/todos?_limit=5` : `${API}/todo-salah`;
    const data = await ambil(url);
    kotak.innerHTML = '<ul>' + data.map(t => `<li>${t.title}</li>`).join('') + '</ul>';
  } catch (error) {
    kotak.textContent = 'Gagal memuat data: ' + error.message;
  }
}

// Soal 4: error boundary
// semua error async ditangkap di satu fungsi ini
async function errorBoundary(fungsi) {
  const kotak = document.getElementById('hasil4');
  kotak.textContent = 'Loading...';
  try {
    const hasil = await fungsi();
    kotak.textContent = 'Berhasil: ' + hasil;
  } catch (error) {
    kotak.textContent = 'Terjadi error: ' + error.message;
  }
}

function soal4(jenis) {
  if (jenis === 'ok') {
    errorBoundary(async () => (await ambil(`${API}/posts/1`)).title);
  } else if (jenis === '404') {
    errorBoundary(() => ambil(`${API}/halaman-tidak-ada/1`));
  } else {
    errorBoundary(async () => {
      throw new Error('error buatan di dalam fungsi async');
    });
  }
}

// Soal 5: pagination
let halaman = 1;
const perHalaman = 5;
const totalHalaman = 20; // 100 post / 5 per halaman

async function muatHalaman() {
  const daftar = document.getElementById('hasil5');
  daftar.innerHTML = '<li>Loading...</li>';

  try {
    const posts = await ambil(`${API}/posts?_page=${halaman}&_limit=${perHalaman}`);
    daftar.innerHTML = posts.map(p => `<li>${p.id}. ${p.title}</li>`).join('');
  } catch (error) {
    daftar.innerHTML = '<li>Gagal memuat: ' + error.message + '</li>';
  }

  document.getElementById('infoHalaman').textContent = `Halaman ${halaman} dari ${totalHalaman}`;
  document.getElementById('btnPrev').disabled = halaman === 1;
  document.getElementById('btnNext').disabled = halaman === totalHalaman;
}

function ganti(arah) {
  halaman += arah;
  muatHalaman();
}

muatHalaman();

// Soal 6: debounced search
function debounce(fungsi, jeda) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fungsi(...args), jeda);
  };
}

let jumlahKetikan = 0;
let jumlahRequest = 0;

function updateInfo() {
  document.getElementById('info').textContent =
    `Ketikan: ${jumlahKetikan}, request: ${jumlahRequest}`;
}

async function cariProduk(kata) {
  const daftar = document.getElementById('hasil6');
  if (kata.trim() === '') {
    daftar.innerHTML = '';
    return;
  }

  jumlahRequest++;
  updateInfo();
  daftar.innerHTML = '<li>Mencari...</li>';

  try {
    const data = await ambil(`https://dummyjson.com/products/search?q=${kata}&limit=5`);
    daftar.innerHTML = data.products.length
      ? data.products.map(p => `<li>${p.title} - $${p.price}</li>`).join('')
      : '<li>Tidak ada hasil</li>';
  } catch (error) {
    daftar.innerHTML = '<li>Gagal mencari: ' + error.message + '</li>';
  }
}

const cariDenganJeda = debounce(cariProduk, 500);

document.getElementById('cari').addEventListener('input', (e) => {
  jumlahKetikan++;
  updateInfo();
  cariDenganJeda(e.target.value);
});
