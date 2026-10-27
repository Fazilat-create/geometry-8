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

    // 1. Функция переключения слайдов (только навигация)
    function showSlide(index){
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        current = index;
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === slides.length - 1);
        counter.textContent = (index + 1) + ' / ' + slides.length;
        progress.style.width = ((index + 1) / slides.length * 100) + '%';
        window.scrollTo({top:0, behavior:'smooth'});
    }

    // 2. Обработка кнопок навигации
    prevBtn.addEventListener('click', () => { if(current > 0) showSlide(current - 1); });
    nextBtn.addEventListener('click', () => { if(current < slides.length - 1) showSlide(current + 1); });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft' && current > 0) showSlide(current - 1);
        if(e.key === 'ArrowRight' && current < slides.length - 1) showSlide(current + 1);
    });

    // 3. Логика тестов с выбором варианта
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
                    // Подсвечиваем правильный ответ
                    buttons.forEach(b => {
                        if (b.dataset.ans === 'true') b.classList.add('correct');
                    });
                    feedback.textContent = '✘ Неверно. Правильный ответ подсвечен.';
                    feedback.className = 'quiz-feedback no';
                }
            });
        });
    });

    // 4. Логика для полей ввода (Input-answer) — вынесена отдельно!
    document.querySelectorAll('.input-answer').forEach(block => {
        const input = block.querySelector('input');
        const btn = block.querySelector('button');
        const result = block.querySelector('.input-answer__result');
        const correct = block.dataset.inputAnswer;

        if(!btn) return;

        btn.addEventListener('click', () => {
            const value = input.value.trim().replace(',', '.');
            if (parseFloat(value) === parseFloat(correct)) {
                result.textContent = '✓ Верно!';
                result.className = 'input-answer__result is-correct';
            } else {
                result.textContent = '✗ Попробуй ещё раз';
                result.className = 'input-answer__result is-wrong';
            }
        });

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') btn.click();
        });
    });

    // Инициализация первого слайда
    showSlide(0);
});
