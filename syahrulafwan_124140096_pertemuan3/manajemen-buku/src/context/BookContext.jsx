import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

// Custom hook untuk mengambil isi context
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

// Provider: menyimpan data buku dan fungsi untuk mengubahnya,
// supaya bisa dipakai di halaman mana pun tanpa kirim props berlapis
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);

  const addBook = (data) => {
    setBooks([...books, { id: Date.now(), ...data }]);
  };

  const updateBook = (id, data) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, ...data } : book)));
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const value = { books, addBook, updateBook, deleteBook };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
