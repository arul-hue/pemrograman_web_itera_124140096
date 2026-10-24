import { renderHook } from '@testing-library/react';
import useBookStats from './useBookStats';

describe('Hook useBookStats', () => {
  test('menghitung jumlah buku per status', () => {
    const books = [
      { id: 1, title: 'A', author: 'X', status: 'milik' },
      { id: 2, title: 'B', author: 'X', status: 'milik' },
      { id: 3, title: 'C', author: 'Y', status: 'baca' },
      { id: 4, title: 'D', author: 'Z', status: 'beli' },
    ];

    const { result } = renderHook(() => useBookStats(books));

    expect(result.current).toEqual({ total: 4, milik: 2, baca: 1, beli: 1 });
  });

  test('semua angka 0 kalau belum ada buku', () => {
    const { result } = renderHook(() => useBookStats([]));

    expect(result.current).toEqual({ total: 0, milik: 0, baca: 0, beli: 0 });
  });
});
