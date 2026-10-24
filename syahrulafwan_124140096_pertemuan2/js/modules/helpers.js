export const $ = (selector) => document.querySelector(selector);
export const lower = (text) => text.toLocaleLowerCase('id');
export const formatDate = (date, options) => new Intl.DateTimeFormat('id-ID', options).format(date);
export const makeId = () => `task-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

// Tanggal hari ini + n hari, format YYYY-MM-DD (cocok untuk input type="date")
export const dateAfter = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('sv-SE');
};

export const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
