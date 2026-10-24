import { useState, useEffect } from 'react';

// Custom hook: sama seperti useState, tapi nilainya disimpan di localStorage
function useLocalStorage(key, initialValue) {
  // Nilai awal dibaca dari localStorage (hanya sekali saat pertama render)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // kalau data rusak atau tidak bisa dibaca, pakai nilai awal
      console.error('Gagal membaca localStorage:', error);
      return initialValue;
    }
  });

  // Setiap nilai berubah, simpan lagi ke localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Gagal menyimpan ke localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
