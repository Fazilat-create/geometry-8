/* =========================================
   presentation.js — Логика слайдов и тестов
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const counter = document.getElementById('counter');
    const progress = document.getElementById('progress');
    let current = 0;

    // Если слайдов нет, выходим
    if (slides.length === 0) return;

    function showSlide(index){
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        current = index;
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === slides.length - 1);
        counter.textContent = (index + 1) + ' / ' + slides.length;
        progress.style.width = ((index + 1) / slides.length * 100) + '%';
        window.scrollTo({top:0, behavior:'smooth'});
    }

    prevBtn.addEventListener('click', () => { if(current > 0) showSlide(current - 1); });
    nextBtn.addEventListener('click', () => { if(current < slides.length - 1) showSlide(current + 1); });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft' && current > 0) showSlide(current - 1);
        if(e.key === 'ArrowRight' && current < slides.length - 1) showSlide(current + 1);
    });

    /* Логика тестов */
    document.querySelectorAll('.quiz-item').forEach(item => {
        const feedback = item.querySelector('.quiz-feedback');
        const buttons = item.querySelectorAll('.quiz-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.disabled = true);
                const userAns = btn.dataset.ans === 'true';

                if (userAns) {
                    btn.classList.add('correct');
                    feedback.textContent = '✔ Верно!';
                    feedback.className = 'quiz-feedback ok';
                } else {
                    btn.classList.add('wrong');
                    buttons.forEach(b => {
                        if (b.dataset.ans === 'true') b.classList.add('correct');
                    });
                    feedback.textContent = '✘ Неверно. Правильный ответ подсвечен.';
                    feedback.className = 'quiz-feedback no';
                }
            });
        });
    });

    showSlide(0);
});
