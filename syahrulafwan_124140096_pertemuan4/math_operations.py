"""Modul fungsi geometri dan konversi suhu untuk tugas Pertemuan 4."""

PI = 3.14159


def luas_persegi(sisi):
    """Terima panjang sisi; kembalikan luas persegi dalam satuan kuadrat."""
    return sisi * sisi


def keliling_persegi(sisi):
    """Terima sisi; kembalikan keliling persegi dalam satuan panjang."""
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """Terima panjang dan lebar; kembalikan luas dalam satuan kuadrat."""
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Terima panjang dan lebar; kembalikan keliling dalam satuan panjang."""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """Terima jari-jari lingkaran; kembalikan luas dalam satuan kuadrat."""
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari):
    """Terima jari-jari; kembalikan keliling lingkaran dalam satuan panjang."""
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius):
    """Terima suhu Celsius; kembalikan suhu dalam derajat Fahrenheit."""
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius):
    """Terima suhu Celsius; kembalikan suhu dalam Kelvin."""
    return celsius + 273.15
