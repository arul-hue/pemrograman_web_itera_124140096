// Mini POS - Kasir & Keranjang Belanja Sederhana
// Praktikum PAW ITERA - Pertemuan 1 (JavaScript Dasar)

const KUNCI = "keranjangBelanja";
const BATAS_DISKON = 50000;
const PERSEN_DISKON = 10;

// Setiap barang berbentuk objek: { nama, harga, qty }
let keranjang = JSON.parse(localStorage.getItem(KUNCI)) || [];

const inputNama = document.getElementById("input-nama");
const inputHarga = document.getElementById("input-harga");
const inputQty = document.getElementById("input-qty");
const inputBayar = document.getElementById("input-bayar");

// Contoh: 15000 -> "Rp 15.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function simpanKeranjang() {
  localStorage.setItem(KUNCI, JSON.stringify(keranjang));
}

// ----- Validasi form -----

// Menampilkan (atau menghapus jika pesan kosong) error di bawah input
function setError(id, pesan) {
  document.getElementById("error-" + id).innerText = pesan;
  document.getElementById("input-" + id).className = pesan ? "input-salah" : "";
}

function validasiForm() {
  const nama = inputNama.value.trim();
  const harga = parseFloat(inputHarga.value);
  const qty = parseFloat(inputQty.value);

  const errNama = nama.length < 3 ? "Nama barang wajib diisi, minimal 3 karakter." : "";
  const errHarga = isNaN(harga) || harga < 500 ? "Harga wajib berupa angka, minimal Rp 500." : "";
  const errQty = isNaN(qty) || qty < 1 || qty % 1 !== 0 ? "Jumlah wajib berupa angka bulat, minimal 1." : "";

  setError("nama", errNama);
  setError("harga", errHarga);
  setError("qty", errQty);

  return errNama === "" && errHarga === "" && errQty === "";
}

function resetForm() {
  for (let id of ["nama", "harga", "qty"]) {
    document.getElementById("input-" + id).value = "";
    setError(id, "");
  }
  inputNama.focus();
}

// ----- Perhitungan -----

// Mengembalikan total belanja, diskon, dan total akhir
function hitungRingkasan() {
  const total = keranjang.reduce(function (jumlah, item) {
    return jumlah + item.harga * item.qty; // subtotal = harga x qty
  }, 0);
  const diskon = total >= BATAS_DISKON ? Math.round(total * PERSEN_DISKON / 100) : 0;
  return { total: total, diskon: diskon, akhir: total - diskon };
}

// ----- Tampilan -----

function tampilkanKeranjang() {
  let baris = "";
  for (let i = 0; i < keranjang.length; i++) {
    const item = keranjang[i];
    baris += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.nama}</td>
        <td class="kanan">${formatRupiah(item.harga)}</td>
        <td class="kanan">${item.qty}</td>
        <td class="kanan">${formatRupiah(item.harga * item.qty)}</td>
        <td><button class="btn-hapus" onclick="hapusBarang(${i})">Hapus</button></td>
      </tr>`;
  }
  document.getElementById("isi-keranjang").innerHTML =
    baris || `<tr><td colspan="6" class="kosong">Keranjang masih kosong.</td></tr>`;
}

function tampilkanRingkasan() {
  const r = hitungRingkasan();
  document.getElementById("total-belanja").innerText = formatRupiah(r.total);
  document.getElementById("nominal-diskon").innerText = "- " + formatRupiah(r.diskon);
  document.getElementById("total-akhir").innerText = formatRupiah(r.akhir);
  document.getElementById("info-diskon").innerText = r.diskon > 0
    ? "Selamat! Total belanja mencapai " + formatRupiah(BATAS_DISKON) + ", diskon " + PERSEN_DISKON + "% didapat."
    : "Belanja " + formatRupiah(BATAS_DISKON - r.total) + " lagi untuk mendapat diskon " + PERSEN_DISKON + "%.";
}

function tampilkanKembalian() {
  const akhir = hitungRingkasan().akhir;
  const bayar = parseFloat(inputBayar.value);
  const info = document.getElementById("info-kembalian");
  let teks = "";
  let kelas = "keterangan";

  if (keranjang.length === 0) {
    teks = "Keranjang masih kosong.";
  } else if (isNaN(bayar)) {
    teks = "Masukkan nominal uang bayar.";
  } else if (bayar < akhir) {
    teks = "Uang belum mencukupi, kurang " + formatRupiah(akhir - bayar) + ".";
    kelas = "keterangan merah";
  } else {
    teks = "Kembalian: " + formatRupiah(bayar - akhir);
    kelas = "keterangan hijau";
  }

  info.innerText = teks;
  info.className = kelas;
}

function tampilkanSemua() {
  tampilkanKeranjang();
  tampilkanRingkasan();
  tampilkanKembalian();
}

// ----- Aksi -----

function tambahBarang() {
  if (!validasiForm()) {
    return; // ada input salah, barang tidak masuk keranjang
  }
  keranjang.push({
    nama: inputNama.value.trim(),
    harga: parseFloat(inputHarga.value),
    qty: parseFloat(inputQty.value)
  });
  simpanKeranjang();
  resetForm();
  tampilkanSemua();
}

function hapusBarang(index) {
  keranjang = keranjang.filter(function (item, i) {
    return i !== index;
  });
  simpanKeranjang();
  tampilkanSemua();
}

function transaksiBaru() {
  keranjang = [];
  localStorage.removeItem(KUNCI);
  inputBayar.value = "";
  resetForm();
  tampilkanSemua();
}

// ----- Event handler -----
document.getElementById("btn-tambah").addEventListener("click", tambahBarang);
document.getElementById("btn-reset").addEventListener("click", transaksiBaru);
inputBayar.addEventListener("input", tampilkanKembalian);

tampilkanSemua();
