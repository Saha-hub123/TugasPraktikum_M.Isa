//navbar
const toggleButton = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
        const navbarMenu = document.getElementById('navbar-sticky');
    
        // Add event listener to toggle button
        toggleButton.addEventListener('click', () => {
            const expanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
            
            // Toggle the expanded attribute
            toggleButton.setAttribute('aria-expanded', !expanded);
            
            // Toggle the navbar visibility by changing the 'hidden' class
            navbarMenu.classList.toggle('hidden');
        });

        
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


  //trakking
  let watchID = null;
    let totalDistance = 0;
    let lastPosition = null;

    const distanceElement = document.getElementById('distance');
    const resultElement = document.getElementById('resultt');
    const resultText = document.getElementById('resultText');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');

    // Fungsi untuk menghitung jarak antara dua koordinat (dalam meter)
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Radius bumi dalam meter
      const rad = (deg) => (deg * Math.PI) / 180;
      const φ1 = rad(lat1);
      const φ2 = rad(lat2);
      const Δφ = rad(lat2 - lat1);
      const Δλ = rad(lon2 - lon1);

      const a = Math.sin(Δφ / 2) ** 2 +
                Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // Jarak dalam meter
    }

    // Fungsi untuk memulai pelacakan
    function startTracking() {
      if (navigator.geolocation) {
        totalDistance = 0;
        lastPosition = null;

        watchID = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            if (lastPosition) {
              const { lat: lastLat, lon: lastLon } = lastPosition;
              const distance = calculateDistance(lastLat, lastLon, latitude, longitude);
              totalDistance += distance;
              distanceElement.textContent = `Jarak Tempuh: ${totalDistance.toFixed(2)} meter`;
            }

            lastPosition = { lat: latitude, lon: longitude };
          },
          (error) => {
            alert('Tidak dapat mengakses lokasi. Pastikan GPS diaktifkan.');
          },
          { enableHighAccuracy: true }
        );

        startButton.disabled = true;
        stopButton.disabled = false;
        resultElement.classList.add('hidden');
      } else {
        alert('Perangkat Anda tidak mendukung Geolocation.');
      }
    }

    // Fungsi untuk menghentikan pelacakan
    function stopTracking() {
      if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;

        startButton.disabled = false;
        stopButton.disabled = true;

        // Tampilkan hasil
        resultElement.classList.remove('hidden');
        if (totalDistance >= 1000) {
          resultText.textContent = `Luar biasa! Anda berjalan sejauh ${totalDistance.toFixed(2)} meter. Kondisi jantung Anda kemungkinan sangat baik.`;
        } else if (totalDistance >= 500) {
          resultText.textContent = `Bagus! Anda berjalan sejauh ${totalDistance.toFixed(2)} meter. Tetap jaga kebugaran Anda.`;
        } else {
          resultText.textContent = `Anda berjalan sejauh ${totalDistance.toFixed(2)} meter. Cobalah untuk lebih aktif untuk kesehatan jantung yang lebih baik.`;
        }
      }
    }

    // Tambahkan event listener
    startButton.addEventListener('click', startTracking);
    stopButton.addEventListener('click', stopTracking);

  //pendaftaran
  const navigateButton = document.getElementById('navigateButton');

    // Tambahkan event listener untuk klik tombol
    navigateButton.addEventListener('click', () => {
      // Navigasi ke halaman lokal
      window.location.href = './daftar.html'; // Ganti dengan nama file lokal Anda
    });