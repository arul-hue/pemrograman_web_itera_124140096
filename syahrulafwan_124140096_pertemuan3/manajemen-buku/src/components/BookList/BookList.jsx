import React from 'react';
import PropTypes from 'prop-types';
import { getStatusLabel } from '../../constants';
import './BookList.css';

// Menampilkan daftar buku beserta tombol edit dan hapus
function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty-text">Tidak ada buku.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <div>
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
            <div className="book-status">{getStatusLabel(book.status)}</div>
          </div>
          <div className="book-buttons">
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onDelete(book.id)}>Hapus</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
