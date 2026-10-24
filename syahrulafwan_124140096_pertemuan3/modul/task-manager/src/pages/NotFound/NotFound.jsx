import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', color: '#0284c7' }}>404</h1>
      <p style={{ margin: '1rem 0' }}>Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
}

export default NotFound;
