function showPage(page) {
    window.location.href = page;
}

function showAI() {
    alert('سيتم تفعيل خاصية الذكاء الاصطناعي قريباً');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function applyStoredTheme() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}
