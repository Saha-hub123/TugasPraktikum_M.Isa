//checkup
// Tangkap elemen
const form = document.getElementById('healthForm');
const resultc = document.getElementById('resultc');

// Tambahkan event listener
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Mencegah reload halaman

  // Ambil data dari formulir
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value, 10);
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const symptoms = document.getElementById('symptoms').value;

  // Hitung BMI
  const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

  // Tentukan status kesehatan berdasarkan BMI
  let status = '';
  if (bmi < 18.5) {
    status = 'Berat badan kurang';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    status = 'Berat badan ideal';
  } else if (bmi >= 25 && bmi < 29.9) {
    status = 'Berat badan berlebih';
  } else {
    status = 'Obesitas';
  }

  // Tampilkan hasil
  resultc.innerHTML = `
    <h2 class="text-lg font-bold text-gray-800">Hasil Check-Up</h2>
    <p>Nama: ${name}</p>
    <p>Umur: ${age} tahun</p>
    <p>BMI: ${bmi} (${status})</p>
    <p>Gejala: ${symptoms || 'Tidak ada gejala yang diisi.'}</p>
  `;
  resultc.classList.remove('hidden');
});

//buta warna

// Data gambar dan jawaban
const tests = [
    { image: 'https://cdn-beaai.nitrocdn.com/DsHNrqyidSdrnEUwxpnDFmLjguAlTfrt/assets/images/optimized/rev-f0a997b/colormax.org/wp-content/uploads/2015/08/colorblind-test-image1.jpg', answer: 7 },
    { image: 'https://cdn-beaai.nitrocdn.com/DsHNrqyidSdrnEUwxpnDFmLjguAlTfrt/assets/images/optimized/rev-f0a997b/colormax.org/wp-content/uploads/2015/08/colorblind-test-image3.jpg', answer: 26 },
    { image: 'https://cdn-beaai.nitrocdn.com/DsHNrqyidSdrnEUwxpnDFmLjguAlTfrt/assets/images/optimized/rev-f0a997b/colormax.org/wp-content/uploads/2015/08/colorblind-test-image6.jpg', answer: 73 }
  ];

  let currentTest = 0;

  // Ambil elemen
  const testImage = document.getElementById('testImage');
  const userAnswer = document.getElementById('userAnswer');
  const submitButton = document.getElementById('submitButton');
  const result = document.getElementById('result');

  // Fungsi untuk memuat tes
  function loadTest(index) {
    const test = tests[index];
    testImage.src = test.image;
    userAnswer.value = '';
    result.classList.add('hidden');
  }

  // Validasi jawaban
  submitButton.addEventListener('click', () => {
    const answer = parseInt(userAnswer.value, 10);
    const correctAnswer = tests[currentTest].answer;

    if (answer === correctAnswer) {
      result.textContent = 'Jawaban benar! Anda tidak menunjukkan tanda-tanda buta warna pada tes ini.';
      result.classList.remove('hidden');
      result.classList.remove('text-red-600');
      result.classList.add('text-green-600');
    } else {
      result.textContent = 'Jawaban salah. Anda mungkin memiliki tanda-tanda buta warna.';
      result.classList.remove('hidden');
      result.classList.remove('text-green-600');
      result.classList.add('text-red-600');
    }

    // Lanjut ke tes berikutnya
    currentTest++;
    if (currentTest < tests.length) {
      setTimeout(() => loadTest(currentTest), 2000);
    } else {
      result.textContent += ' Tes selesai. Silakan konsultasi lebih lanjut dengan dokter jika perlu.';
    }
  });

  // Muat tes pertama
  loadTest(currentTest);

  //pendaftaran
  const navigateButton = document.getElementById('navigateButton');

    // Tambahkan event listener untuk klik tombol
    navigateButton.addEventListener('click', () => {
      // Navigasi ke halaman lokal
      window.location.href = './daftar.html'; // Ganti dengan nama file lokal Anda
    });