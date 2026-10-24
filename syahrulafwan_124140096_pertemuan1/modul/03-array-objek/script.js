// Pertemuan 1 - Array & Objek

// Menulis satu baris hasil ke sebuah elemen
function tulis(wadah, judul, isi) {
  wadah.innerHTML += `<p><strong>${judul}:</strong> ${isi}</p>`;
}

// DEMO ARRAY
const sayur = ["Bayam", "Wortel", "Kol", "Tomat", "Brokoli"];
const hargaSayur = {
  Bayam: 4000,
  Wortel: 7000,
  Kol: 6000,
  Tomat: 9000,
  Brokoli: 12000,
  Kentang: 8000,
};
const demoArray = document.getElementById("array-demo");

tulis(demoArray, "Array sayur", sayur.join(", "));

sayur.push("Kentang");
tulis(demoArray, "Setelah push Kentang", sayur.join(", "));

const itemDihapus = sayur.pop();
tulis(
  demoArray,
  "Setelah pop",
  `${sayur.join(", ")} (item dihapus: ${itemDihapus})`,
);

sayur.sort();
tulis(demoArray, "Setelah sort", sayur.join(", "));

const daftarSayur = sayur.map(
  (item) => `${item} (Rp${hargaSayur[item].toLocaleString()})`,
);
tulis(demoArray, "Array dengan harga", daftarSayur.join(", "));

const sayurMahal = sayur.filter((item) => hargaSayur[item] > 6500);
tulis(demoArray, "Sayur dengan harga > 6.500", sayurMahal.join(", "));

const totalHarga = sayur.reduce((jumlah, item) => jumlah + hargaSayur[item], 0);
tulis(demoArray, "Total harga semua sayur", "Rp" + totalHarga.toLocaleString());

//  DEMO OBJEK
const siswa = {
  nama: "Rina Kartika",
  nim: "124140010",
  jurusan: "Teknik Informatika",
  nilai: { algoritma: 80, basis_data: 86, web: 90 },
  hobi: ["Menggambar", "Membaca", "Badminton"],
  tampilkanInfo: function () {
    return `${this.nama} (${this.nim}) - ${this.jurusan}`;
  },
  hitungRataRata: function () {
    const nilaiArray = Object.values(this.nilai);
    const jumlah = nilaiArray.reduce((sum, nilai) => sum + nilai, 0);
    return (jumlah / nilaiArray.length).toFixed(2);
  },
};
const demoObjek = document.getElementById("objek-demo");

tulis(demoObjek, "Info Siswa", siswa.tampilkanInfo());
tulis(demoObjek, "Rata-rata Nilai", siswa.hitungRataRata());
tulis(demoObjek, "Hobi", siswa.hobi.join(", "));

siswa.email = "rina.kartika@example.com"; // menambah properti
tulis(demoObjek, "Email", siswa.email);

siswa.nilai.web = 95; // mengubah properti
tulis(demoObjek, "Nilai Web setelah diubah", siswa.nilai.web);

delete siswa.hobi; // menghapus properti
tulis(
  demoObjek,
  "Hobi setelah dihapus",
  siswa.hobi ? siswa.hobi.join(", ") : "Tidak ada data hobi",
);

// LATIHAN

// Array berisi 5 objek mahasiswa
let mahasiswa = [
  {
    nama: "Andi Pratama",
    nim: "124140001",
    jurusan: "Teknik Informatika",
    nilai: 85,
  },
  {
    nama: "Siti Rahma",
    nim: "124140002",
    jurusan: "Teknik Informatika",
    nilai: 72,
  },
  {
    nama: "Dewi Lestari",
    nim: "124140003",
    jurusan: "Sistem Informasi",
    nilai: 91,
  },
  {
    nama: "Rizky Ramadhan",
    nim: "124140004",
    jurusan: "Sistem Informasi",
    nilai: 66,
  },
  {
    nama: "Bayu Saputra",
    nim: "124140005",
    jurusan: "Teknik Informatika",
    nilai: 78,
  },
];

// Latihan 2: mencari mahasiswa dengan nilai tertinggi
function cariNilaiTertinggi() {
  return mahasiswa.reduce(function (maks, mhs) {
    return mhs.nilai > maks.nilai ? mhs : maks;
  });
}

// Latihan 3: menampilkan nilai tertinggi dan mahasiswa di atas rata-rata
function tampilkanInfoNilai() {
  const info = document.getElementById("info-nilai");
  if (mahasiswa.length === 0) {
    info.innerHTML = "<p>Belum ada data mahasiswa.</p>";
    return;
  }

  const tertinggi = cariNilaiTertinggi();
  const jumlah = mahasiswa.reduce((sum, mhs) => sum + mhs.nilai, 0);
  const rataRata = jumlah / mahasiswa.length;
  const diAtasRata = mahasiswa
    .filter((mhs) => mhs.nilai > rataRata)
    .map((mhs) => `${mhs.nama} (${mhs.nilai})`);

  info.innerHTML = `
    <p>Nilai tertinggi: <strong>${tertinggi.nama}</strong> (${tertinggi.nilai})</p>
    <p>Rata-rata nilai: <strong>${rataRata.toFixed(2)}</strong></p>
    <p>Di atas rata-rata: <strong>${diAtasRata.length > 0 ? diAtasRata.join(", ") : "-"}</strong></p>
  `;
}

// Latihan 1: tabel mahasiswa (juga untuk Read pada CRUD)
function tampilkan() {
  let baris = "";
  for (let i = 0; i < mahasiswa.length; i++) {
    const m = mahasiswa[i];
    baris += `
      <tr>
        <td>${i + 1}</td><td>${m.nama}</td><td>${m.nim}</td><td>${m.jurusan}</td><td>${m.nilai}</td>
        <td>
          <button onclick="editNilai(${i})">Edit Nilai</button>
          <button onclick="hapusMahasiswa(${i})">Hapus</button>
        </td>
      </tr>`;
  }
  document.getElementById("isi-tabel").innerHTML = baris;
  tampilkanInfoNilai();
}

// Latihan 4: urutkan berdasarkan nama (arah 1 = A-Z, -1 = Z-A)
function urutkan(arah) {
  mahasiswa.sort(function (a, b) {
    return arah * a.nama.localeCompare(b.nama);
  });
  tampilkan();
}

// Latihan 5: CRUD
// Create
function tambahMahasiswa() {
  const nama = document.getElementById("input-nama").value.trim();
  const nim = document.getElementById("input-nim").value.trim();
  const jurusan = document.getElementById("input-jurusan").value.trim();
  const nilai = parseFloat(document.getElementById("input-nilai").value);

  if (
    nama === "" ||
    nim === "" ||
    jurusan === "" ||
    isNaN(nilai) ||
    nilai < 0 ||
    nilai > 100
  ) {
    document.getElementById("pesan").innerText =
      "Semua data wajib diisi dan nilai harus 0-100.";
    return;
  }

  document.getElementById("pesan").innerText = "";
  mahasiswa.push({ nama: nama, nim: nim, jurusan: jurusan, nilai: nilai });
  for (let id of ["nama", "nim", "jurusan", "nilai"]) {
    document.getElementById("input-" + id).value = "";
  }
  tampilkan();
}

// Update
function editNilai(index) {
  const nilaiBaru = parseFloat(
    prompt("Masukkan nilai baru untuk " + mahasiswa[index].nama + ":"),
  );
  if (isNaN(nilaiBaru) || nilaiBaru < 0 || nilaiBaru > 100) {
    alert("Nilai harus berupa angka 0-100.");
    return;
  }
  mahasiswa[index].nilai = nilaiBaru;
  tampilkan();
}

// Delete
function hapusMahasiswa(index) {
  mahasiswa = mahasiswa.filter(function (mhs, i) {
    return i !== index;
  });
  tampilkan();
}

document.getElementById("btn-sort-az").addEventListener("click", function () {
  urutkan(1);
});
document.getElementById("btn-sort-za").addEventListener("click", function () {
  urutkan(-1);
});
document
  .getElementById("btn-tambah")
  .addEventListener("click", tambahMahasiswa);

tampilkan();
