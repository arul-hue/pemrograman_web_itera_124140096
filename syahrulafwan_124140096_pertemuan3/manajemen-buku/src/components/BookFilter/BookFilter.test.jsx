import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('Komponen BookFilter', () => {
  const mockKeyword = vi.fn();
  const mockStatus = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('memanggil onKeywordChange saat mengetik di kolom cari', () => {
    render(
      <BookFilter
        keyword=""
        statusFilter="semua"
        onKeywordChange={mockKeyword}
        onStatusChange={mockStatus}
      />
    );

    fireEvent.change(screen.getByLabelText('Cari buku'), {
      target: { value: 'bumi' },
    });

    expect(mockKeyword).toHaveBeenCalledWith('bumi');
  });

  test('memanggil onStatusChange saat status dipilih', () => {
    render(
      <BookFilter
        keyword=""
        statusFilter="semua"
        onKeywordChange={mockKeyword}
        onStatusChange={mockStatus}
      />
    );

    fireEvent.change(screen.getByLabelText('Filter status'), {
      target: { value: 'baca' },
    });

    expect(mockStatus).toHaveBeenCalledWith('baca');
  });
});
