const rupiah = (angka) => 'Rp' + angka.toLocaleString('id-ID');

// Soal 1: class dan inheritance
class Product {
  constructor(nama, harga) {
    this.nama = nama;
    this.harga = harga;
  }

  getInfo() {
    return `${this.nama} - ${rupiah(this.harga)}`;
  }
}

class DigitalProduct extends Product {
  constructor(nama, harga, ukuranMB) {
    super(nama, harga);
    this.ukuranMB = ukuranMB;
  }

  getInfo() {
    return `${super.getInfo()} (digital, ${this.ukuranMB} MB)`;
  }
}

class PhysicalProduct extends Product {
  constructor(nama, harga, beratKg) {
    super(nama, harga);
    this.beratKg = beratKg;
  }

  getInfo() {
    return `${super.getInfo()} (fisik, ${this.beratKg} kg)`;
  }
}

function soal1() {
  const p1 = new Product('Stiker', 5000);
  const p2 = new DigitalProduct('E-book JavaScript', 50000, 12);
  const p3 = new PhysicalProduct('Buku Cetak PAW', 90000, 1.5);

  document.getElementById('hasil1').textContent =
    `${p1.getInfo()}\n${p2.getInfo()}\n${p3.getInfo()}\n\np2 instanceof Product: ${p2 instanceof Product}`;
}

// Soal 2: getter dan setter
class Barang {
  constructor(nama, harga) {
    this.nama = nama;
    this._harga = harga;
  }

  get harga() {
    return rupiah(this._harga);
  }

  set harga(nilai) {
    if (nilai < 0) {
      throw new Error('harga tidak boleh negatif');
    }
    this._harga = nilai;
  }
}

const kopi = new Barang('Kopi Susu', 15000);

function soal2() {
  const nilai = Number(document.getElementById('hargaBaru').value);
  let hasil = `harga sebelum: ${kopi.harga}\n`;

  try {
    kopi.harga = nilai;
    hasil += `harga diubah ke ${nilai}, sekarang: ${kopi.harga}`;
  } catch (error) {
    hasil += `setter menolak: ${error.message}\nharga tetap: ${kopi.harga}`;
  }

  document.getElementById('hasil2').textContent = hasil;
}

// Soal 3: computed property names
const buatObjek = (kunci, nilai) => {
  return {
    [kunci]: nilai,
    [`${kunci}_dibuat`]: 2026,
    ['is' + kunci]: true
  };
};

function soal3() {
  const a = buatObjek('nama', 'Syahrul');
  const b = buatObjek('umur', 20);

  document.getElementById('hasil3').textContent =
    `buatObjek('nama', 'Syahrul') -> ${JSON.stringify(a)}\nbuatObjek('umur', 20)        -> ${JSON.stringify(b)}`;
}

// Soal 4: default parameter + destructuring
const kenalan = ({ nama = 'Tamu', umur = 18, kota = 'Bandar Lampung' } = {}) => {
  return `${nama}, ${umur} tahun, dari ${kota}`;
};

const hitungDiskon = (harga, persen = 10) => harga - (harga * persen / 100);

function soal4() {
  document.getElementById('hasil4').textContent =
    `kenalan()                        -> ${kenalan()}
kenalan({ nama: 'Rina' })        -> ${kenalan({ nama: 'Rina' })}
kenalan({ nama: 'Budi', umur: 21, kota: 'Metro' })
                                 -> ${kenalan({ nama: 'Budi', umur: 21, kota: 'Metro' })}

hitungDiskon(100000)             -> ${hitungDiskon(100000)}
hitungDiskon(100000, 25)         -> ${hitungDiskon(100000, 25)}`;
}
