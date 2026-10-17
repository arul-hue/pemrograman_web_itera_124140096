export const DEFAULT_COURSES = [
  'Kapita Selekta', 'Inteligensi Buatan', 'Pengembangan Aplikasi Web', 'Keamanan Siber',
  'Metodologi Penelitian', 'Jaringan Komputer', 'Sistem Informasi', 'Pengembangan Aplikasi Mobile'
];

// Jadwal per hari (0 = Minggu ... 6 = Sabtu); hari tanpa kelas tidak perlu ditulis
export const SCHEDULE = {
  1: [{ time: '09.40–12.20', name: 'Kapita Selekta', room: 'GK2 126' },
      { time: '13.00–15.40', name: 'Inteligensi Buatan', room: 'GK2 123' }],
  2: [{ time: '07.30–10.10', name: 'Pengembangan Aplikasi Web', room: 'GK2 405' },
      { time: '13.00–15.40', name: 'Keamanan Siber', room: 'Lab IoT, Labtek 3', note: 'Ingat: kerjakan kuis 1 jam sebelum kelas.' }],
  4: [{ time: '07.30–09.30', name: 'Jaringan Komputer (Praktikum)', room: 'Lab IoT, Labtek 3' },
      { time: '09.20–12.00', name: 'Metodologi Penelitian', room: 'GK2 222' },
      { time: '13.55–15.40', name: 'Jaringan Komputer', room: 'F003' }],
  5: [{ time: '09.20–11.05', name: 'Sistem Informasi', room: 'GK2 305' },
      { time: '13.00–15.40', name: 'Pengembangan Aplikasi Mobile', room: '208B' }]
};

export const FALLBACK_QUOTES = [
  { quote: 'Perjalanan panjang dimulai dari langkah kecil.', author: 'Anonim' },
  { quote: 'Konsistensi lebih penting daripada terburu-buru.', author: 'Anonim' },
  { quote: 'Belajar sedikit demi sedikit tetap membawa kemajuan.', author: 'Anonim' }
];
