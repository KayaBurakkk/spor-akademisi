const form = document.getElementById('islem-formu');
const baslikInput = document.getElementById('baslik');
const tutarInput = document.getElementById('tutar');
const turSelect = document.getElementById('tur');
const islemListesi = document.getElementById('islem-listesi');
const toplamBakiyeEl = document.getElementById('toplam-bakiye');
const toplamGelirEl = document.getElementById('toplam-gelir');
const toplamGiderEl = document.getElementById('toplam-gider');
const tumunuTemizleBtn = document.getElementById('tumunu-temizle');

// Sayfa yenilense bile veriler kaybolmasın diye tarayıcı hafızasından (localStorage) çekiyoruz
let islemler = JSON.parse(localStorage.getItem('butce_islemleri')) || [
  { id: 1, baslik: 'KYK Bursu', tutar: 3000, tur: 'gelir' },
  { id: 2, baslik: 'Market Alışverişi', tutar: 650, tur: 'gider' }
];

function paraFormatla(sayi) {
  return sayi.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
}

function arayuzuGuncelle() {
  islemListesi.innerHTML = '';

  let toplamGelir = 0;
  let toplamGider = 0;

  if (islemler.length === 0) {
    islemListesi.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-4">Henüz kayıtlı bir işlem yok.</td>
      </tr>
    `;
  }

  islemler.forEach((islem) => {
    if (islem.tur === 'gelir') {
      toplamGelir += islem.tutar;
    } else {
      toplamGider += islem.tutar;
    }

    const satir = document.createElement('tr');
    const rozetSinifi = islem.tur === 'gelir' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger';
    const turMetni = islem.tur === 'gelir' ? 'Gelir' : 'Gider';
    const isaret = islem.tur === 'gelir' ? '+' : '-';

    satir.innerHTML = `
      <td class="fw-medium">${islem.baslik}</td>
      <td><span class="badge ${rozetSinifi}">${turMetni}</span></td>
      <td class="fw-semibold">${isaret}${paraFormatla(islem.tutar)}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary" onclick="islemSil(${islem.id})">Sil</button>
      </td>
    `;
    islemListesi.appendChild(satir);
  });

  const bakiye = toplamGelir - toplamGider;

  toplamBakiyeEl.textContent = paraFormatla(bakiye);
  toplamGelirEl.textContent = paraFormatla(toplamGelir);
  toplamGiderEl.textContent = paraFormatla(toplamGider);

  localStorage.setItem('butce_islemleri', JSON.stringify(islemler));
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const baslik = baslikInput.value.trim();
  const tutar = parseFloat(tutarInput.value);
  const tur = turSelect.value;

  if (!baslik || isNaN(tutar) || tutar <= 0) return;

  const yeniIslem = {
    id: Date.now(),
    baslik: baslik,
    tutar: tutar,
    tur: tur
  };

  islemler.unshift(yeniIslem);
  form.reset();
  arayuzuGuncelle();
});

function islemSil(id) {
  islemler = islemler.filter((item) => item.id !== id);
  arayuzuGuncelle();
}

tumunuTemizleBtn.addEventListener('click', function () {
  if (confirm('Tüm işlemleri silmek istediğine emin misin?')) {
    islemler = [];
    arayuzuGuncelle();
  }
});

// İlk açılışta ekranı doldur
arayuzuGuncelle();