// Pilihan status buku, dipakai di form, filter, dan daftar buku
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Milik' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
];

// Mengubah nilai status (misal 'baca') jadi tulisan yang tampil di layar
export function getStatusLabel(value) {
  const found = STATUS_OPTIONS.find((option) => option.value === value);
  return found ? found.label : value;
}
