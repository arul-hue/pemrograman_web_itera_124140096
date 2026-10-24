import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Komponen Navbar', () => {
  test('menampilkan judul dan link ke dua halaman', () => {
    render(
      <MemoryRouter>
        <Navbar title="Manajemen Buku" />
      </MemoryRouter>
    );

    expect(screen.getByText('Manajemen Buku')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Beranda' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'Statistik' })).toHaveAttribute(
      'href',
      '/statistik'
    );
  });
});
