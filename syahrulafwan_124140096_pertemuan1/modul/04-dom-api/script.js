// Pertemuan 1 - Manipulasi DOM & Fetch API

// MANIPULASI DOM
const domOutput = document.getElementById("dom-output");
let itemCount = 0;

// Menambahkan item
document
  .getElementById("btn-tambah-item")
  .addEventListener("click", function () {
    itemCount++;
    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.innerText = `Item ${itemCount}`;
    domOutput.appendChild(newItem);
  });

// Menghapus item
document
  .getElementById("btn-hapus-item")
  .addEventListener("click", function () {
    if (domOutput.lastChild) {
      domOutput.removeChild(domOutput.lastChild);
      itemCount--;
    }
  });

// Mengubah warna background
document
  .getElementById("btn-ubah-warna")
  .addEventListener("click", function () {
    const colors = ["#bbdefb", "#c8e6c9", "#fff9c4", "#f8bbd0"];
    domOutput.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    domOutput.style.padding = "8px";
  });

// FETCH API
const apiOutput = document.getElementById("api-output");
const inputCari = document.getElementById("input-cari");
const PER_HALAMAN = 5;
let semuaPost = [];
let halaman = 1;

// Mengambil data dengan async/await
document
  .getElementById("btn-fetch")
  .addEventListener("click", async function () {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      semuaPost = await response.json();
      halaman = 1;
      tampilkanPost();
    } catch (error) {
      console.error("Error fetching data:", error);
      apiOutput.innerHTML = `<p class="merah">Gagal mengambil data: ${error.message}</p>`;
    }
  });

// Post yang judulnya cocok dengan kata pencarian (latihan search)
function postTersaring() {
  const kata = inputCari.value.trim().toLowerCase();
  return semuaPost.filter((post) => post.title.toLowerCase().includes(kata));
}

// Menampilkan post sesuai halaman (latihan pagination)
function tampilkanPost() {
  const hasil = postTersaring();
  const jumlahHalaman = Math.ceil(hasil.length / PER_HALAMAN);

  if (hasil.length === 0) {
    apiOutput.innerHTML = "<p>Tidak ada post yang cocok.</p>";
    document.getElementById("info-halaman").innerText = "";
    return;
  }

  halaman = Math.min(halaman, jumlahHalaman);
  const awal = (halaman - 1) * PER_HALAMAN;

  apiOutput.innerHTML =
    "<h3>Daftar Post:</h3>" +
    hasil
      .slice(awal, awal + PER_HALAMAN)
      .map(
        (post) => `
    <div class="item"><h4>${post.title}</h4><p>${post.body}</p></div>
  `,
      )
      .join("");
  document.getElementById("info-halaman").innerText =
    `Halaman ${halaman} dari ${jumlahHalaman}`;
}

inputCari.addEventListener("input", function () {
  halaman = 1;
  tampilkanPost();
});

document.getElementById("btn-prev").addEventListener("click", function () {
  if (halaman > 1) {
    halaman--;
    tampilkanPost();
  }
});

document.getElementById("btn-next").addEventListener("click", function () {
  if (halaman < Math.ceil(postTersaring().length / PER_HALAMAN)) {
    halaman++;
    tampilkanPost();
  }
});

// DARK MODE
document.getElementById("btn-dark").addEventListener("click", function () {
  document.body.classList.toggle("gelap");
});
