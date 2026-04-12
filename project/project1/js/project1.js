Chart.defaults.font.family = "'DM Sans', sans-serif";

new Chart(document.getElementById('lineChart'), {
  type: 'line',
  data: {
    labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
    datasets: [{
      label: 'Net Sales (Rp M)',
      data: [27.6, 10.6, 38.1, 38.9, 16.0, 58.4, 20.9, 10.9, 10.3, 9.3, 22.9, 34.1],
      borderColor: '#4ade80', backgroundColor: 'rgba(74,222,128,.1)',
      borderWidth: 2, fill: true, tension: 0.4,
      pointBackgroundColor: '#4ade80', pointRadius: 3, pointHoverRadius: 5
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#9ca3af', font: { size: 8 }, maxRotation: 0 }, grid: { color: '#2d3748' } },
      y: { ticks: { color: '#9ca3af', font: { size: 8 }, callback: v => v + 'M' }, grid: { color: '#2d3748' } }
    }
  }
});

new Chart(document.getElementById('donutChart'), {
  type: 'doughnut',
  data: {
    labels: ['Peripherals', 'Electronics', 'Accessories', 'Furniture'],
    datasets: [{ data: [466, 460, 452, 428], backgroundColor: ['#4ade80','#22c55e','#16a34a','#166534'], borderColor: '#1a1f2e', borderWidth: 3 }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { color: '#9ca3af', font: { size: 8 }, boxWidth: 9, padding: 8 } } }
  }
});

new Chart(document.getElementById('barChart'), {
  type: 'bar',
  data: {
    labels: ['Laptop Pro X1','4K Monitor','Gaming Chair','Headset','Mech. Keyboard'],
    datasets: [{ label: 'Net Sales (Rp M)', data: [260.1, 141.4, 136.7, 105.9, 49.0], backgroundColor: ['#4ade80','#22c55e','#16a34a','#15803d','#166534'], borderRadius: 5 }]
  },
  options: {
    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#9ca3af', font: { size: 8 }, callback: v => v + 'M' }, grid: { color: '#2d3748' } },
      y: { ticks: { color: '#d1d5db', font: { size: 8 } }, grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════════
   BILINGUAL i18n — matches portfolio toggle pattern
══════════════════════════════════════════════════════════ */
const translations = {
  id: {
    nav_back:       'Kembali ke Portfolio',
    hero_badge:     'Project — Data Analyst',
    hero_desc:      'Analisis end-to-end kinerja penjualan 1.806 transaksi — mulai dari data cleaning dengan Python, query SQL Server, hingga dashboard interaktif di Looker Studio yang membantu tim bisnis membuat keputusan berbasis data.',
    sec_vis:        'Visualisasi',
    db_sub:         'Data: Jan 2023 – Des 2025 \u00a0|\u00a0 1.806 Transaksi',
    chip_all:       '2023–2025',
    chip_online:    'Online',
    chip_region:    'Semua Wilayah',
    kpi_sales:      'Total Net Sales',
    kpi_orders:     'Total Orders',
    kpi_rating:     'Avg Rating',
    kpi_stable:     '— stabil',
    kpi_disc:       'Discount Rate',
    kpi_disc_delta: '↓ -0.8% vs target',
    chart_line:     '📈 Tren Net Sales Bulanan (2025)',
    chart_donut:    '🍩 Distribusi Kategori',
    chart_bar:      '🏆 Top 5 Produk by Net Sales',
    chart_region:   '📍 Sales by Region',
    chart_lb:       '👤 Leaderboard Salesperson',
    th_rank:        'Rank', th_name: 'Salesperson', th_orders: 'Orders', th_sales: 'Net Sales', th_rating: 'Rating',
    db_footer:      'Powered by Looker Studio · Data Source: SQL Server · Last updated: Des 2025',
    note_box:       'Dashboard di atas merepresentasikan tampilan Looker Studio. Untuk versi interaktif sesungguhnya, import <code>sales_data_clean.csv</code> ke Google Looker Studio.',
    sec_workflow:   'Alur Kerja',
    workflow_title: 'Project Workflow',
    step1_title:    'Dataset Generation & Identifikasi Masalah',
    step1_desc:     'Dataset sintetis 2.500 baris dibuat dengan sengaja memiliki <em>dirty data</em>: duplikat, format tanggal tidak konsisten, nilai negatif, karakter non-numerik, dan inkonsistensi kapitalisasi.',
    step2_title:    'Data Cleaning dengan Python & Pandas',
    step2_desc:     'Script <code style="background:var(--g50);padding:1px 5px;border-radius:4px;font-size:.75rem">data_cleaning.py</code> membersihkan 10 duplikat, 247 tanggal invalid, 193 harga kotor, 244 qty tidak valid. Output: <strong>1.806 baris bersih</strong> + kolom turunan.',
    step3_title:    'Analisis dengan SQL Server (T-SQL)',
    step3_desc:     'Data bersih diimpor ke SQL Server. 10 query analitik dibuat mencakup KPI ringkasan, tren MoM, ranking produk & salesperson, analisis YoY, dan kontribusi per wilayah.',
    step4_title:    'Visualisasi di Looker Studio',
    step4_desc:     'Dashboard interaktif di Google Looker Studio menampilkan 4 KPI tile, tren bulanan, distribusi kategori, top produk, heatmap wilayah, dan leaderboard salesperson.',
    sec_code:       'Kode',
    py_title:       'Cuplikan Data Cleaning (Python)',
    sql_title:      'Cuplikan SQL — MoM Growth & Ranking',
    sec_insight:    'Insight',
    findings_title: 'Key Findings',
    f1_title:       'Laptop Pro X1 adalah produk unggulan',
    f1_desc:        'Menyumbang Rp 260,1 Miliar atau sekitar 31% dari total net sales, jauh melampaui produk lainnya. Strategi upsell produk ini sangat potensial untuk meningkatkan revenue.',
    f2_title:       'Jawa Barat + Jawa Timur = 42% transaksi',
    f2_desc:        'Dua wilayah ini mendominasi volume order. Potensi ekspansi masih terbuka lebar di Kalimantan Timur dan Sulawesi Selatan yang baru berkontribusi ~9.5% masing-masing.',
    f3_title:       'Online & Offline hampir seimbang (52% vs 48%)',
    f3_desc:        'Distribusi channel yang seimbang mengindikasikan strategi omnichannel yang baik. Investasi lebih pada channel online dapat mendorong pertumbuhan lebih efisien.',
    f4_title:       'Data mentah: 27.8% baris perlu pembersihan',
    f4_desc:        'Dari 2.500 baris, 694 baris dieliminasi karena data kotor. Implementasi validasi data real-time di sistem point-of-sale dapat mencegah masalah kualitas data di masa depan.',
    sb_info:        'Info Project',
    sb_status:      'Status',
    sb_done:        'Selesai',
    sb_year:        'Tahun',
    sb_cat:         'Kategori',
    sb_cat_val:     'Dashboard',
    sb_raw:         'Dataset',
    sb_clean:       'Clean Data',
    sb_red:         'Reduction',
    stack_csv_sub:  'Input/Output format',
    sb_dl:          'Download Files',
    dl_raw:         'Dataset mentah · 2.500 baris',
    dl_clean:       'Data bersih · 1.806 baris',
    dl_py:          'Script Python cleaning',
    dl_sql:         'Query SQL Server · 10 analisis',
    sb_stats:       'Statistik Data',
    st_tx:          'Clean Transactions',
    st_disc:        'Avg Discount Rate',
    st_yr:          '3 Tahun',
    st_cov:         'Data Coverage',
    foot_port:      'Portfolio',
  },
  en: {
    nav_back:       'Back to Portfolio',
    hero_badge:     'Project — Data Analyst',
    hero_desc:      'End-to-end analysis of 1,806 sales transactions — from Python data cleaning and SQL Server queries to an interactive Looker Studio dashboard that helps business teams make data-driven decisions.',
    sec_vis:        'Visualization',
    db_sub:         'Data: Jan 2023 – Dec 2025 \u00a0|\u00a0 1,806 Transactions',
    chip_all:       '2023–2025',
    chip_online:    'Online',
    chip_region:    'All Regions',
    kpi_sales:      'Total Net Sales',
    kpi_orders:     'Total Orders',
    kpi_rating:     'Avg Rating',
    kpi_stable:     '— stable',
    kpi_disc:       'Discount Rate',
    kpi_disc_delta: '↓ -0.8% vs target',
    chart_line:     '📈 Monthly Net Sales Trend (2025)',
    chart_donut:    '🍩 Category Distribution',
    chart_bar:      '🏆 Top 5 Products by Net Sales',
    chart_region:   '📍 Sales by Region',
    chart_lb:       '👤 Salesperson Leaderboard',
    th_rank:        'Rank', th_name: 'Salesperson', th_orders: 'Orders', th_sales: 'Net Sales', th_rating: 'Rating',
    db_footer:      'Powered by Looker Studio · Data Source: SQL Server · Last updated: Dec 2025',
    note_box:       'The dashboard above represents the Looker Studio interface. For the fully interactive version, import <code>sales_data_clean.csv</code> into Google Looker Studio.',
    sec_workflow:   'Workflow',
    workflow_title: 'Project Workflow',
    step1_title:    'Dataset Generation & Problem Identification',
    step1_desc:     'A synthetic dataset of 2,500 rows was intentionally created with <em>dirty data</em>: duplicates, inconsistent date formats, negative values, non-numeric characters, and capitalization inconsistencies.',
    step2_title:    'Data Cleaning with Python & Pandas',
    step2_desc:     'The script <code style="background:var(--g50);padding:1px 5px;border-radius:4px;font-size:.75rem">data_cleaning.py</code> removed 10 duplicates, 247 invalid dates, 193 dirty prices, and 244 invalid quantities. Output: <strong>1,806 clean rows</strong> + derived columns.',
    step3_title:    'Analysis with SQL Server (T-SQL)',
    step3_desc:     'Clean data was imported into SQL Server. 10 analytical queries were written covering KPI summaries, MoM trends, product & salesperson rankings, YoY analysis, and regional contribution.',
    step4_title:    'Visualization in Looker Studio',
    step4_desc:     'An interactive dashboard in Google Looker Studio displaying 4 KPI tiles, monthly trends, category distribution, top products, regional heatmap, and salesperson leaderboard.',
    sec_code:       'Code',
    py_title:       'Data Cleaning Snippet (Python)',
    sql_title:      'SQL Snippet — MoM Growth & Ranking',
    sec_insight:    'Insight',
    findings_title: 'Key Findings',
    f1_title:       'Laptop Pro X1 is the star product',
    f1_desc:        'Contributing Rp 260.1 Billion — around 31% of total net sales — far surpassing other products. An upsell strategy for this product holds strong revenue growth potential.',
    f2_title:       'West Java + East Java = 42% of transactions',
    f2_desc:        'These two regions dominate order volume. Significant expansion potential remains in East Kalimantan and South Sulawesi, each contributing only ~9.5%.',
    f3_title:       'Online & Offline nearly balanced (52% vs 48%)',
    f3_desc:        'The balanced channel distribution indicates a healthy omnichannel strategy. Further investment in the online channel could drive growth more efficiently.',
    f4_title:       'Raw data: 27.8% of rows needed cleaning',
    f4_desc:        'Of 2,500 raw rows, 694 were eliminated due to dirty data. Implementing real-time validation at the point-of-sale system could prevent data quality issues going forward.',
    sb_info:        'Project Info',
    sb_status:      'Status',
    sb_done:        'Completed',
    sb_year:        'Year',
    sb_cat:         'Category',
    sb_cat_val:     'Dashboard',
    sb_raw:         'Dataset',
    sb_clean:       'Clean Data',
    sb_red:         'Reduction',
    stack_csv_sub:  'Input/Output format',
    sb_dl:          'Download Files',
    dl_raw:         'Raw dataset · 2,500 rows',
    dl_clean:       'Clean data · 1,806 rows',
    dl_py:          'Python cleaning script',
    dl_sql:         'SQL Server queries · 10 analyses',
    sb_stats:       'Data Statistics',
    st_tx:          'Clean Transactions',
    st_disc:        'Avg Discount Rate',
    st_yr:          '3 Years',
    st_cov:         'Data Coverage',
    foot_port:      'Portfolio',
  }
};

let currentLang = 'id';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Update toggle button states
  document.getElementById('btn-id').classList.toggle('active', lang === 'id');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  const t = translations[lang];

  // Apply all data-i18n translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Sync page title
  document.title = lang === 'en'
    ? 'Sales Performance Dashboard | Ilham Hafizt'
    : 'Sales Performance Dashboard | Ilham Hafizt';
}

// Initialise on load
document.addEventListener('DOMContentLoaded', () => setLang('id'));