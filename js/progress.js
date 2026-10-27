/* ==========================================================
   progress.js — отображение прогресса на главной странице
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const cards    = document.querySelectorAll('[data-lesson-id]');
    const bar      = document.querySelector('[data-progress-bar] .progress-bar__fill');
    const label    = document.querySelector('[data-progress-label]');
    const total    = cards.length;

    const completed = getProgress();

    // Отметить карточки пройденных уроков
    cards.forEach(card => {
        const id = card.dataset.lessonId;
        if (completed.includes(id)) {
            card.classList.add('is-completed');
            const status = card.querySelector('[data-lesson-status]');
            if (status) status.textContent = 'Урок пройден';
        }
    });

    // Прогресс-бар
    const percent = total > 0 ? Math.round((completed.length / total) * 100) : 0;
    if (bar)   bar.style.width = percent + '%';
    if (label) label.textContent = `Пройдено уроков: ${completed.length} из ${total}`;
});

function getProgress() {
    try {
        return JSON.parse(localStorage.getItem('geom8-progress') || '[]');
    } catch {
        return [];
    }
}
