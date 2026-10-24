import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../constants';
import './BookForm.css';

// Form untuk tambah dan edit buku.
// Kalau bookToEdit ada, form terisi data buku itu (mode edit).
function BookForm({ onSubmit, bookToEdit = null, onCancel = () => {} }) {
  const [title, setTitle] = useState(bookToEdit ? bookToEdit.title : '');
  const [author, setAuthor] = useState(bookToEdit ? bookToEdit.author : '');
  const [status, setStatus] = useState(bookToEdit ? bookToEdit.status : 'milik');
  const [errors, setErrors] = useState({});

  // Cek kolom wajib isi, hasilnya berupa object pesan error
  const validate = () => {
    const newErrors = {};
    if (title.trim() === '') {
      newErrors.title = 'Judul wajib diisi';
    }
    if (author.trim() === '') {
      newErrors.author = 'Penulis wajib diisi';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    // Kalau ada error, berhenti di sini dan jangan simpan
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit({ title: title.trim(), author: author.trim(), status });

    // Setelah tambah buku, kosongkan form lagi
    if (!bookToEdit) {
      setTitle('');
      setAuthor('');
      setStatus('milik');
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{bookToEdit ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <p className="error-text">{errors.author}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          {bookToEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {bookToEdit && (
          <button type="button" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  bookToEdit: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
  }),
  onCancel: PropTypes.func,
};

export default BookForm;
