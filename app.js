let surahs = [];
const randomVerses = [
    "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ",
    "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    "وَقُل رَّبِّ زِدْنِي عِلْمًا",
];

async function fetchSurahs() {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();
        surahs = data.data;
        displaySurahs();
    } catch (error) {
        console.error('Error fetching surahs:', error);
    }
}

function displaySurahs() {
    const surahGrid = document.getElementById('surahGrid');
    if (!surahGrid) return;
    
    surahGrid.innerHTML = '';
    surahs.forEach(surah => {
        const surahCard = document.createElement('div');
        surahCard.className = 'surah-card';
        surahCard.innerHTML = `
            <h3>${surah.name}</h3>
            <p>سورة رقم ${surah.number}</p>
            <p>${surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - ${surah.numberOfAyahs} آية</p>
        `;
        surahCard.onclick = () => openSurahPage(surah.number);
        surahGrid.appendChild(surahCard);
    });
}

function openSurahPage(surahNumber) {
    localStorage.setItem('currentSurahNumber', surahNumber);
    window.location.href = 'surah_page.html';
}

function updateRandomVerse() {
    const verseElement = document.getElementById('randomVerse');
    if (verseElement) {
        verseElement.textContent = randomVerses[Math.floor(Math.random() * randomVerses.length)];
    }
}

function showPage(page) {
    window.location.href = page;
}

function applyCommonSettings() {
    applyDarkMode();
    applyFontSize();
    applyLanguage();
    applyHeaderColor();
    applyFooterColor();
    setupNavigation();
}

function applyDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
}

function applyFontSize() {
    const fontSize = localStorage.getItem('fontSize') || '16';
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    document.body.style.fontSize = `var(--base-font-size)`;
}

function applyLanguage() {
    const language = localStorage.getItem('language') || 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    // هنا يمكنك إضافة المزيد من المنطق لتغيير النصوص بناءً على اللغة
}

function applyHeaderColor() {
    const headerColor = localStorage.getItem('headerColor') || '#1e88e5';
    document.querySelector('header').style.backgroundColor = headerColor;
}

function applyFooterColor() {
    const footerColor = localStorage.getItem('footerColor') || '#1e88e5';
    document.querySelector('.bottom-nav').style.backgroundColor = footerColor;
}

function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navButtons = document.querySelectorAll('.bottom-nav button');
    navButtons.forEach(button => {
        const buttonPage = button.getAttribute('onclick').split("'")[1];
        if (currentPage === buttonPage) {
            button.classList.add('active');
        }
    });
}

// إضافة هذه الوظيفة لتحديث الإعدادات في الوقت الفعلي
function updateSettings(setting, value) {
    localStorage.setItem(setting, value);
    applyCommonSettings();
}

function showAI() {
    // هنا يمكنك إضافة المنطق لعرض واجهة AI
    alert('AI feature is coming soon!');
}

document.addEventListener('DOMContentLoaded', () => {
    applyCommonSettings();
    fetchSurahs();
    updateRandomVerse();
    setInterval(updateRandomVerse, 10000);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful');
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
