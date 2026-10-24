import React from 'react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBooks();
  const { total, milik, baca, beli } = useBookStats(books);

  return (
    <div className="stats">
      <h2>Statistik Buku</h2>
      <table>
        <tbody>
          <tr>
            <td>Total buku</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Milik</td>
            <td>{milik}</td>
          </tr>
          <tr>
            <td>Sedang dibaca</td>
            <td>{baca}</td>
          </tr>
          <tr>
            <td>Ingin dibeli</td>
            <td>{beli}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
