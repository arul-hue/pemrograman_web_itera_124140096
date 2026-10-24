import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Test gabungan: App + Context + Router + localStorage
describe('Aplikasi Manajemen Buku', () => {
  const seedBooks = [
    { id: 1, title: 'Bumi', author: 'Tere Liye', status: 'milik' },
    { id: 2, title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'baca' },
    { id: 3, title: 'Pulang', author: 'Tere Liye', status: 'beli' },
  ];

  const renderApp = (path = '/') =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );

  beforeEach(() => {
    localStorage.clear();
  });

  test('menambah buku baru dan menyimpannya ke localStorage', () => {
    renderApp();

    fireEvent.change(screen.getByLabelText('Judul'), {
      target: { value: 'Negeri 5 Menara' },
    });
    fireEvent.change(screen.getByLabelText('Penulis'), {
      target: { value: 'Ahmad Fuadi' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(screen.getByText('Negeri 5 Menara')).toBeInTheDocument();
    const saved = JSON.parse(localStorage.getItem('books'));
    expect(saved).toHaveLength(1);
    expect(saved[0].title).toBe('Negeri 5 Menara');
  });

  test('mengedit buku', () => {
    localStorage.setItem('books', JSON.stringify(seedBooks));
    renderApp();

    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByLabelText('Judul'), {
      target: { value: 'Bumi (Edisi Baru)' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Simpan Perubahan' }));

    expect(screen.getByText('Bumi (Edisi Baru)')).toBeInTheDocument();
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
  });

  test('menghapus buku', () => {
    localStorage.setItem('books', JSON.stringify(seedBooks));
    renderApp();

    fireEvent.click(screen.getAllByText('Hapus')[0]);

    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('books'))).toHaveLength(2);
  });

  test('filter berdasarkan status', () => {
    localStorage.setItem('books', JSON.stringify(seedBooks));
    renderApp();

    fireEvent.change(screen.getByLabelText('Filter status'), {
      target: { value: 'baca' },
    });

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
    expect(screen.queryByText('Pulang')).not.toBeInTheDocument();
  });

  test('pencarian berdasarkan judul atau nama penulis', () => {
    localStorage.setItem('books', JSON.stringify(seedBooks));
    renderApp();

    // cari lewat nama penulis
    fireEvent.change(screen.getByLabelText('Cari buku'), {
      target: { value: 'tere' },
    });
    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.getByText('Pulang')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();

    // cari lewat judul
    fireEvent.change(screen.getByLabelText('Cari buku'), {
      target: { value: 'laskar' },
    });
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
  });

  test('halaman Statistik menampilkan jumlah buku dari Context', () => {
    localStorage.setItem('books', JSON.stringify(seedBooks));
    renderApp('/statistik');

    expect(screen.getByText('Statistik Buku')).toBeInTheDocument();
    const totalRow = screen.getByText('Total buku').closest('tr');
    expect(totalRow).toHaveTextContent('3');
  });

  test('pindah halaman lewat link di Navbar', () => {
    renderApp();

    fireEvent.click(screen.getByRole('link', { name: 'Statistik' }));

    expect(screen.getByText('Statistik Buku')).toBeInTheDocument();
  });
});
