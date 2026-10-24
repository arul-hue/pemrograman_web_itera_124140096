// Custom hook: menghitung jumlah buku total dan per status
function useBookStats(books) {
  const total = books.length;
  const milik = books.filter((book) => book.status === 'milik').length;
  const baca = books.filter((book) => book.status === 'baca').length;
  const beli = books.filter((book) => book.status === 'beli').length;

  return { total, milik, baca, beli };
}

export default useBookStats;
