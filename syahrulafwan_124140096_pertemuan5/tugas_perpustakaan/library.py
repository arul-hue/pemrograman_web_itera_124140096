"""Pengelolaan koleksi perpustakaan."""

from library_item import LibraryItem


class Library:
    """Menambah, menampilkan, dan mencari item."""

    def __init__(self):
        self.__koleksi = {}

    def tambah_item(self, item: LibraryItem) -> bool:
        """Simpan item jika ID-nya belum digunakan."""
        kunci = item.item_id.casefold()
        if kunci in self.__koleksi:
            return False
        self.__koleksi[kunci] = item
        return True

    def tampilkan_katalog(self) -> None:
        """Tampilkan detail setiap item yang tersedia."""
        tersedia = [item for item in self.__koleksi.values() if not item.is_dipinjam]
        if not tersedia:
            print("Tidak ada item yang tersedia.")
        for item in tersedia:
            print(item.get_detail())

    def cari_item(self, kata_kunci: str) -> list[LibraryItem]:
        """Cari berdasarkan ID persis atau bagian dari judul."""
        kata_kunci = kata_kunci.strip().casefold()
        if not kata_kunci:
            return []
        return [
            item for item in self.__koleksi.values()
            if item.item_id.casefold() == kata_kunci
            or kata_kunci in item.judul.casefold()
        ]
