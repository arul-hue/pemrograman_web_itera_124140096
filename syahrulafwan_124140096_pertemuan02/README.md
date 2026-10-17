# PAW Pertemuan 2 — Tracker Tugas Kuliah (Taskora)

**Nama:** Syahrul Afwan · **NIM:** 124140096 · **Kelas:** RA
**Mata kuliah:** Pengembangan Aplikasi Web (PAW) — Teknik Informatika ITERA
**Topik:** JavaScript Next Gen (ES6+)

Tugas Personal Dashboard berupa **aplikasi pencatat tugas kuliah** yang dibuat khusus untuk kebutuhan mahasiswa: mencatat tugas, memantau tenggat, dan melihat jadwal kuliah harian dalam satu halaman.

## Fitur aplikasi

- **Tambah, edit, dan hapus** tugas (nama, mata kuliah, tenggat, prioritas).
- Menandai tugas **selesai / belum selesai**.
- **Pencarian** nama tugas serta **filter** mata kuliah dan status.
- Formulir tugas **tersembunyi** dan baru muncul saat tombol **Tambah tugas** diklik (atau saat mengedit); setelah disimpan atau dibatalkan, formulir tertutup lagi.
- Ringkasan **total, belum selesai, dan selesai**.
- **Pengingat tenggat**: tugas yang jatuh tempo dalam 3 hari (atau terlambat) ditampilkan di bagian atas.
- **Jadwal kuliah harian** sesuai hari berjalan.
- Daftar tugas menampilkan **4 tugas pertama**; sisanya dibuka lewat tombol **Selengkapnya**.
- **Sidebar tetap (sticky)** saat halaman di-scroll: Dashboard, Semua tugas, kutipan harian, dan profil.
- Data tugas disimpan di **`localStorage`** sehingga tidak hilang saat halaman dimuat ulang.
- **Kutipan harian** dari DummyJSON Quotes (kutipan cadangan dipakai jika API tidak bisa diakses).
- Tombol **Muat contoh dari API** mengambil tugas contoh dari JSONPlaceholder.
- Filter mata kuliah mengikuti jadwal semester ini: Kapita Selekta, Inteligensi Buatan, Pengembangan Aplikasi Web, Keamanan Siber, Metodologi Penelitian, Jaringan Komputer, Sistem Informasi, dan Pengembangan Aplikasi Mobile. Nama lama "Jarkom" otomatis digabung ke Jaringan Komputer.
- Tampilan responsif untuk desktop dan HP.

## Screenshot

Tugas pada screenshot adalah data contoh yang dimasukkan lewat form aplikasi.

**Dashboard**
![Dashboard](screenshots/01-dashboard.png)

**Daftar tugas dan sidebar yang tetap terlihat saat scroll**
![Daftar tugas](screenshots/02-daftar-tugas-sidebar-sticky.png)

**Tombol "Selengkapnya" menampilkan semua tugas**
![Selengkapnya](screenshots/03-tambah-tugas-baru.png)

**Pencarian tugas**
![Pencarian](screenshots/04-pencarian-filter.png)

**Mode edit tugas**
![Edit tugas](screenshots/05-edit-tugas.png)

**Tampilan mobile**

<img src="screenshots/06-tampilan-mobile.png" alt="Tampilan mobile" width="300">

## Fitur ES6+ yang digunakan

Nomor baris mengacu pada `tugas-praktikum/js/modules/DashboardApp.js` kecuali disebutkan lain.

| Fitur ES6+                           | Lokasi (baris)                                                                                    | Contoh                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `let` dan `const`                    | L6-L10 (`const` untuk nilai tetap), L44 (`let changed` karena nilainya berubah)                   | `const STORAGE_KEY = ...`, `let changed = false`                           |
| Arrow functions (lebih dari 3)       | L24, L55-L59, L69, L78, L101, L179-L182; `helpers.js` L1-L4; `views.js` L5, L9                    | `(event) => this.handleSubmit(event)`                                      |
| Template literals                    | L143, L159, L173, L185, L226, L243, L255; `views.js` L7-L19, L26, L30, L33, L36-L38               | `` `Hapus tugas \"${task.name}\"?` ``                                      |
| Async/await                          | L232 (`loadApiSamples`, await di L237 dan L240), L264 (`loadDailyQuote`, await di L273 dan L275)  | `const response = await fetch(...)`                                        |
| Classes                              | `TaskItem.js` L3, `DashboardApp.js` L12                                                           | `export class DashboardApp { ... }`                                        |
| Destructuring pada parameter fungsi  | `TaskItem.js` L4; L78, L85, L181, L241-L242, L280; `views.js` L29, L35                            | `constructor({ id, name, course, ... })`                                   |
| Destructuring objek dan array        | L81, L275, L281, L286; `views.js` L6, L23                                                         | `const { action, id } = button.dataset`, `const [icon, title, hint] = ...` |
| Default parameter                    | `TaskItem.js` L4; L265                                                                            | `priority = 'medium', completed = false`                                   |
| Spread pada objek (update immutable) | `TaskItem.js` L27 dan L31; L106                                                                   | `new TaskItem({ ...this, ...changes })`                                    |
| Spread pada array state (immutable)  | L72, L106, L114, L194, L252                                                                       | `this.tasks = [...this.tasks, ...samples]`                                 |
| `try/catch/finally` untuk error      | L22-L27, L236-L261, L272-L290                                                                     |                                                                            |
| Modules (`import` / `export`)        | `DashboardApp.js` L1-L4 dan L12; `TaskItem.js` L3; `data.js`, `helpers.js`, `views.js`, `main.js` | `import { TaskItem } from './TaskItem.js'`                                 |
| Method array modern                  | L24, L112, L144, L179-L182, L207-L210, L218                                                       | `map`, `filter`, `find`, `some`, `sort`                                    |

## Arsitektur

- `class TaskItem` memodelkan satu tugas (`id`, `name`, `course`, `deadline`, `priority`, `completed`, `source`) dengan method `getPriorityLabel()`, `getDaysLeft()`, `update()` (menghasilkan `TaskItem` baru), dan `toJSON()`.
- `class DashboardApp` mengelola state `tasks`, operasi `localStorage`, event listener, dan pemanggilan `fetch()`.
- `views.js` berisi fungsi kecil yang mengubah data menjadi HTML dengan template literals; `data.js` berisi data tetap (mata kuliah, jadwal, kutipan cadangan); `helpers.js` berisi fungsi bantu.
- State tidak dimutasi langsung: perubahan dilakukan dengan `map`, `filter`, dan spread operator, lalu disimpan kembali lewat `refresh()`.

## Menjalankan aplikasi

1. Ekstrak ZIP dan buka folder proyek di VS Code.
2. Buka folder `tugas-praktikum`, klik kanan `index.html`, lalu pilih **Open with Live Server**.
   JavaScript Modules tidak berjalan jika `index.html` dibuka langsung (double-click), jadi gunakan server lokal.
3. Latihan di folder `modul/` dibuka dengan cara yang sama.

## API publik yang digunakan (gratis, tanpa API key)

| API                                                   | Dipakai untuk                                                                                   |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `https://dummyjson.com/quotes?limit=0`                | Kutipan harian di sidebar. Aplikasi memilih kutipan acak yang berbeda dari kutipan terakhir.    |
| `https://jsonplaceholder.typicode.com/todos?_limit=5` | Tombol **Muat contoh dari API**: contoh tugas ditambahkan tanpa menghapus tugas yang sudah ada. |

Jika API tidak dapat diakses, aplikasi menampilkan pesan dan kutipan cadangan.
