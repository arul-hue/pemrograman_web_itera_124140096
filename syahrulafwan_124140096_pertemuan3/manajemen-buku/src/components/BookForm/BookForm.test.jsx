import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

describe('Komponen BookForm', () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('menampilkan pesan error kalau judul dan penulis kosong', () => {
    render(<BookForm onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(screen.getByText('Judul wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Penulis wajib diisi')).toBeInTheDocument();
    // input yang kosong diberi border merah (class input-error)
    expect(screen.getByLabelText('Judul')).toHaveClass('input-error');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('memanggil onSubmit dengan data yang diisi lalu mengosongkan form', () => {
    render(<BookForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Judul'), {
      target: { value: 'Laskar Pelangi' },
    });
    fireEvent.change(screen.getByLabelText('Penulis'), {
      target: { value: 'Andrea Hirata' },
    });
    fireEvent.change(screen.getByLabelText('Status'), {
      target: { value: 'baca' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'baca',
    });
    expect(screen.getByLabelText('Judul')).toHaveValue('');
  });

  test('mode edit: form terisi data buku dan ada tombol batal', () => {
    const book = { id: 1, title: 'Bumi', author: 'Tere Liye', status: 'milik' };
    render(<BookForm onSubmit={mockSubmit} bookToEdit={book} onCancel={vi.fn()} />);

    expect(screen.getByLabelText('Judul')).toHaveValue('Bumi');
    expect(screen.getByLabelText('Penulis')).toHaveValue('Tere Liye');
    expect(
      screen.getByRole('button', { name: 'Simpan Perubahan' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Batal' })).toBeInTheDocument();
  });
});
