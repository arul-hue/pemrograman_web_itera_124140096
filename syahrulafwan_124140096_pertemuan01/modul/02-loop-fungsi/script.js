// Pertemuan 1 - Loop, Fungsi & Event Handler
const hasil = document.getElementById("result");

//  For loop
const nilaiSiswa = [72, 88, 95, 64, 81];
let total = 0;
let daftar = "";

for (let i = 0; i < nilaiSiswa.length; i++) {
  total += nilaiSiswa[i];
  daftar += `<li>Siswa ${i + 1}: ${nilaiSiswa[i]}</li>`;
}

// While loop
let hitungMundur = 7;
let countdown = "";

while (hitungMundur > 0) {
  countdown += `<span class="chip">${hitungMundur}</span>`;
  hitungMundur--;
}

// For...of loop
let chipNilai = "";

for (let nilai of nilaiSiswa) {
  chipNilai += `<span class="chip ${nilai >= 80 ? "hijau" : "merah"}">${nilai}</span>`;
}

hasil.innerHTML = `
  <h3>Daftar Nilai Siswa:</h3>
  <ul>${daftar}</ul>
  <p>Rata-rata nilai: <strong>${(total / nilaiSiswa.length).toFixed(2)}</strong></p>
  <h3>Countdown:</h3>
  <div id="countdown">${countdown}</div>
  <h3>Nilai dengan for...of:</h3>
  <div>${chipNilai}</div>
`;

// Fungsi dan event handler
function sapaNama(nama) {
  return `Halo, ${nama}! Selamat belajar JavaScript!`;
}

document.getElementById("sapa-button").addEventListener("click", function () {
  const nama = document.getElementById("nama-input").value;
  document.getElementById("sapa-output").innerHTML =
    nama.trim() === ""
      ? `<p class="merah">Silakan masukkan nama Kalian terlebih dahulu!</p>`
      : `<p class="hijau">${sapaNama(nama)}</p>`;
});

// Fungsi kalkulator
function hitungKalkulator(angka1, angka2, operasi) {
  switch (operasi) {
    case "tambah":
      return angka1 + angka2;
    case "kurang":
      return angka1 - angka2;
    case "kali":
      return angka1 * angka2;
    case "bagi":
      return angka2 === 0
        ? "Error: Pembagian dengan nol tidak diperbolehkan"
        : angka1 / angka2;
    default:
      return "Operasi tidak valid";
  }
}

// Dipakai oleh keempat tombol operasi
function jalankanOperasi(operasi, simbol) {
  const angka1 = parseFloat(document.getElementById("angka1").value);
  const angka2 = parseFloat(document.getElementById("angka2").value);
  const output = document.getElementById("hasil-kalkulator");

  if (isNaN(angka1) || isNaN(angka2)) {
    output.innerHTML = `<p class="merah">Masukkan angka yang valid!</p>`;
    return;
  }
  output.innerHTML = `<p>Hasil: ${angka1} ${simbol} ${angka2} = ${hitungKalkulator(angka1, angka2, operasi)}</p>`;
}

document.getElementById("btn-tambah").addEventListener("click", function () {
  jalankanOperasi("tambah", "+");
});
document.getElementById("btn-kurang").addEventListener("click", function () {
  jalankanOperasi("kurang", "-");
});
document.getElementById("btn-kali").addEventListener("click", function () {
  jalankanOperasi("kali", "×");
});
document.getElementById("btn-bagi").addEventListener("click", function () {
  jalankanOperasi("bagi", "÷");
});

// LATIHAN

// Latihan 1: tabel perkalian 1 sampai 10
const angkaPilihan = 7;
let tabelPerkalian = "";

for (let i = 1; i <= 10; i++) {
  tabelPerkalian += `<p>${angkaPilihan} × ${i} = ${angkaPilihan * i}</p>`;
}

// Latihan 2: fungsi faktorial
function faktorial(n) {
  let hasilFaktorial = 1;
  for (let i = 2; i <= n; i++) {
    hasilFaktorial *= i;
  }
  return hasilFaktorial;
}

// Latihan 3: fungsi memeriksa bilangan prima
function cekPrima(angka) {
  if (angka < 2) return false;
  for (let i = 2; i < angka; i++) {
    if (angka % i === 0) return false;
  }
  return true;
}

let hasilPrima = "";
for (let angka of [2, 9, 13, 21, 29]) {
  hasilPrima += `<p>${angka} adalah <strong>${cekPrima(angka) ? "prima" : "bukan prima"}</strong></p>`;
}

// Latihan 5: FizzBuzz 1-100
let fizzbuzz = "";

for (let i = 1; i <= 100; i++) {
  let teks = i;
  if (i % 3 === 0 && i % 5 === 0) teks = "FizzBuzz";
  else if (i % 3 === 0) teks = "Fizz";
  else if (i % 5 === 0) teks = "Buzz";
  fizzbuzz += `<span class="chip">${teks}</span>`;
}

hasil.innerHTML += `
  <hr>
  <h2>Latihan</h2>
  <h3>Latihan 1: Tabel Perkalian ${angkaPilihan}</h3>
  <div id="tabel-perkalian">${tabelPerkalian}</div>
  <h3>Latihan 2: Faktorial</h3>
  <p>faktorial(5) = <strong>${faktorial(5)}</strong></p>
  <p>faktorial(8) = <strong>${faktorial(8)}</strong></p>
  <h3>Latihan 3: Bilangan Prima</h3>
  ${hasilPrima}
  <h3>Latihan 5: FizzBuzz (1-100)</h3>
  <div id="fizzbuzz">${fizzbuzz}</div>
`;

// Latihan 4: kalkulator BMI (fungsi + event handler)
function hitungBMI(berat, tinggiCm) {
  const tinggiMeter = tinggiCm / 100;
  return berat / (tinggiMeter * tinggiMeter);
}

document.getElementById("btn-bmi").addEventListener("click", function () {
  const berat = parseFloat(document.getElementById("berat").value);
  const tinggi = parseFloat(document.getElementById("tinggi").value);
  const output = document.getElementById("hasil-bmi");

  if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
    output.innerHTML = `<p class="merah">Masukkan berat dan tinggi yang valid!</p>`;
    return;
  }

  const bmi = hitungBMI(berat, tinggi);
  let kategori = "Obesitas";
  if (bmi < 18.5) kategori = "Kurus";
  else if (bmi < 25) kategori = "Normal";
  else if (bmi < 30) kategori = "Gemuk";

  output.innerHTML = `<p>BMI: <strong>${bmi.toFixed(1)}</strong> (${kategori})</p>`;
});
