# Carbon-Loss Tracker

Aplikasi web Next.js + TypeScript untuk memvisualisasikan estimasi pelepasan emisi karbon akibat deforestasi di Indonesia.

## Fitur utama

- Dashboard utama dengan total luas deforestasi, estimasi total emisi karbon, dan indikator data.
- Visualisasi tren dengan `LineChart`, `BarChart`, dan `PieChart` menggunakan `recharts`.
- Filter data berdasarkan tahun dan provinsi/wilayah.
- Halaman analisis detail untuk perbandingan wilayah dan emisi per hektar.
- UI modern berbasis TailwindCSS.
- Struktur komponen reusable dan modul data terpisah.

## Arsitektur aplikasi

- `app/` - Halaman Next.js (`page.tsx`, subhalaman analisis).
- `components/` - Komponen tampilan reusable seperti kartu statistik, panel filter, dan chart.
- `lib/` - Layer data, tipe model, dan fungsi perhitungan.
- `app/api/data/route.ts` - API route contoh untuk endpoint data.
- `app/globals.css` - Styling global Tailwind.

## Struktur folder best practice

- `app/`: App router, halaman, dan layout.
- `components/`: Komponen kecil yang dapat digunakan ulang.
- `lib/`: Logika bisnis dan utilitas data.
- `public/`: Aset statis.
- `styles/` atau `app/globals.css`: Styling global.

## Contoh implementasi fetch data

Pada `app/page.tsx`, data diambil dari API lokal:

```ts
const fetchDataset = async (): Promise<DeforestationRecord[]> => {
  const response = await fetch("/api/data");
  if (!response.ok) {
    throw new Error("Gagal mengambil data");
  }
  return response.json();
};
```

## Contoh penggunaan chart (Recharts)

Komponen `components/ChartSection.tsx` menggunakan:

- `LineChart` + `Line`
- `BarChart` + `Bar`
- `PieChart` + `Pie`
- `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `Legend`

## Data apa saja yang dibutuhkan

Dataset ideal membutuhkan kolom:

- `year` (tahun)
- `province` (nama provinsi atau wilayah)
- `areaHa` (luas deforestasi dalam hektar)
- `carbonEmissionTon` (estimasi emisi karbon dalam ton CO₂)

## Integrasi PostgreSQL

Aplikasi sudah disiapkan agar dapat membaca data dari PostgreSQL melalui API lokal.

- `lib/db.ts` — konfigurasi koneksi `pg` menggunakan `process.env.POSTGRES_URL`
- `app/api/data/route.ts` — mencoba query ke tabel `deforestation`
- Jika koneksi gagal atau struktur DB tidak cocok, API akan fallback ke data langsung dari `csv_indonesia.zip`.

Tabel contoh di PostgreSQL:

```sql
CREATE TABLE deforestation (
  year integer NOT NULL,
  province text NOT NULL,
  area_ha numeric NOT NULL,
  carbon_emission_ton numeric NOT NULL
);
```

Contoh `POSTGRES_URL` di `.env.local`:

```env
POSTGRES_URL=postgresql://user:password@host:5432/database_name
```

## Format dataset ideal

Gunakan format JSON atau CSV seperti contoh:

```json
[
  {
    "year": 2019,
    "province": "Kalimantan Tengah",
    "areaHa": 12900,
    "carbonEmissionTon": 586950
  },
  {
    "year": 2020,
    "province": "Sumatera Selatan",
    "areaHa": 11200,
    "carbonEmissionTon": 509600
  }
]
```

## Cara mengolah data menjadi insight (BI-style)

1. Aggregasi per tahun: hitung total luas dan total emisi setiap tahun.
2. Analisis wilayah: bandingkan total area dan emisi antar provinsi.
3. Rasio intensitas: hitung emisi per hektar untuk mengetahui efisiensi atau dampak relatif.
4. Tren temporal: visualisasikan kenaikan/penurunan deforestasi dan emisi di sepanjang waktu.
5. Segmentasi: filter berdasarkan tahun dan provinsi untuk fokus pada periode dan wilayah tertentu.
6. Dashboard: tampilkan KPI utama, tren, dan perbandingan wilayah agar mudah dibaca.

## Cara menjalankan

```bash
npm install
npm run dev
```
