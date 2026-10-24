import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('Hook useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('memakai nilai awal kalau localStorage masih kosong', () => {
    const { result } = renderHook(() => useLocalStorage('data', ['a']));

    expect(result.current[0]).toEqual(['a']);
  });

  test('membaca nilai yang sudah tersimpan', () => {
    localStorage.setItem('data', JSON.stringify(['tersimpan']));

    const { result } = renderHook(() => useLocalStorage('data', []));

    expect(result.current[0]).toEqual(['tersimpan']);
  });

  test('menyimpan ke localStorage saat nilai diubah', () => {
    const { result } = renderHook(() => useLocalStorage('data', []));

    act(() => {
      result.current[1](['baru']);
    });

    expect(result.current[0]).toEqual(['baru']);
    expect(JSON.parse(localStorage.getItem('data'))).toEqual(['baru']);
  });
});
