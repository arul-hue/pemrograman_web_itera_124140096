"""Demonstrasi fitur Sistem Manajemen Perpustakaan."""

from library import Library
from library_item import Book, Magazine
from member import Member


def main() -> None:
    perpustakaan = Library()
    buku = Book("B001", "Dasar Pemrograman Python", "Nadia Pratama")
    majalah = Magazine("M001", "Teknologi Hari Ini", "November 2026")

    print("SISTEM MANAJEMEN PERPUSTAKAAN")
    print("\nTambah item")
    for item in (buku, majalah):
        if perpustakaan.tambah_item(item):
            print(f"Berhasil menambahkan {item.judul}")

    print("\nKatalog tersedia")
    perpustakaan.tampilkan_katalog()

    for kata_kunci in ("python", "M001", "astronomi"):
        print(f"\nPencarian: {kata_kunci}")
        hasil = perpustakaan.cari_item(kata_kunci)
        if not hasil:
            print("Item tidak ditemukan.")
        for item in hasil:
            print(item.get_detail())

    anggota = Member("Rani")
    anggota.pinjam_item(buku)
    print(f"\n{anggota.nama} meminjam {buku.judul}.")
    print("Katalog tersedia setelah peminjaman")
    perpustakaan.tampilkan_katalog()


if __name__ == "__main__":
    main()
