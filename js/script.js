// === LANG TOGGLE ===
let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;

    // Update all elements with data-en / data-id
    document.querySelectorAll('[data-en], [data-id]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (!text) return;
        // Preserve inner HTML for elements that use <em> etc.
        if (text.includes('<')) {
        el.innerHTML = text;
        } else {
        el.textContent = text;
        }
    });

    // Update placeholders that use data-placeholder-en / data-placeholder-id
    document.querySelectorAll('[data-placeholder-en], [data-placeholder-id]').forEach(el => {
        const ph = el.getAttribute(`data-placeholder-${lang}`);
        if (ph) el.placeholder = ph;
    });

    // Update active state on all toggle buttons
    ['btn-id', 'btn-en', 'btn-id-m', 'btn-en-m'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const btnLang = id.includes('-en') ? 'en' : 'id';
        btn.classList.toggle('active', btnLang === lang);
    });
};


// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('bg-white/95', 'backdrop-blur', 'shadow-sm');
    } else {
        navbar.classList.remove('bg-white/95', 'backdrop-blur', 'shadow-sm');
    }
});


// === SCROLL PROGRES BAR ===
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) progressBar.style.width = progress + '%';
});


// === HAMBURGER MOBILE MENU ===
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l =>
    l.addEventListener('click', () => mobileMenu.classList.remove('open'))
);


// === BACK TO TOP ===
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
    if (backTop) backTop.style.opacity = window.scrollY > 300 ? '1' : '0';
});


// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.pct + '%';
            });
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// === TYPEWRITTER ===
const typewriterEl = document.getElementById('typewriter-text');
const words = [
    'Data Visualization',
    'SQL & Python Enthusiast',
    'Dashboard Builder',
    'Insight Storyteller',
    'Business Intelligence Analyst',
];
let wordIdx = 0, charIdx = 0, isDeleting = false;

function typeWriter() {
    if (!typewriterEl) return;
    const current = words[wordIdx];
    const displayed = isDeleting
        ? current.substring(0, charIdx--)
        : current.substring(0, charIdx++);

    typewriterEl.textContent = displayed;

    let delay = isDeleting ? 50 : 100;
    if (!isDeleting && charIdx === current.length + 1) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 400;
    }
    setTimeout(typeWriter, delay);
}
typeWriter();


// === SKILL BAR ===
const skills = [
    { name: 'Python (Pandas)', pct: 88 },
    { name: 'SQL & Database', pct: 92 },
    { name: 'Data & Visualization', pct: 85 },
    { name: 'Statistics & Probability', pct: 80 },
    { name: 'Excel & Google Sheets', pct: 90 },
];

function renderSkills() {
    const el = document.getElementById('skill-bars');
    if (!el) return;
    el.innerHTML = skills.map(s => `
    <div>
        <div class="flex justify-between mb-1">
            <span class="text-sm text-green-700 font-medium">${s.name}</span>
            <span class="text-sm text-green-500">${s.pct}%</span>
        </div>
        <div class="h-1.5 bg-green-100 rounded-full overflow-hidden">
            <div class="skill-bar-fill" data-pct="${s.pct}" style="width:0"></div>
        </div>
    </div>`).join('');
};
renderSkills();


// === TOOL BAR ===
const tools = [
    { icon: '🗄️', name: 'SQL Server' },
    { icon: '🗄️', name: 'PostgreSQL' },
    { icon: '☁️', name: 'BigQuery' },
    { icon: '🐍', name: 'Python' },
    { icon: '📓', name: 'Jupyter' },
    { icon: '🔬', name: 'Looker Studio' },
];

function renderTools() {
    const el = document.getElementById('tool-cards');
    if (!el) return;
    el.innerHTML = tools.map(t => `
    <div class="card p-4 flex items-center gap-3">
        <span class="text-2xl">${t.icon}</span>
        <span class="text-sm font-medium text-green-800">${t.name}</span>
    </div>`).join('');
}
renderTools();


// === TIMELINE ===
const timelineData = [
    {
        type_en: 'University',
        type_id: 'Universitas',
        title_en: 'Bachelor of Mathematics Education',
        title_id: 'S1 Pendidikan Matematika',
        org_en: 'Tanjungpura University',
        org_id: 'Universitas Tanjungpura',
        period: '2021 - 2025',
        desc_en: 'Studied mathematics, statistics, and analytical problem-solving. Developed a passion for data analysis through academic projects.',
        desc_id: 'Mempelajari matematika, statistik, dan pemecahan masalah analitis. Mengembangkan minat dalam analisis data melalui proyek akademik.',
        tags: ['Mathematics', 'Statistics', 'Research'],
    },
    {
        type_en: 'Course',
        type_id: 'Kursus',
        title_en: 'Data Analyst Bootcamp',
        title_id: 'Bootcamp Data Analis',
        org_en: 'Online Course',
        org_id: 'Kursus Online',
        period: '2026',
        desc_en: 'Training in Python, SQL, data visualization (Looker Studio), and storytelling with data.',
        desc_id: 'Pelatihan Python, SQL, visualisasi data (Looker Studio), dan storytelling dengan data.',
        tags: ['Python', 'SQL', 'Looker Studio'],
    },
    {
        type_en: 'Self-Learning',
        type_id: 'Belajar Mandiri',
        title_en: 'Data Analyst',
        title_id: 'Data Analisis',
        org_en: 'Self-Study',
        org_id: 'Belajar Mandiri',
        period_en: 'Present',
        period_id: 'Sekarang',
        desc_en: 'Continuing to expand skills in data analyst, statistical modelling, and advanced SQL through online courses.',
        desc_id: 'Terus mengembangkan kemampuan data analis, pemodelan statistik, dan SQL lanjutan melalui kursus online.',
        tags: ['Statistics', 'SQL', 'Python'],
    },
];

function renderTimeline() {
    const el = document.getElementById('timeline-container');
    if (!el) return;
    const typeIcon = {
        'University': '🎓',
        'Course': '🏅',
        'Self-Learning': '📚'
    };
    el.innerHTML = timelineData.map((item, i) => {
        const isLast = i === timelineData.length - 1;
        return `
        <div class="flex gap-5 ${isLast ? '' : 'mb-8'}">
            <div class="flex flex-col items-center">
                <div class="timeline-dot"></div>
                ${!isLast ? '<div class="timeline-line flex-1 mt-1"></div>' : ''}
            </div>
            <div class="card p-5 flex-1 mb-2">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span class="badge"
                        data-en="${item.type_en}"
                        data-id="${item.type_id}">
                        ${typeIcon[item.type_en]} ${item.type_en}
                    </span>
                    <span class="text-xs text-green-500 font-medium"
                        ${item.period_en
                            ? `data-en="${item.period_en}" data-id="${item.period_id}"`
                            : `data-en="${item.period}" data-id="${item.period}"`
                        }>
                        ${item.period || item.period_en}
                    </span>
                </div>
                <h4 class="font-semibold text-green-800"
                    data-en="${item.title_en}"
                    data-id="${item.title_id}">
                    ${item.title_en}
                </h4>
                <p class="text-sm text-green-500 mb-2"
                    data-en="${item.org_en}"
                    data-id="${item.org_id}">
                    ${item.org_en}
                </p>
                <p class="text-sm text-green-600 leading-relaxed"
                    data-en="${item.desc_en}"
                    data-id="${item.desc_id}">
                    ${item.desc_en}
                </p>
                <div class="flex flex-wrap gap-2 mt-3">
                    ${item.tags.map(t => `
                        <span class="badge text-xs px-2 py-0.5">${t}</span>
                    `).join('')}
                </div>
            </div>
        </div>
        `;
    }).join('');
};


// === PROJECT CARDS ===
const projects = [
    {
        emoji:    '📊',
        category: 'dashboard',
        tag_en:   'Dashboard',
        tag_id:   'Dashboard',
        title_en: 'Sales Performance Dashboard',
        title_id: 'Dashboard Performa Penjualan',
        desc_en:  'Interactive Looker Studio dashboard that helps business teams make data-driven decisions.',
        desc_id:  'Dashboard Looker Studio interaktif yang membantu tim bisnis membuat keputusan berbasis data.',
        tags:     ['Python', 'SQL', 'Looker Studio'],
        link:     'https://ilhamhafizt.github.io/Sales-Performance-Dashboard/',
        github:   'https://github.com/ilhamhafizt/Sales-Performance-Dashboard',
    },
    {
        emoji:    '🛒',
        category: 'analysis',
        tag_en:   'Analysis',
        tag_id:   'Analisis',
        title_en: 'E-Commerce Customer Behavior Analysis',
        title_id: 'Analisis Perilaku Pelanggan E-Commerce',
        desc_en:  'Python-based analysis of customer purchase patterns, segmentation using RFM model, and cohort retention analysis.',
        desc_id:  'Analisis berbasis Python terhadap pola pembelian pelanggan, segmentasi menggunakan model RFM, dan analisis retensi kohort.',
        tags:     ['Python', 'Pandas', 'Matplotlib'],
        link:     '#',
        github:   'https://github.com/ilhamhafizt',
    },
    {
        emoji:    '🤖',
        category: 'ml',
        tag_en:   'Machine Learning',
        tag_id:   'Machine Learning',
        title_en: 'Customer Churn Prediction',
        title_id: 'Prediksi Churn Pelanggan',
        desc_en:  'Binary classification model predicting customer churn using Scikit-learn with feature engineering and model evaluation.',
        desc_id:  'Model klasifikasi biner untuk memprediksi churn pelanggan menggunakan Scikit-learn dengan rekayasa fitur dan evaluasi model.',
        tags:     ['Python', 'Scikit-learn', 'Kaggle'],
        link:     '#',
        github:   'https://github.com/ilhamhafizt',
    },
    {
        emoji:    '📈',
        category: 'dashboard',
        tag_en:   'Dashboard',
        tag_id:   'Dashboard',
        title_en: 'HR Analytics Dashboard',
        title_id: 'Dashboard HR Analytics',
        desc_en:  'Tableau dashboard visualizing employee turnover, department headcount, and satisfaction scores from HR data.',
        desc_id:  'Dashboard Tableau yang memvisualisasikan turnover karyawan, jumlah per departemen, dan skor kepuasan dari data HR.',
        tags:     ['Tableau', 'Excel', 'Statistics'],
        link:     '#',
        github:   '#',
    },
    {
        emoji:    '🌾',
        category: 'analysis',
        tag_en:   'Analysis',
        tag_id:   'Analisis',
        title_en: 'Agricultural Production Analysis',
        title_id: 'Analisis Produksi Pertanian',
        desc_en:  'Exploratory data analysis on Indonesian agricultural production data to identify regional yield trends and seasonal patterns.',
        desc_id:  'Analisis data eksploratif pada data produksi pertanian Indonesia untuk mengidentifikasi tren hasil daerah dan pola musiman.',
        tags:     ['Python', 'NumPy', 'Seaborn'],
        link:     '#',
        github:   'https://github.com/ilhamhafizt',
    },
    {
        emoji:    '💰',
        category: 'ml',
        tag_en:   'Machine Learning',
        tag_id:   'Machine Learning',
        title_en: 'House Price Prediction',
        title_id: 'Prediksi Harga Rumah',
        desc_en:  'Regression model predicting house prices based on location, size, and amenity features using gradient boosting.',
        desc_id:  'Model regresi untuk memprediksi harga rumah berdasarkan lokasi, ukuran, dan fitur fasilitas menggunakan gradient boosting.',
        tags:     ['Python', 'XGBoost', 'Kaggle'],
        link:     '#',
        github:   'https://github.com/ilhamhafizt',
    },
];

function renderProjects(filter = 'all') {
    const grid = document.getElementById('project-grid');
    if (!grid) return;
    const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);
    grid.innerHTML = filtered.map(p => `
        <div class="card project-card overflow-hidden" data-category="${p.category}">
            <!-- Emoji Header -->
            <div class="h-36 flex items-center justify-center text-6xl"
                style="background:linear-gradient(135deg,#dcfce7,#bbf7d0)">
                ${p.emoji}
            </div>
            <!-- Content -->
            <div class="p-5">
                <!-- Title -->
                <h4 class="font-semibold text-green-800 mb-1"
                    data-en="${p.title_en}" data-id="${p.title_id}">
                    ${p.title_en}
                </h4>
                <!-- Description -->
                <p class="text-sm text-green-600 leading-relaxed mb-3"
                    data-en="${p.desc_en}" data-id="${p.desc_id}">
                    ${p.desc_en}
                </p>
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                    ${p.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                </div>
                <!-- Actions (INI DARI JS 1) -->
                <div class="flex gap-2 mt-2">
                    <!-- View Project -->
                    <a href="${p.link}" 
                        class="flex-1 text-center text-xs font-semibold bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors"
                        data-en="View Project" data-id="Lihat Proyek">
                        View Project
                    </a>
                    <!-- GitHub -->
                    <a href="${p.github}" target="_blank"
                        class="flex-1 text-center text-xs font-semibold border border-green-300 hover:bg-green-50 text-green-700 px-3 py-2 rounded-lg transition-colors">
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    `).join('');
};


// === FILTER BUTTONS ===
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-green-500', 'text-white'));
        btn.classList.add('active', 'bg-green-500', 'text-white');
        renderProjects(btn.dataset.filter);
    });
});

// === WHATSAPP FORM HANDLER
function sendViaWhatsApp() {
    const name    = document.getElementById('form-name')?.value.trim();
    const email   = document.getElementById('form-email')?.value.trim();
    const subject = document.getElementById('form-subject')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !subject || !message) {
        const alertMsg = currentLang === 'id'
        ? 'Harap isi Nama, Subjek, dan Pesan.'
        : 'Please fill in Name, Subject, and Message.';
        alert(alertMsg);
        return;
    }

    const waNumber = '6289653306722';
    const text = encodeURIComponent(
        `Halo Ilham! \n\n*Nama:* ${name}\n*Email:* ${email || '-'}\n*Subjek:* ${subject}\n\n*Pesan:*\n${message}`
    );
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
};

// === INIT ===
renderTimeline();
renderProjects();
setLang('en');