// Indonesia in Numbers — pages.
//
// Each route renders one page as HTML. The numbers come from data.js;
// main.js inserts the page and then draws its charts. Every figure on
// a page names its source and year next to it.

import { OVERVIEW, POPULATION, ECONOMY, PRICES, JOBS, PROVINCES, ALL_PROVINCES, SOURCES } from './data.js';

function statCard(stat) {
  return `<article class="card">
    <div class="num">${stat.value}<small>${stat.unit ? ' ' + stat.unit : ''}</small></div>
    <div class="lbl">${stat.label}</div>
    <div class="sub">${stat.sub}</div>
  </article>`;
}

function sourceLine(source) {
  return `<p class="src">Sumber: <b>${source}</b></p>`;
}

export function homePage() {
  return `
  <section class="hero">
    <span class="kicker">Statistik Indonesia · 2024</span>
    <h1>Indonesia in Numbers</h1>
    <p class="lede">Penduduk, ekonomi, harga, pekerjaan, dan provinsi — angka resmi Indonesia
    dalam satu situs yang bisa dibuka di desktop dan di ponsel, tanpa memuat apa pun dari jaringan.</p>
    <p class="src">Sumber: <b>${SOURCES}</b></p>
  </section>
  <section class="cards">${OVERVIEW.map(statCard).join('')}</section>
  <section class="panel">
    <h2>Pertumbuhan ekonomi 2020–2024</h2>
    <p>Setelah kontraksi pada 2020, ekonomi Indonesia tumbuh di atas 5% selama tiga tahun berturut-turut.</p>
    <div class="chart-wrap"><canvas id="chart-growth" class="chart" role="img" aria-label="Grafik garis pertumbuhan ekonomi 2020 sampai 2024"></canvas></div>
    ${sourceLine(ECONOMY.source)}
  </section>
  <section class="two-col">
    <div class="panel">
      <h3>Penduduk menurut pulau</h3>
      <p>Lebih dari separuh penduduk tinggal di Jawa — 157,9 juta dari 281,6 juta jiwa.</p>
      <div class="chart-wrap"><canvas id="chart-islands" class="chart" role="img" aria-label="Grafik batang penduduk menurut pulau"></canvas></div>
      ${sourceLine(POPULATION.source)}
    </div>
    <div class="panel">
      <h3>Ke mana angka ini membawa Anda</h3>
      <p><a href="#/penduduk">Penduduk</a> — siapa, di mana, dan berapa cepat bertambah.<br>
      <a href="#/ekonomi">Ekonomi</a> — PDB, pertumbuhan, ekspor, dan sektor.<br>
      <a href="#/harga">Harga</a> — inflasi lima tahun dan kelompok barang.<br>
      <a href="#/pekerjaan">Pekerjaan</a> — pengangguran dan lapangan kerja.<br>
      <a href="#/provinsi">Provinsi</a> — 38 provinsi, dicari dan diurutkan.</p>
      <div class="note">Semua angka di situs ini memakai publikasi resmi. Tahun dan sumbernya tertulis di samping setiap angka.</div>
    </div>
  </section>`;
}

export function populationPage() {
  const rows = POPULATION.byYear
    .map((d) => `<tr><td>${d.year}</td><td class="num">${d.value.toFixed(1)} juta</td></tr>`)
    .join('');
  const ages = POPULATION.ageGroups
    .map((g) => `<tr><td>${g.group}</td><td class="num">${g.share.toFixed(1)}%</td></tr>`)
    .join('');
  return `
  <span class="kicker">Penduduk</span>
  <h1>281,6 juta jiwa, di 17 ribu pulau</h1>
  <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia. Pertumbuhannya melambat,
  usianya menua perlahan, dan persebarannya masih sangat timpang: Jawa menampung 56% penduduk di 7% luas daratan.</p>
  <section class="cards">
    ${statCard({ value: '281,6', unit: 'juta', label: 'Penduduk 2024', sub: 'BPS, 2024' })}
    ${statCard({ value: '30,5', unit: 'tahun', label: 'Usia tengah (median)', sub: 'BPS, 2024' })}
    ${statCard({ value: '74,2', unit: 'tahun', label: 'Harapan hidup', sub: 'BPS, 2024' })}
  </section>
  <section class="panel">
    <h2>Pertumbuhan penduduk 2020–2024</h2>
    <div class="chart-wrap"><canvas id="chart-pop" class="chart" role="img" aria-label="Grafik batang jumlah penduduk 2020 sampai 2024"></canvas></div>
    <table class="data">
      <thead><tr><th>Tahun</th><th class="num">Penduduk</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${sourceLine(POPULATION.source)}
  </section>
  <section class="two-col">
    <div class="panel">
      <h3>Struktur umur</h3>
      <p>Indonesia masih dalam bonus demografi: hampir 69% penduduk berada pada usia kerja.</p>
      <table class="data">
        <thead><tr><th>Kelompok umur</th><th class="num">Bagian</th></tr></thead>
        <tbody>${ages}</tbody>
      </table>
      ${sourceLine(POPULATION.source)}
    </div>
    <div class="panel">
      <h3>Kepadatan</h3>
      <p>Rata-rata nasional <b>${POPULATION.density}</b>, tetapi DKI Jakarta mencapai 15.930 jiwa per km²,
      sementara Kalimantan Barat hanya 39 jiwa per km². Lihat perbandingannya di halaman
      <a href="#/provinsi">Provinsi</a>.</p>
      <div class="note">Laju pertumbuhan penduduk ${POPULATION.growth} — turun dari 1,25% per tahun pada 2010–2020.</div>
    </div>
  </section>`;
}

export function economyPage() {
  const sectors = ECONOMY.sectors
    .map((s) => `<tr><td>${s.name}</td><td class="num">${s.share.toFixed(1)}%</td></tr>`)
    .join('');
  return `
  <span class="kicker">Ekonomi</span>
  <h1>Ekonomi terbesar di Asia Tenggara</h1>
  <p class="lede">PDB ${ECONOMY.gdp2024} pada 2024, tumbuh ${ECONOMY.growthByYear[4].value}% — tahun ketiga
  berturut-turut di atas 5%. PDB per kapita ${ECONOMY.perCapita} menurut Bank Dunia.</p>
  <section class="cards">
    ${statCard({ value: 'Rp22.139', unit: 'triliun', label: 'PDB 2024', sub: 'BPS, 2024' })}
    ${statCard({ value: 'US$4.960', unit: '', label: 'PDB per kapita', sub: 'Bank Dunia, 2024' })}
    ${statCard({ value: 'US$31,04', unit: 'miliar', label: 'Surplus dagang', sub: 'BPS, 2024' })}
  </section>
  <section class="panel">
    <h2>Pertumbuhan ekonomi 2020–2024</h2>
    <div class="chart-wrap"><canvas id="chart-growth" class="chart" role="img" aria-label="Grafik garis pertumbuhan ekonomi 2020 sampai 2024"></canvas></div>
    ${sourceLine(ECONOMY.source)}
  </section>
  <section class="two-col">
    <div class="panel">
      <h3>Sektor penyumbang PDB</h3>
      <table class="data">
        <thead><tr><th>Sektor</th><th class="num">Bagian PDB</th></tr></thead>
        <tbody>${sectors}</tbody>
      </table>
      ${sourceLine('Badan Pusat Statistik (BPS), 2024')}
    </div>
    <div class="panel">
      <h3>Perdagangan luar negeri 2024</h3>
      <p>Ekspor <b>${ECONOMY.exports2024}</b> dan impor <b>${ECONOMY.imports2024}</b>,
      menghasilkan surplus <b>${ECONOMY.surplus2024}</b> — surplus dagang tahunan keempat berturut-turut.</p>
      <p>Komoditas ekspor terbesar: batu bara, minyak sawit (CPO), serta besi dan baja. Mitra dagang
      terbesar: Tiongkok, Amerika Serikat, dan Jepang.</p>
      ${sourceLine('Badan Pusat Statistik (BPS), 2024')}
    </div>
  </section>`;
}

export function pricesPage() {
  const groups = PRICES.groups
    .map((g) => `<tr><td>${g.name}</td><td class="num">${g.rate.toFixed(2)}%</td><td>${g.note}</td></tr>`)
    .join('');
  return `
  <span class="kicker">Harga</span>
  <h1>Inflasi 1,57% — terendah dalam lima tahun</h1>
  <p class="lede">Inflasi Desember 2024 (year-on-year) sebesar 1,57%, turun dari 2,61% pada 2023 dan jauh di
  bawah lonjakan 5,51% pada 2022. Sasaran inflasi Bank Indonesia adalah 2,5% ± 1%.</p>
  <section class="cards">
    ${statCard({ value: '1,57', unit: '%', label: 'Inflasi 2024', sub: 'BPS, Desember 2024' })}
    ${statCard({ value: '2,61', unit: '%', label: 'Inflasi 2023', sub: 'BPS, Desember 2023' })}
    ${statCard({ value: '5,51', unit: '%', label: 'Inflasi 2022', sub: 'BPS, Desember 2022' })}
  </section>
  <section class="panel">
    <h2>Inflasi tahunan 2020–2024</h2>
    <div class="chart-wrap"><canvas id="chart-inflation" class="chart" role="img" aria-label="Grafik garis inflasi 2020 sampai 2024"></canvas></div>
    <p>${PRICES.note}</p>
    ${sourceLine(PRICES.source)}
  </section>
  <section class="panel">
    <h2>Inflasi menurut kelompok barang 2024</h2>
    <table class="data">
      <thead><tr><th>Kelompok</th><th class="num">Inflasi</th><th>Catatan</th></tr></thead>
      <tbody>${groups}</tbody>
    </table>
    ${sourceLine(PRICES.source)}
  </section>`;
}

export function jobsPage() {
  const sectors = JOBS.bySector
    .map((s) => `<tr><td>${s.name}</td><td class="num">${s.share.toFixed(1)}%</td></tr>`)
    .join('');
  return `
  <span class="kicker">Pekerjaan</span>
  <h1>Pengangguran 4,91% — terendah sejak 2019</h1>
  <p class="lede">Tingkat pengangguran terbuka turun lima tahun berturut-turut, dari 7,07% pada Agustus 2020
  menjadi 4,91% pada Agustus 2024. Angkatan kerja mencapai ${JOBS.labourForce}.</p>
  <section class="cards">
    ${statCard({ value: '4,91', unit: '%', label: 'Pengangguran terbuka', sub: 'BPS, Agustus 2024' })}
    ${statCard({ value: '152,11', unit: 'juta', label: 'Angkatan kerja', sub: 'BPS, Agustus 2024' })}
    ${statCard({ value: '59,2', unit: '%', label: 'Pekerja informal', sub: 'BPS, Agustus 2024' })}
  </section>
  <section class="panel">
    <h2>Pengangguran 2020–2024</h2>
    <div class="chart-wrap"><canvas id="chart-jobs" class="chart" role="img" aria-label="Grafik garis pengangguran 2020 sampai 2024"></canvas></div>
    ${sourceLine(JOBS.source)}
  </section>
  <section class="panel">
    <h2>Di mana orang bekerja</h2>
    <table class="data">
      <thead><tr><th>Sektor</th><th class="num">Bagian pekerja</th></tr></thead>
      <tbody>${sectors}</tbody>
    </table>
    <p>${JOBS.informal}. Pekerja informal umumnya tanpa kontrak tetap dan tanpa jaminan sosial formal —
    tantangan terbesar pasar kerja Indonesia setelah pengangguran itu sendiri.</p>
    ${sourceLine(JOBS.source)}
  </section>`;
}

export function provincesPage() {
  const rows = PROVINCES.map((p) => `<tr data-name="${p.name.toLowerCase()} ${p.island.toLowerCase()}">
      <td>${p.name}</td><td>${p.island}</td>
      <td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.density.toLocaleString('id-ID')}</td>
    </tr>`).join('');
  const groups = Object.entries(ALL_PROVINCES)
    .map(([island, names]) => `<div class="panel"><h3>${island}</h3>
      <div class="chips">${names.map((n) => `<span class="chip">${n}</span>`).join('')}</div></div>`)
    .join('');
  return `
  <span class="kicker">Provinsi</span>
  <h1>38 provinsi, dari Aceh sampai Papua</h1>
  <p class="lede">Sejak 2022 Indonesia memiliki 38 provinsi, setelah empat provinsi baru dimekarkan di Papua.
  Tabel di bawah memuat 15 provinsi berpenduduk terbesar; daftar lengkapnya ada di bawah tabel.</p>
  <section class="panel">
    <h2>15 provinsi berpenduduk terbesar</h2>
    <div class="toolbar">
      <input type="search" id="province-search" placeholder="Cari provinsi atau pulau…" aria-label="Cari provinsi">
      <select id="province-sort" aria-label="Urutkan">
        <option value="pop">Urutkan: penduduk terbanyak</option>
        <option value="density">Urutkan: terpadat</option>
        <option value="name">Urutkan: nama A–Z</option>
      </select>
    </div>
    <table class="data" id="province-table">
      <thead><tr><th>Provinsi</th><th>Pulau</th><th class="num">Penduduk (juta)</th><th class="num">Kepadatan (jiwa/km²)</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p id="province-empty" class="src" hidden>Tidak ada provinsi yang cocok dengan pencarian Anda.</p>
    ${sourceLine('Badan Pusat Statistik (BPS), 2024 — angka dibulatkan')}
  </section>
  <h2>Semua 38 provinsi menurut pulau</h2>
  ${groups}`;
}
