// Pertemuan 1 - Variabel & Kondisional
const hasil = document.getElementById("result");

// Variabel dan output
var nama = "Syahrul";
let usia = 19;
const TAHUN_LAHIR = 2007;

console.log(
  "Nama: " + nama + ", Usia: " + usia + ", Tahun Lahir: " + TAHUN_LAHIR,
);
hasil.innerHTML = `
  <h2>Variabel dan Output</h2>
  <p>Nama: <strong>${nama}</strong></p>
  <p>Usia: <strong>${usia}</strong></p>
  <p>Tahun Lahir: <strong>${TAHUN_LAHIR}</strong></p>
`;

// Struktur kondisional
// If-else if-else
let nilai = 76;
let grade = "";

if (nilai >= 90) grade = "A";
else if (nilai >= 80) grade = "B";
else if (nilai >= 70) grade = "C";
else if (nilai >= 60) grade = "D";
else grade = "E";

// Ternary operator
let status = nilai >= 60 ? "Lulus" : "Tidak Lulus";

// Switch case
let hari = new Date().getDay();
let namaHari = "";

switch (hari) {
  case 0:
    namaHari = "Minggu";
    break;
  case 1:
    namaHari = "Senin";
    break;
  case 2:
    namaHari = "Selasa";
    break;
  case 3:
    namaHari = "Rabu";
    break;
  case 4:
    namaHari = "Kamis";
    break;
  case 5:
    namaHari = "Jumat";
    break;
  case 6:
    namaHari = "Sabtu";
    break;
  default:
    namaHari = "Hari tidak valid";
}

hasil.innerHTML += `
  <hr>
  <h2>Struktur Kondisional</h2>
  <p>Nilai: <strong>${nilai}</strong>, Grade: <strong>${grade}</strong></p>
  <p>Status: <strong>${status}</strong></p>
  <p>Hari ini adalah: <strong>${namaHari}</strong></p>
`;

// LATIHAN

// Latihan 1: data diri dengan const dan let
const namaLengkap = "Syahrul Afwan";
let umur = 19;
const kotaAsal = "Palembang";

// Latihan 2: pengecekan kelulusan (nilai >= 70)
let nilaiUjian = 68;
let keterangan = "";

if (nilaiUjian >= 70) keterangan = "LULUS";
else keterangan = "TIDAK LULUS";

// Latihan 3: kategori umur (anak < 12, remaja 12-17, dewasa 18-59, lansia >= 60)
let umurCek = 34;
let kategori = "";

if (umurCek < 12) kategori = "Anak";
else if (umurCek <= 17) kategori = "Remaja";
else if (umurCek <= 59) kategori = "Dewasa";
else kategori = "Lansia";

// Latihan 4: switch-case angka hari (1-7) ke nama hari bahasa Inggris
let angkaHari = 4;
let hariInggris = "";

switch (angkaHari) {
  case 1:
    hariInggris = "Monday";
    break;
  case 2:
    hariInggris = "Tuesday";
    break;
  case 3:
    hariInggris = "Wednesday";
    break;
  case 4:
    hariInggris = "Thursday";
    break;
  case 5:
    hariInggris = "Friday";
    break;
  case 6:
    hariInggris = "Saturday";
    break;
  case 7:
    hariInggris = "Sunday";
    break;
  default:
    hariInggris = "Invalid day";
}

// Latihan 5: grade dengan ternary operator
let nilaiAkhir = 83;
let gradeAkhir =
  nilaiAkhir >= 85
    ? "A"
    : nilaiAkhir >= 70
      ? "B"
      : nilaiAkhir >= 55
        ? "C"
        : "D";

hasil.innerHTML += `
  <hr>
  <h2>Latihan</h2>
  <h3>Latihan 1: Data Diri</h3>
  <p>${namaLengkap}, ${umur} tahun, asal ${kotaAsal}</p>
  <h3>Latihan 2: Pengecekan Kelulusan</h3>
  <p>Nilai ujian ${nilaiUjian} (syarat lulus 70): <strong>${keterangan}</strong></p>
  <h3>Latihan 3: Kategori Umur</h3>
  <p>Umur ${umurCek}: <strong>${kategori}</strong></p>
  <h3>Latihan 4: Konversi Angka Hari (Inggris)</h3>
  <p>Angka hari ${angkaHari}: <strong>${hariInggris}</strong></p>
  <h3>Latihan 5: Grade dengan Ternary Operator</h3>
  <p>Nilai akhir ${nilaiAkhir}: Grade <strong>${gradeAkhir}</strong> (A: &ge;85, B: &ge;70, C: &ge;55, D: lainnya)</p>
`;
