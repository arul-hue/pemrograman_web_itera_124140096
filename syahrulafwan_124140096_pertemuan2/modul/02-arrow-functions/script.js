// fungsi biasa (sebagai pembanding)
function tambahBiasa(a, b) {
  return a + b;
}

// arrow function dengan return biasa
const tambahArrow = (a, b) => {
  return a + b;
};

// implicit return (tanpa { } dan return)
const tambahSingkat = (a, b) => a + b;

// satu parameter, kurung boleh dihilangkan
const kuadrat = x => x * x;

// tanpa parameter
const sapa = () => 'Halo dari arrow function!';

// return object harus dibungkus ( )
const buatMahasiswa = (nama, nim) => ({ nama: nama, nim: nim });

// arrow function sebagai callback
const angka = [1, 2, 3, 4, 5, 6];
const genap = angka.filter(n => n % 2 === 0);

function soal1() {
  const hasil = `tambahBiasa(2, 3)     = ${tambahBiasa(2, 3)}
tambahArrow(2, 3)     = ${tambahArrow(2, 3)}
tambahSingkat(2, 3)   = ${tambahSingkat(2, 3)}
kuadrat(4)            = ${kuadrat(4)}
sapa()                = ${sapa()}
buatMahasiswa(...)    = ${JSON.stringify(buatMahasiswa('Rina', '124140001'))}
angka.filter(genap)   = ${genap}`;

  document.getElementById('hasil1').textContent = hasil;
}

// Soal 2: perbedaan this
const tim = {
  nama: 'Tim Futsal',
  anggota: ['Andi', 'Budi', 'Citra'],

  cetakBiasa: function () {
    return this.anggota.map(function (orang) {
      return orang + ' - ' + this.nama;
    });
  },

  cetakArrow: function () {
    return this.anggota.map(orang => orang + ' - ' + this.nama);
  }
};

function soal2() {
  const hasil = `Fungsi biasa (this.nama tidak terbaca):
${tim.cetakBiasa().join('\n')}

Arrow function (this ikut milik object tim):
${tim.cetakArrow().join('\n')}`;

  document.getElementById('hasil2').textContent = hasil;
}
