// Pertemuan 1 - Form dengan validasi, localStorage, dan Todo List

// FORM MAHASISWA + LOCALSTORAGE
// localStorage hanya menyimpan teks, jadi array diubah dengan JSON.stringify / JSON.parse
let dataMahasiswa = JSON.parse(localStorage.getItem("dataMahasiswa")) || [];

function tampilkanMahasiswa() {
  localStorage.setItem("dataMahasiswa", JSON.stringify(dataMahasiswa));

  let baris = "";
  for (let i = 0; i < dataMahasiswa.length; i++) {
    const m = dataMahasiswa[i];
    baris += `
      <tr>
        <td>${i + 1}</td><td>${m.nama}</td><td>${m.nim}</td><td>${m.nilai}</td>
        <td><button onclick="hapusMahasiswa(${i})">Hapus</button></td>
      </tr>`;
  }
  document.getElementById("isi-mahasiswa").innerHTML = baris;
}

function hapusMahasiswa(index) {
  dataMahasiswa = dataMahasiswa.filter(function (m, i) {
    return i !== index;
  });
  tampilkanMahasiswa();
}

document.getElementById("btn-simpan").addEventListener("click", function () {
  const nama = document.getElementById("input-nama").value.trim();
  const nim = document.getElementById("input-nim").value.trim();
  const nilai = parseFloat(document.getElementById("input-nilai").value);

  // Validasi: setiap pesan error kosong jika input benar
  const errNama =
    nama.length < 3 ? "Nama wajib diisi, minimal 3 karakter." : "";
  const errNim =
    nim.length !== 9 || isNaN(nim) ? "NIM harus berupa 9 angka." : "";
  const errNilai =
    isNaN(nilai) || nilai < 0 || nilai > 100
      ? "Nilai harus berupa angka 0-100."
      : "";

  document.getElementById("error-nama").innerText = errNama;
  document.getElementById("error-nim").innerText = errNim;
  document.getElementById("error-nilai").innerText = errNilai;

  if (errNama !== "" || errNim !== "" || errNilai !== "") {
    return;
  }

  dataMahasiswa.push({ nama: nama, nim: nim, nilai: nilai });
  tampilkanMahasiswa();
  for (let id of ["nama", "nim", "nilai"]) {
    document.getElementById("input-" + id).value = "";
  }
});

// TODO LIST + LOCALSTORAGE
let daftarTodo = JSON.parse(localStorage.getItem("daftarTodo")) || [];

function tampilkanTodo() {
  localStorage.setItem("daftarTodo", JSON.stringify(daftarTodo));

  let item = "";
  for (let i = 0; i < daftarTodo.length; i++) {
    const todo = daftarTodo[i];
    item += `
      <div class="item ${todo.selesai ? "selesai" : ""}">
        <span>${todo.teks}</span>
        <button onclick="tandaiSelesai(${i})">${todo.selesai ? "Batal" : "Selesai"}</button>
        <button onclick="hapusTodo(${i})">Hapus</button>
      </div>`;
  }
  document.getElementById("daftar-todo").innerHTML = item;
}

function tandaiSelesai(index) {
  daftarTodo[index].selesai = !daftarTodo[index].selesai;
  tampilkanTodo();
}

function hapusTodo(index) {
  daftarTodo = daftarTodo.filter(function (t, i) {
    return i !== index;
  });
  tampilkanTodo();
}

document.getElementById("btn-todo").addEventListener("click", function () {
  const inputTodo = document.getElementById("input-todo");
  const teks = inputTodo.value.trim();

  document.getElementById("error-todo").innerText =
    teks === "" ? "Kegiatan tidak boleh kosong." : "";
  if (teks === "") {
    return;
  }

  daftarTodo.push({ teks: teks, selesai: false });
  tampilkanTodo();
  inputTodo.value = "";
});

tampilkanMahasiswa();
tampilkanTodo();
