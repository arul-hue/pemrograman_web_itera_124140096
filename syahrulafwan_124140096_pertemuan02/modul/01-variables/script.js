// Soal 1: ubah nilai const
function soal1() {
  let hasil = '';

  const nama = 'Syahrul';
  hasil += `nama awal: ${nama}\n`;

  try {
    nama = 'Afwan';
  } catch (error) {
    hasil += `nama = 'Afwan' -> error: ${error.message}\n`;
  }

  // isi array yang dibuat dengan const masih boleh berubah
  const buah = ['apel', 'jeruk'];
  buah.push('mangga');
  hasil += `\nisi array const setelah push: ${buah.join(', ')}\n`;
  hasil += '(yang tidak boleh itu mengganti variabelnya, bukan isinya)';

  document.getElementById('hasil1').textContent = hasil;
}

// Soal 2: var vs let di dalam dan di luar block
function soal2() {
  let hasil = '';

  var a = 'var luar';
  let b = 'let luar';

  if (true) {
    var a = 'var dalam';
    let b = 'let dalam';
    hasil += `di dalam block -> a: ${a}, b: ${b}\n`;
  }

  hasil += `di luar block  -> a: ${a}, b: ${b}\n`;
  hasil += '\nvar a berubah karena var tidak punya block scope,\n';
  hasil += 'sedangkan let b di dalam block adalah variabel yang berbeda.\n\n';

  // contoh pada loop
  for (var i = 0; i < 3; i++) {}
  for (let j = 0; j < 3; j++) {}
  hasil += `setelah loop -> i (var): ${i}, j (let): ${typeof j}`;

  document.getElementById('hasil2').textContent = hasil;
}
