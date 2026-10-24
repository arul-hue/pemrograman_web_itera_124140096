import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../constants';
import './BookFilter.css';

// Pencarian (judul/penulis) dan filter status.
// Nilainya disimpan di komponen induk (Home), di sini hanya tampilan.
function BookFilter({ keyword, statusFilter, onKeywordChange, onStatusChange }) {
  return (
    <div className="book-filter">
      <input
        type="text"
        placeholder="Cari judul atau penulis"
        aria-label="Cari buku"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
      <select
        aria-label="Filter status"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="semua">Semua Status</option>
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  keyword: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default BookFilter;
