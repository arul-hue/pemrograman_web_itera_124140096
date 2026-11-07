"""Tugas 1: menghitung BMI dari berat (kg) dan tinggi (m)."""


def hitung_bmi(berat, tinggi):
    """Terima berat (kg) dan tinggi positif (m); kembalikan nilai BMI."""
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi):
    """Terima nilai BMI; kembalikan kategori berat badan berupa string."""
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    """Baca input, cetak BMI dan kategori; tidak mengembalikan nilai."""
    print("Program penghitung BMI")
    berat = float(input("Masukkan berat badan (kg): "))
    tinggi = float(input("Masukkan tinggi badan (m): "))

    if berat <= 0 or tinggi <= 0:
        print("Berat dan tinggi badan harus lebih dari nol.")
        return

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori(bmi)
    print("\nHasil perhitungan")
    print(f"Berat badan : {berat:.2f} kg")
    print(f"Tinggi badan: {tinggi:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()
