// Indonesia in Numbers — data.
//
// Every figure below is a published official figure, written here from
// the publisher's releases, each labelled with its source and year in
// the page that shows it. Values are rounded for reading; the footer's
// note says where the full official tables live.

export const OVERVIEW = [
  { value: '281,6', unit: 'juta', label: 'Penduduk', sub: 'BPS, 2024 — naik dari 270,2 juta pada Sensus 2020' },
  { value: '5,03', unit: '%', label: 'Pertumbuhan ekonomi', sub: 'BPS, 2024 — PDB Rp22.139 triliun' },
  { value: '1,57', unit: '%', label: 'Inflasi tahunan', sub: 'BPS, Desember 2024 (year-on-year)' },
  { value: '4,91', unit: '%', label: 'Pengangguran terbuka', sub: 'BPS, Agustus 2024' },
  { value: '9,03', unit: '%', label: 'Penduduk miskin', sub: 'BPS, Maret 2024 — 25,22 juta jiwa' },
  { value: '75,02', unit: '', label: 'Indeks Pembangunan Manusia', sub: 'BPS, 2024 — kategori tinggi' },
];

export const POPULATION = {
  total2024: '281,6 juta jiwa',
  census2020: '270,2 juta jiwa',
  growth: '1,05% per tahun',
  medianAge: '30,5 tahun',
  lifeExpectancy: '74,2 tahun',
  density: '147 jiwa per km²',
  byYear: [
    { year: '2020', value: 270.2 },
    { year: '2021', value: 272.5 },
    { year: '2022', value: 275.8 },
    { year: '2023', value: 278.7 },
    { year: '2024', value: 281.6 },
  ],
  byIsland: [
    { name: 'Jawa', share: 56.1, people: '157,9 juta' },
    { name: 'Sumatera', share: 21.6, people: '60,8 juta' },
    { name: 'Sulawesi', share: 7.4, people: '20,8 juta' },
    { name: 'Kalimantan', share: 6.2, people: '17,5 juta' },
    { name: 'Bali & Nusa Tenggara', share: 5.6, people: '15,8 juta' },
    { name: 'Maluku & Papua', share: 3.1, people: '8,7 juta' },
  ],
  ageGroups: [
    { group: '0–14 tahun', share: 24.5 },
    { group: '15–64 tahun', share: 68.7 },
    { group: '65 tahun ke atas', share: 6.8 },
  ],
  source: 'Badan Pusat Statistik (BPS), 2024',
};

export const ECONOMY = {
  gdp2024: 'Rp22.139 triliun',
  perCapita: 'US$4.960',
  growthByYear: [
    { year: '2020', value: -2.07 },
    { year: '2021', value: 3.7 },
    { year: '2022', value: 5.31 },
    { year: '2023', value: 5.05 },
    { year: '2024', value: 5.03 },
  ],
  sectors: [
    { name: 'Industri pengolahan', share: 18.7 },
    { name: 'Perdagangan', share: 12.9 },
    { name: 'Pertanian, kehutanan, perikanan', share: 12.5 },
    { name: 'Konstruksi', share: 10.0 },
    { name: 'Pertambangan dan penggalian', share: 9.5 },
    { name: 'Lainnya', share: 36.4 },
  ],
  exports2024: 'US$264,70 miliar',
  imports2024: 'US$233,66 miliar',
  surplus2024: 'US$31,04 miliar',
  source: 'Badan Pusat Statistik (BPS) dan Bank Dunia, 2024',
};

export const PRICES = {
  inflationByYear: [
    { year: '2020', value: 1.68 },
    { year: '2021', value: 1.87 },
    { year: '2022', value: 5.51 },
    { year: '2023', value: 2.61 },
    { year: '2024', value: 1.57 },
  ],
  groups: [
    { name: 'Makanan, minuman, tembakau', rate: 2.45, note: 'kelompok terbesar dalam IHK' },
    { name: 'Perumahan, air, listrik, bahan bakar', rate: 0.89, note: 'naik tipis sepanjang 2024' },
    { name: 'Transportasi', rate: 0.44, note: 'terkendali setelah penyesuaian BBM 2022' },
    { name: 'Pendidikan', rate: 1.92, note: 'naik pada tahun ajaran baru' },
    { name: 'Kesehatan', rate: 1.75, note: 'stabil' },
  ],
  note: 'Inflasi dihitung year-on-year dari Indeks Harga Konsumen (IHK) Desember ke Desember.',
  source: 'Badan Pusat Statistik (BPS), 2024',
};

export const JOBS = {
  tptByYear: [
    { year: '2020', value: 7.07 },
    { year: '2021', value: 6.49 },
    { year: '2022', value: 5.86 },
    { year: '2023', value: 5.32 },
    { year: '2024', value: 4.91 },
  ],
  labourForce: '152,11 juta jiwa',
  employed: '144,64 juta jiwa',
  bySector: [
    { name: 'Pertanian, kehutanan, perikanan', share: 28.5 },
    { name: 'Perdagangan', share: 19.0 },
    { name: 'Industri pengolahan', share: 13.6 },
    { name: 'Konstruksi', share: 8.0 },
    { name: 'Jasa kemasyarakatan dan perorangan', share: 11.4 },
    { name: 'Lainnya', share: 19.5 },
  ],
  informal: '59,2% pekerja berada di sektor informal',
  source: 'Badan Pusat Statistik (BPS), Survei Angkatan Kerja Nasional, Agustus 2024',
};

export const PROVINCES = [
  { name: 'Jawa Barat', island: 'Jawa', pop: 49.94, density: 1416 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 41.81, density: 872 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 37.89, density: 1155 },
  { name: 'Sumatera Utara', island: 'Sumatera', pop: 15.59, density: 214 },
  { name: 'Banten', island: 'Jawa', pop: 12.43, density: 1287 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10.56, density: 15930 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9.44, density: 202 },
  { name: 'Lampung', island: 'Sumatera', pop: 9.42, density: 273 },
  { name: 'Sumatera Selatan', island: 'Sumatera', pop: 9.06, density: 99 },
  { name: 'Riau', island: 'Sumatera', pop: 6.73, density: 77 },
  { name: 'Kalimantan Barat', island: 'Kalimantan', pop: 5.79, density: 39 },
  { name: 'Sumatera Barat', island: 'Sumatera', pop: 5.76, density: 137 },
  { name: 'Nusa Tenggara Barat', island: 'Nusa Tenggara', pop: 5.60, density: 301 },
  { name: 'Kalimantan Selatan', island: 'Kalimantan', pop: 4.47, density: 115 },
  { name: 'Bali', island: 'Nusa Tenggara', pop: 4.41, density: 763 },
];

export const ALL_PROVINCES = {
  'Jawa': ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten'],
  'Sumatera': ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi', 'Sumatera Selatan', 'Kepulauan Bangka Belitung', 'Bengkulu', 'Lampung'],
  'Kalimantan': ['Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara'],
  'Sulawesi': ['Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat'],
  'Nusa Tenggara & Bali': ['Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur'],
  'Maluku & Papua': ['Maluku', 'Maluku Utara', 'Papua', 'Papua Barat', 'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan', 'Papua Barat Daya'],
};

export const SOURCES = 'Badan Pusat Statistik (BPS), Bank Dunia, dan UNDP — publikasi 2024';
