const lessons = [
    { id: 1, title: "Beginner (A0)",            level: "A0", price: 150,  lang: "en", desc: "Старт для тих, хто тільки починає знайомство з англійською",         materials: { video: "Download.mp4",  audio: "starostin-soft-calm-background-music-376497.mp3", text: null,                                    pdf: "Лабораторна робота №1.pdf" } },
    { id: 2, title: "Elementary (A1)",           level: "A1", price: 250,  lang: "en", desc: "Допоможе закласти фундамент для подальшого навчання",                 materials: { video: "a1-v.mp4",      audio: "a1-a.mp3",                                         text: "Граматика: To Be, Present Simple.",   pdf: null } },
    { id: 3, title: "Англійська для початківців",level: "A2", price: 300,  lang: "en", desc: "Зроби перші кроки у вивченні англійської. Pre-Intermediate",          materials: { video: "a2-v.mp4",      audio: "a2-a.mp3",                                         text: "Минулі часи та лексика подорожей.",   pdf: null } },
    { id: 4, title: "Розмовна англійська",       level: "B1", price: 400,  lang: "en", desc: "Говори сміливо та впевнено.<br>Intermediate",                            materials: { video: "b1-v.mp4",      audio: "b1-a.mp3",                                         text: "Стратегії ведення дискусії.",        pdf: null } },
    { id: 5, title: "Середній рівень",           level: "B2", price: 450,  lang: "en", desc: "Дізнайся true English не з чуток. Upper-Intermediate",               materials: { video: "b2-v.mp4",      audio: "b2-a.mp3",                                         text: "Ідіоми та фразові дієслова.",        pdf: null } },
    { id: 6, title: "Преміум",                   level: "C1", price: 600,  lang: "en", desc: "Високий рівень Advanced відкриває нові горизонти",                    materials: { video: "c1-v.mp4",      audio: "c1-a.mp3",                                         text: "Академічне письмо та складна граматика.", pdf: null } },
    { id: 7, title: "Початковий рівень (Débutant)",    level: "A1", price: 150, lang: "fr", desc: "Базові фрази для повсякденного спілкування",                    materials: { video: "b2-v.mp4",      audio: "b2-a.mp3",                                         text: "Ідіоми та фразові дієслова.",        pdf: null } },
    { id: 8, title: "Базовий рівень (Élémentaire)",    level: "A2", price: 250, lang: "fr", desc: "Прості діалоги та опис знайомих ситуацій<br><br>",                      materials: { video: "b2-v.mp4",      audio: "b2-a.mp3",                                         text: "Ідіоми та фразові дієслова.",        pdf: null } },
    { id: 9, title: "Середній рівень (Intermédiaire)", level: "B1", price: 450, lang: "fr", desc: "Розмови на знайомі теми та письмові тексти середньої складності", materials: { video: "b2-v.mp4",      audio: "b2-a.mp3",                                         text: "Ідіоми та фразові дієслова.",        pdf: null } },
];

function createLessonCard(lesson) {
    const m = lesson.materials;

    const materialsHTML = `
        <div class="media-block">
            <h4>🎬 Відео</h4>
            <video controls><source src="${m.video}" type="video/mp4"></video>
        </div>
        <div class="media-block">
            <h4>🎧 Аудіо</h4>
            <audio controls><source src="${m.audio}" type="audio/mpeg"></audio>
        </div>
        <div class="media-block">
            <h4>📄 Текст</h4>
            ${m.pdf
                ? `<a href="${m.pdf}" download>Завантажити файл</a>`
                : `<p>${m.text || ''}</p>`
            }
        </div>
    `;

    const article = document.createElement('article');
    article.className = 'lesson-card';
    article.dataset.lessonId = lesson.id;
    article.dataset.level = lesson.level;
    article.dataset.price = lesson.price;
    article.dataset.lang = lesson.lang;

    article.innerHTML = `
        <div class="badge">${lesson.level}</div>
        <h3>${lesson.title}</h3>
        <p>${lesson.desc}</p>
        <p class="price">Ціна: ${lesson.price} грн</p>
        <button class="start-btn">Почати курс</button>
        <details class="material-popup">
            <summary>Переглянути матеріали</summary>
            <div class="popup-inner">${materialsHTML}</div>
        </details>
        <br>
        <button class="end-btn">Відзначити як пройдений</button>
    `;

    return article;
}

function renderLessons() {
    const enGrid = document.getElementById('en-grid');
    const frGrid = document.getElementById('fr-grid');

    if (!enGrid && !frGrid) return;

    for (let i = 0; i < lessons.length; i++) {
        const card = createLessonCard(lessons[i]);

        if (lessons[i].lang === 'en' && enGrid) {
            enGrid.appendChild(card);
        } else if (lessons[i].lang === 'fr' && frGrid) {
            frGrid.appendChild(card);
        }
    }
}

function loadCompletedLessons() {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
        const completedIds = JSON.parse(saved);
        for (let i = 0; i < lessons.length; i++) {
            if (completedIds.includes(lessons[i].id)) {
                lessons[i].completed = true;
            }
        }
    }
}

function saveCompletedLessons() {
    const completedIds = [];
    for (let i = 0; i < lessons.length; i++) {
        if (lessons[i].completed) {
            completedIds.push(lessons[i].id);
        }
    }
    localStorage.setItem('completedLessons', JSON.stringify(completedIds));
}


function markLessonComplete(lessonId, buttonElement) {
    for (let i = 0; i < lessons.length; i++) {
        if (lessons[i].id === lessonId) {
            lessons[i].completed = true;
            break;
        }
    }
    saveCompletedLessons();

    const card = buttonElement.closest('.lesson-card');
    card.classList.add('completed');

    buttonElement.textContent = '💟 Пройдено';
    buttonElement.disabled = true;
    buttonElement.style.background = '#9400D3';
    buttonElement.style.cursor = 'not-allowed';

    const startBtn = card.querySelector('.start-btn');
    if (startBtn) startBtn.style.display = 'none';

    updateProgress();
}

function updateProgress() {
    let completedCount = 0;
    for (let i = 0; i < lessons.length; i++) {
        if (lessons[i].completed) completedCount++;
    }

    const progressPercent = Math.round((completedCount / lessons.length) * 100);

    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.label-row span:last-child');
    const completedStat = document.querySelector('.stat-bubble:first-child .stat-num');

    if (progressFill) progressFill.style.width = progressPercent + '%';
    if (progressText) progressText.textContent = progressPercent + '%';
    if (completedStat) completedStat.textContent = completedCount;
}

function loadStartedLessons() {
    const saved = localStorage.getItem('startedLessons');
    return saved ? JSON.parse(saved) : [];
}

function saveStartedLesson(lessonId) {
    const started = loadStartedLessons();
    if (!started.includes(lessonId)) {
        started.push(lessonId);
        localStorage.setItem('startedLessons', JSON.stringify(started));
    }
}

function applyStartedBtn(btn) {
    btn.textContent = 'Ви розпочали курс';
    btn.style.background = '#ffc0cb';
    btn.style.color = '#000';
    btn.style.cursor = 'default';
    btn.disabled = true;
     btn.classList.add('started');
}

function resetStartedLessons() {
    if (confirm('Скинути статус "розпочато" для всіх курсів?')) {
        localStorage.removeItem('startedLessons');
        location.reload();
    }
}

window.resetStartedLessons = resetStartedLessons;

document.addEventListener('DOMContentLoaded', function () {
    loadCompletedLessons();

    // Генерація карток через цикл for
    renderLessons();

    const startedIds = loadStartedLessons();
    const lessonCards = document.querySelectorAll('.lesson-card');

    // Застосовуємо збережені стани
    for (let i = 0; i < lessonCards.length; i++) {
        const lessonId = parseInt(lessonCards[i].dataset.lessonId);
        const lesson = lessons.find(l => l.id === lessonId);

        // Стан "пройдено"
        if (lesson && lesson.completed) {
            lessonCards[i].classList.add('completed');
            const completeBtn = lessonCards[i].querySelector('.end-btn');
            if (completeBtn) {
                completeBtn.textContent = '💟 Пройдено';
                completeBtn.disabled = true;
                completeBtn.style.background = '#9400D3';
                completeBtn.style.cursor = 'not-allowed';
            }

            const startBtn = lessonCards[i].querySelector('.start-btn');
            if (startBtn) startBtn.style.display = 'none';
        }

        // Стан "розпочато"
        const startBtn = lessonCards[i].querySelector('.start-btn');
        if (startBtn && startedIds.includes(lessonId)) {
            applyStartedBtn(startBtn);
        }
    }

    // Обробники кнопки "Почати курс"
    const startButtons = document.querySelectorAll('.start-btn');
    for (let i = 0; i < startButtons.length; i++) {
        startButtons[i].addEventListener('click', function () {
            const card = this.closest('.lesson-card');
            const lessonId = parseInt(card.dataset.lessonId);
            if (lessonId) saveStartedLesson(lessonId);
            applyStartedBtn(this);
        });
    }

    // Обробники кнопки "Відзначити як пройдений"
    const completeButtons = document.querySelectorAll('.end-btn');
    for (let i = 0; i < completeButtons.length; i++) {
        completeButtons[i].addEventListener('click', function () {
            const card = this.closest('.lesson-card');
            const lessonId = parseInt(card.dataset.lessonId);
            if (lessonId) markLessonComplete(lessonId, this);
        });
    }

    // Фільтри
    const searchInput = document.getElementById('search');
    const sortPrice = document.getElementById('SortPrice');
    const sortBadge = document.getElementById('SortBadge');
    const resetBtn = document.getElementById('resetBtn');

    function applyFilters() {
        const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
        const priceVal = sortPrice ? sortPrice.value : 'Без';
        const badgeVal = sortBadge ? sortBadge.value : '';

        const allCards = document.querySelectorAll('.lesson-card');
        let visible = [];

        for (let i = 0; i < allCards.length; i++) {
            const card = allCards[i];
            const title = card.querySelector('h3').textContent.toLowerCase();
            const level = card.dataset.level;
            const price = parseInt(card.dataset.price);

            const matchSearch = !searchVal || title.includes(searchVal);
            const matchBadge = !badgeVal || level === badgeVal;

            if (matchSearch && matchBadge) {
                card.style.display = '';
                visible.push({ card, price });
            } else {
                card.style.display = 'none';
            }
        }

        // Сортування за ціною
        if (priceVal === 'менше<більше') {
            visible.sort((a, b) => a.price - b.price);
        } else if (priceVal === 'більше>менше') {
            visible.sort((a, b) => b.price - a.price);
        }

        // Перестановка карток в DOM
        if (priceVal !== 'Без') {
            const enGrid = document.getElementById('en-grid');
            const frGrid = document.getElementById('fr-grid');
            for (let i = 0; i < visible.length; i++) {
                const lang = visible[i].card.dataset.lang;
                if (lang === 'en' && enGrid) enGrid.appendChild(visible[i].card);
                if (lang === 'fr' && frGrid) frGrid.appendChild(visible[i].card);
            }
        }

        // Повідомлення "нічого не знайдено"
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.classList.toggle('show', visible.length === 0);
        }
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (sortPrice) sortPrice.addEventListener('change', applyFilters);
    if (sortBadge) sortBadge.addEventListener('change', applyFilters);

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            if (searchInput) searchInput.value = '';
            if (sortPrice) sortPrice.value = 'Без';
            if (sortBadge) sortBadge.value = '';
            applyFilters();
        });
    }

    updateProgress();
});

let studyTimer = {
    seconds: 0,
    interval: null,
    isRunning: false
};

function loadStudyTime() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('studyDate');
    if (savedDate === today) {
        const savedTime = localStorage.getItem('studyTime');
        if (savedTime) studyTimer.seconds = parseInt(savedTime);
    } else {
        studyTimer.seconds = 0;
        localStorage.setItem('studyDate', today);
        localStorage.setItem('studyTime', '0');
    }
}

function saveStudyTime() {
    localStorage.setItem('studyTime', studyTimer.seconds.toString());
}

function startStudyTimer() {
    if (studyTimer.isRunning) return;
    studyTimer.isRunning = true;
    studyTimer.interval = setInterval(function () {
        studyTimer.seconds++;
        updateTimerDisplay();
        saveStudyTime();
    }, 1000);
}

function stopStudyTimer() {
    if (studyTimer.interval) {
        clearInterval(studyTimer.interval);
        studyTimer.isRunning = false;
    }
}

function updateTimerDisplay() {
    const hours = Math.floor(studyTimer.seconds / 3600);
    const minutes = Math.floor((studyTimer.seconds % 3600) / 60);
    const seconds = studyTimer.seconds % 60;
    const timeString =
        (hours > 0 ? hours + ' год ' : '') +
        (minutes > 0 ? minutes + ' хв ' : '') +
        seconds + ' сек';
    const timerElement = document.getElementById('study-timer');
    if (timerElement) timerElement.textContent = timeString;
}

document.addEventListener('DOMContentLoaded', function () {
    loadStudyTime();
    updateTimerDisplay();
    startStudyTimer();
    window.addEventListener('beforeunload', function () {
        saveStudyTime();
        stopStudyTimer();
    });
});