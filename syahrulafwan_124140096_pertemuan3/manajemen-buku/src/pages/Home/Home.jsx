import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  // buku yang sedang diedit (null berarti form dalam mode tambah)
  const [editingBook, setEditingBook] = useState(null);

  // Saring buku sesuai status dan kata pencarian (judul atau penulis)
  const search = keyword.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const matchStatus = statusFilter === 'semua' || book.status === statusFilter;
    const matchSearch =
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);
    return matchStatus && matchSearch;
  });

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook(data);
    }
  };

  const handleDelete = (id) => {
    deleteBook(id);
    // kalau buku yang dihapus sedang diedit, tutup mode edit
    if (editingBook && editingBook.id === id) {
      setEditingBook(null);
    }
  };

  return (
    <div className="home">
      {/* key membuat form dibuat ulang saat pindah antara tambah dan edit */}
      <BookForm
        key={editingBook ? editingBook.id : 'baru'}
        onSubmit={handleSubmit}
        bookToEdit={editingBook}
        onCancel={() => setEditingBook(null)}
      />

      <h2>Daftar Buku</h2>
      <BookFilter
        keyword={keyword}
        statusFilter={statusFilter}
        onKeywordChange={setKeyword}
        onStatusChange={setStatusFilter}
      />
      <BookList
        books={filteredBooks}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
