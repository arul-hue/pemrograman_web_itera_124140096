"""Tugas 2: mengelola nilai mahasiswa menggunakan list dan dictionary."""


def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    """Terima tiga nilai numerik; kembalikan nilai berbobot 30%, 40%, 30%."""
    return 0.30 * nilai_uts + 0.40 * nilai_uas + 0.30 * nilai_tugas


def tentukan_grade(nilai_akhir):
    """Terima nilai akhir; kembalikan string grade A, B, C, D, atau E."""
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def main():
    """Olah lima data contoh dan cetak rekap; tidak mengembalikan nilai."""
    # Seluruh nama, NIM, dan nilai berikut merupakan data contoh.
    daftar_mahasiswa = [
        {"nama": "Andi", "nim": "124140001", "nilai_uts": 85,
         "nilai_uas": 90, "nilai_tugas": 80},
        {"nama": "Budi", "nim": "124140002", "nilai_uts": 70,
         "nilai_uas": 75, "nilai_tugas": 80},
        {"nama": "Citra", "nim": "124140003", "nilai_uts": 65,
         "nilai_uas": 60, "nilai_tugas": 70},
        {"nama": "Dewi", "nim": "124140004", "nilai_uts": 50,
         "nilai_uas": 55, "nilai_tugas": 60},
        {"nama": "Eko", "nim": "124140005", "nilai_uts": 40,
         "nilai_uas": 45, "nilai_tugas": 50},
    ]

    for mahasiswa in daftar_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(
            mahasiswa["nilai_uts"], mahasiswa["nilai_uas"],
            mahasiswa["nilai_tugas"]
        )
        mahasiswa["nilai_akhir"] = nilai_akhir
        mahasiswa["grade"] = tentukan_grade(nilai_akhir)

    print("Rekap nilai mahasiswa")
    print("Bobot: UTS 30% | UAS 40% | Tugas 30%\n")
    print(f"{'Nama':<12} {'NIM':<12} {'UTS':>5} {'UAS':>5} "
          f"{'Tugas':>5} {'Nilai Akhir':>12} {'Grade':>6}")
    print("-" * 69)
    for mahasiswa in daftar_mahasiswa:
        print(
            f"{mahasiswa['nama']:<12} {mahasiswa['nim']:<12} "
            f"{mahasiswa['nilai_uts']:>5} {mahasiswa['nilai_uas']:>5} "
            f"{mahasiswa['nilai_tugas']:>5} "
            f"{mahasiswa['nilai_akhir']:>12.2f} {mahasiswa['grade']:>6}"
        )

    tertinggi = daftar_mahasiswa[0]
    terendah = daftar_mahasiswa[0]
    for mahasiswa in daftar_mahasiswa:
        if mahasiswa["nilai_akhir"] > tertinggi["nilai_akhir"]:
            tertinggi = mahasiswa
        if mahasiswa["nilai_akhir"] < terendah["nilai_akhir"]:
            terendah = mahasiswa

    print("\nMahasiswa dengan nilai tertinggi")
    print(f"Nama: {tertinggi['nama']} | NIM: {tertinggi['nim']}")
    print(f"Nilai akhir: {tertinggi['nilai_akhir']:.2f} | "
          f"Grade: {tertinggi['grade']}")
    print("\nMahasiswa dengan nilai terendah")
    print(f"Nama: {terendah['nama']} | NIM: {terendah['nim']}")
    print(f"Nilai akhir: {terendah['nilai_akhir']:.2f} | "
          f"Grade: {terendah['grade']}")


if __name__ == "__main__":
    main()
