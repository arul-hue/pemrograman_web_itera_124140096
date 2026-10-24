# Task Manager (gabungan latihan modul Pertemuan 3)

Project Vite + React yang berisi hasil akhir seluruh latihan modul React Basics.

## Menjalankan

```bash
npm install
npm run dev     # buka http://localhost:5173
npm test        # unit test TaskItem (Vitest + React Testing Library)
```

## Catatan

- `src/main.jsx` memakai `createRoot(...).render(<App />)` tanpa `<StrictMode>`.
  Kode `Home.jsx` pada submodul 3 membaca dan menyimpan `localStorage` lewat dua
  `useEffect`; di mode dev, StrictMode menjalankan efek dua kali sehingga data
  tersimpan tertimpa `[]` saat halaman di-refresh.
- Tombol "Hapus Semua Tugas" (latihan submodul 3) memakai `clearTasks()` di
  `TaskContext.jsx` setelah state dipindah ke Context API (submodul 6).
