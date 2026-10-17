# Taskora — Tracker Tugas Kuliah

Tugas Praktikum Pertemuan 2: **Personal Dashboard** (JavaScript Next Gen / ES6+)

| Keterangan | Isi |
|---|---|
| Nama | Syahrul Afwan |
| NIM | 124140096 |
| Kelas | RA |
| Mata Kuliah | Pengembangan Aplikasi Web (PAW) |
| Program Studi | Teknik Informatika, ITERA |

## Tentang Aplikasi

Taskora adalah aplikasi pencatat tugas kuliah untuk kebutuhan mahasiswa sehari-hari. Dalam satu halaman, pengguna bisa mencatat tugas, memantau tenggat, dan melihat jadwal kuliah hari ini. Data tugas disimpan di `localStorage`, jadi tidak hilang saat halaman dimuat ulang.

## Fitur Aplikasi

| Kategori | Fitur |
|---|---|
| Kelola tugas | Tambah, edit, dan hapus tugas (nama, mata kuliah, tenggat, prioritas) |
| | Tandai tugas selesai / belum selesai |
| | Formulir tersembunyi, muncul saat klik **Tambah tugas** atau saat edit, dan menutup lagi setelah disimpan atau dibatalkan |
| Pencarian | Cari nama tugas, filter mata kuliah, dan filter status |
| Ringkasan | Jumlah total, belum selesai, dan selesai |
| | Pengingat tenggat: tugas yang jatuh tempo dalam 3 hari (atau terlambat) tampil di bagian atas |
| | Jadwal kuliah harian sesuai hari berjalan |
| Tampilan | Daftar menampilkan 4 tugas pertama, sisanya lewat tombol **Selengkapnya** |
| | Sidebar tetap (sticky) saat halaman di-scroll |
| | Responsif untuk desktop dan HP |
| Penyimpanan | Data tugas disimpan di `localStorage` |
| Data eksternal | Kutipan harian dari DummyJSON Quotes (ada kutipan cadangan jika API gagal) |
| | Tombol **Muat contoh dari API** untuk mengambil tugas contoh dari JSONPlaceholder |

Filter mata kuliah mengikuti jadwal semester ini: Kapita Selekta, Inteligensi Buatan, Pengembangan Aplikasi Web, Keamanan Siber, Metodologi Penelitian, Jaringan Komputer, Sistem Informasi, dan Pengembangan Aplikasi Mobile. Nama lama "Jarkom" otomatis digabung ke Jaringan Komputer.

## Screenshot

Tugas pada screenshot adalah data contoh yang dimasukkan lewat form aplikasi.

| No | Tampilan | Screenshot |
|---|---|---|
| 1 | Dashboard | <img src="screenshots/01-dashboard.png" alt="Dashboard" width="520"> |
| 2 | Daftar tugas dan sidebar yang tetap terlihat saat scroll | <img src="screenshots/02-daftar-tugas-sidebar-sticky.png" alt="Daftar tugas dan sidebar sticky" width="520"> |
| 3 | Formulir tambah tugas baru | <img src="screenshots/03-tambah-tugas-baru.png" alt="Tambah tugas baru" width="520"> |
| 4 | Pencarian dan filter tugas | <img src="screenshots/04-pencarian-filter.png" alt="Pencarian dan filter" width="520"> |
| 5 | Mode edit tugas | <img src="screenshots/05-edit-tugas.png" alt="Edit tugas" width="520"> |
| 6 | Tampilan mobile | <img src="screenshots/06-tampilan-mobile.png" alt="Tampilan mobile" width="220"> |

## Fitur ES6+ yang Digunakan

Nomor baris mengacu pada `js/modules/DashboardApp.js`, kecuali disebutkan lain.

| Fitur ES6+ | Lokasi (baris) | Contoh |
|---|---|---|
| `let` dan `const` | L6-L10 (`const` untuk nilai tetap), L44 (`let changed` karena nilainya berubah) | `const STORAGE_KEY = ...`, `let changed = false` |
| Arrow functions (lebih dari 3) | L24, L55-L59, L69, L78, L101, L179-L182; `helpers.js` L1-L4; `views.js` L5, L9 | `(event) => this.handleSubmit(event)` |
| Template literals | L143, L159, L173, L185, L226, L243, L255; `views.js` L7-L19, L26, L30, L33, L36-L38 | `` `Hapus tugas \"${task.name}\"?` `` |
| Async/await | L232 (`loadApiSamples`, await di L237 dan L240), L264 (`loadDailyQuote`, await di L273 dan L275) | `const response = await fetch(...)` |
| Classes | `TaskItem.js` L3, `DashboardApp.js` L12 | `export class DashboardApp { ... }` |
| Destructuring pada parameter fungsi | `TaskItem.js` L4; L78, L85, L181, L241-L242, L280; `views.js` L29, L35 | `constructor({ id, name, course, ... })` |
| Destructuring objek dan array | L81, L275, L281, L286; `views.js` L6, L23 | `const { action, id } = button.dataset`, `const [icon, title, hint] = ...` |
| Default parameter | `TaskItem.js` L4; L265 | `priority = 'medium', completed = false` |
| Spread pada objek (update immutable) | `TaskItem.js` L27 dan L31; L106 | `new TaskItem({ ...this, ...changes })` |
| Spread pada array state (immutable) | L72, L106, L114, L194, L252 | `this.tasks = [...this.tasks, ...samples]` |
| `try/catch/finally` | L22-L27, L236-L261, L272-L290 | `try { ... } catch { ... } finally { ... }` |
| Modules (`import` / `export`) | `DashboardApp.js` L1-L4 dan L12; `TaskItem.js` L3; `data.js`, `helpers.js`, `views.js`, `main.js` | `import { TaskItem } from './TaskItem.js'` |
| Method array modern | L24, L112, L144, L179-L182, L207-L210, L218 | `map`, `filter`, `find`, `some`, `sort` |

## Struktur Folder

```text
syahrulafwan_124140096_pertemuan02/
├── README.md
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── modules/
│       ├── TaskItem.js
│       ├── DashboardApp.js
│       ├── views.js
│       ├── data.js
│       └── helpers.js
├── modul/                    # latihan per topik
│   ├── 01-variables/
│   ├── 02-arrow-functions/
│   ├── 03-template-literals/
│   ├── 04-destructuring-spread/
│   ├── 05-array-methods/
│   ├── 06-async-await/
│   └── 07-classes/
└── screenshots/              # tangkapan layar aplikasi
```

## Arsitektur Kode

| File | Peran |
|---|---|
| `js/main.js` | Entry point (`type="module"`), membuat dan menjalankan `DashboardApp` |
| `js/modules/TaskItem.js` | `class TaskItem`: model satu tugas (`id`, `name`, `course`, `deadline`, `priority`, `completed`, `source`) dengan method `getPriorityLabel()`, `getDaysLeft()`, `update()` (menghasilkan `TaskItem` baru), dan `toJSON()` |
| `js/modules/DashboardApp.js` | `class DashboardApp`: mengelola state `tasks`, `localStorage`, event listener, dan `fetch()` |
| `js/modules/views.js` | Fungsi kecil yang mengubah data menjadi HTML dengan template literals |
| `js/modules/data.js` | Data tetap: daftar mata kuliah, jadwal, dan kutipan cadangan |
| `js/modules/helpers.js` | Fungsi bantu: `$`, `formatDate`, `escapeHTML`, dan sebagainya |
| `css/style.css` | Gaya tampilan aplikasi |

State tidak dimutasi langsung. Perubahan dilakukan dengan `map`, `filter`, dan spread operator, lalu disimpan kembali lewat `refresh()`.

## Menjalankan Aplikasi

1. Ekstrak ZIP dan buka foldernya di VS Code.
2. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
3. Jangan buka `index.html` dengan double-click, karena JavaScript Modules hanya berjalan lewat server lokal.
4. Latihan di folder `modul/` dibuka dengan cara yang sama.

## API Publik yang Digunakan

Gratis dan tanpa API key. Jika API tidak dapat diakses, aplikasi menampilkan pesan dan kutipan cadangan.

| API | Dipakai untuk |
|---|---|
| `https://dummyjson.com/quotes?limit=0` | Kutipan harian di sidebar. Aplikasi memilih kutipan acak yang berbeda dari kutipan terakhir. |
| `https://jsonplaceholder.typicode.com/todos?_limit=5` | Tombol **Muat contoh dari API**: contoh tugas ditambahkan tanpa menghapus tugas yang sudah ada. |

## Latihan per Topik (folder `modul/`)

Setiap folder berisi `index.html` dan `script.js`. Soalnya mengikuti halaman latihan di modul Pertemuan 2. Latihan `06-async-await` membutuhkan koneksi internet.

| Folder | Soal yang dikerjakan |
|---|---|
| `01-variables` | Mengubah nilai `const` dan melihat error; membandingkan `var` dan `let` di dalam dan luar block |
| `02-arrow-functions` | Arrow function dengan berbagai sintaks; fungsi biasa vs arrow (implicit return dan `this`) |
| `03-template-literals` | Membuat HTML string dengan template literals; perbandingan cara lama vs cara baru |
| `04-destructuring-spread` | Nested destructuring 3 level; rest parameters (min, max, average); merge 3 object dengan spread; destructuring di `for...of` |
| `05-array-methods` | `groupBy` dengan `reduce()`; rata-rata array of objects; meratakan array bersarang; gabungan `filter`, `map`, `reduce` |
| `06-async-await` | Fetch beberapa endpoint; retry exponential backoff; loading state; error boundary; pagination; debounced search |
| `07-classes` | `Product` dengan `DigitalProduct` dan `PhysicalProduct`; getter/setter; computed property names; default parameters + destructuring |
