"""Model anggota untuk demonstrasi peminjaman."""

from library_item import LibraryItem


class Member:
    """Mencatat item yang dipinjam oleh seorang anggota."""

    def __init__(self, nama: str):
        self.nama = nama
        self.__pinjaman = []

    def pinjam_item(self, item: LibraryItem) -> bool:
        """Catat pinjaman saat item berhasil dipinjam."""
        if not item.pinjam():
            return False
        self.__pinjaman.append(item)
        return True

    def kembalikan_item(self, item: LibraryItem) -> bool:
        """Kembalikan item yang tercatat atas nama anggota ini."""
        if item not in self.__pinjaman:
            return False
        self.__pinjaman.remove(item)
        item.kembalikan()
        return True
