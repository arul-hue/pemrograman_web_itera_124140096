"""Tugas 3: menggunakan seluruh fungsi modul melalui dua cara impor."""

# Cara 1: impor modul, lalu akses fungsi dengan nama_modul.nama_fungsi().
import math_operations

# Cara 2: impor fungsi tertentu agar dapat dipanggil secara langsung.
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin


def main():
    """Cetak hasil setiap fungsi dengan dua input; tanpa nilai kembali."""
    print("Pengujian modul matematika")
    print(f"Konstanta PI = {math_operations.PI}\n")

    print("Persegi")
    for sisi in [4, 7]:
        luas = math_operations.luas_persegi(sisi)
        keliling = math_operations.keliling_persegi(sisi)
        print(f"Sisi {sisi}: luas = {luas:.2f}, keliling = {keliling:.2f}")

    print("\nPersegi panjang")
    for panjang, lebar in [(6, 3), (10, 5)]:
        luas = math_operations.luas_persegi_panjang(panjang, lebar)
        keliling = math_operations.keliling_persegi_panjang(panjang, lebar)
        print(f"Panjang {panjang}, lebar {lebar}: "
              f"luas = {luas:.2f}, keliling = {keliling:.2f}")

    print("\nLingkaran")
    for jari_jari in [7, 10]:
        luas = math_operations.luas_lingkaran(jari_jari)
        keliling = math_operations.keliling_lingkaran(jari_jari)
        print(f"Jari-jari {jari_jari}: "
              f"luas = {luas:.2f}, keliling = {keliling:.2f}")
    print("Luas: satuan kuadrat | Keliling: satuan panjang")

    print("\nKonversi suhu")
    for celsius in [0, 100]:
        fahrenheit = celsius_ke_fahrenheit(celsius)
        kelvin = celsius_ke_kelvin(celsius)
        print(f"{celsius:.2f} C = {fahrenheit:.2f} F = {kelvin:.2f} K")


if __name__ == "__main__":
    main()
