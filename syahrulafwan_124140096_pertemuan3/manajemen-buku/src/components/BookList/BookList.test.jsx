import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

describe('Komponen BookList', () => {
  const books = [
    { id: 1, title: 'Bumi', author: 'Tere Liye', status: 'milik' },
    { id: 2, title: 'Pulang', author: 'Tere Liye', status: 'beli' },
  ];
  const mockEdit = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('menampilkan judul, penulis, dan status buku', () => {
    render(<BookList books={books} onEdit={mockEdit} onDelete={mockDelete} />);

    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.getByText('Pulang')).toBeInTheDocument();
    expect(screen.getByText('Milik')).toBeInTheDocument();
    expect(screen.getByText('Ingin Dibeli')).toBeInTheDocument();
  });

  test('menampilkan pesan kalau daftar kosong', () => {
    render(<BookList books={[]} onEdit={mockEdit} onDelete={mockDelete} />);

    expect(screen.getByText('Tidak ada buku.')).toBeInTheDocument();
  });

  test('tombol Hapus memanggil onDelete dengan id buku', () => {
    render(<BookList books={books} onEdit={mockEdit} onDelete={mockDelete} />);

    fireEvent.click(screen.getAllByText('Hapus')[0]);

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  test('tombol Edit memanggil onEdit dengan data buku', () => {
    render(<BookList books={books} onEdit={mockEdit} onDelete={mockDelete} />);

    fireEvent.click(screen.getAllByText('Edit')[1]);

    expect(mockEdit).toHaveBeenCalledWith(books[1]);
  });
});
