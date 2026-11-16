"""Model item yang dapat disimpan di perpustakaan."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Menyimpan identitas dan status ketersediaan setiap item."""

    def __init__(self, item_id: str, judul: str):
        self._item_id = item_id
        self._judul = judul
        self.__is_dipinjam = False

    @property
    def item_id(self) -> str:
        return self._item_id

    @property
    def judul(self) -> str:
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        return self.__is_dipinjam

    def pinjam(self) -> bool:
        """Tandai item sebagai dipinjam jika masih tersedia."""
        if self.__is_dipinjam:
            return False
        self.__is_dipinjam = True
        return True

    def kembalikan(self) -> None:
        self.__is_dipinjam = False

    @abstractmethod
    def get_detail(self) -> str:
        """Kembalikan deskripsi sesuai jenis item."""


class Book(LibraryItem):
    """Buku dengan informasi penulis."""

    def __init__(self, item_id: str, judul: str, penulis: str):
        super().__init__(item_id, judul)
        self.penulis = penulis

    def get_detail(self) -> str:
        return f"[{self.item_id}] Buku: {self.judul} | Penulis: {self.penulis}"


class Magazine(LibraryItem):
    """Majalah dengan informasi edisi."""

    def __init__(self, item_id: str, judul: str, edisi: str):
        super().__init__(item_id, judul)
        self.edisi = edisi

    def get_detail(self) -> str:
        return f"[{self.item_id}] Majalah: {self.judul} | Edisi: {self.edisi}"
