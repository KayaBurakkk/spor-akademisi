const kontenjanlar = {
  basketbol: 10,
  futbol: 12,
  tenis: 8
};

const bransAdlari = {
  basketbol: "Basketbol",
  futbol: "Futbol",
  tenis: "Tenis"
};

const form = document.getElementById("kayitFormu");
const mesaj = document.getElementById("mesaj");
const kayitListesi = document.getElementById("kayitListesi");

function ekranKontenjanGuncelle() {
  for (const brans in kontenjanlar) {
    document.getElementById("k-" + brans).textContent = kontenjanlar[brans];
    document.getElementById("t-" + brans).textContent = kontenjanlar[brans];
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const adSoyad = document.getElementById("adSoyad").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const brans = document.getElementById("bransSec").value;

  if (!adSoyad || !telefon || !brans) {
    return;
  }

  if (kontenjanlar[brans] <= 0) {
    mesaj.textContent = bransAdlari[brans] + " branşında kontenjan kalmadı!";
    return;
  }

  kontenjanlar[brans]--;
  ekranKontenjanGuncelle();

  const li = document.createElement("li");
  li.textContent = adSoyad + " - " + bransAdlari[brans] + " (" + telefon + ")";
  kayitListesi.appendChild(li);

  mesaj.textContent = adSoyad + " için " + bransAdlari[brans] + " kaydı alındı.";
  form.reset();
});