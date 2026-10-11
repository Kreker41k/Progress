class ProgressBlock {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        if (!this.root) throw new Error('Root element not found');
        this.svgBar = this.root.querySelector('.progress-bar');
        // Длина окружности
        this.circleLength = 314.159; 
        this.value = 0;
        this.isAnimated = false;
        this.isHidden = false;
        this.updateStroke();
    }

    /**
     * Установка значения прогресса (0-100)
     * @param {number} val 
     */
    setValue(val) {
        let num = Number(val);
        if (isNaN(num)) num = 0;
        
        this.value = Math.min(Math.max(num, 0), 100);
        this.updateStroke();
    }

    updateStroke() {
        const offset = this.circleLength - (this.circleLength * (this.value / 100));
        this.svgBar.style.strokeDashoffset = offset;
    }

    /**
     * Переключение анимации вращения
     * @param {boolean} state 
     */
    setAnimated(state) {
        this.isAnimated = state;
        if (state) {
            this.root.classList.add('animated');
        } else {
            this.root.classList.remove('animated');
        }
    }

    /**
     * Скрытие/Показ блока
     * @param {boolean} state 
     */
    setHidden(state) {
        this.isHidden = state;
        if (state) {
            this.root.classList.add('hidden');
        } else {
            this.root.classList.remove('hidden');
        }
    }
}

// --- Инициализация и связывание с UI ---

document.addEventListener('DOMContentLoaded', () => {
    const progress = new ProgressBlock('#progress-root');
    const valueInput = document.getElementById('value-input');
    const animateToggle = document.getElementById('animate-toggle');
    const hideToggle = document.getElementById('hide-toggle');

    if (valueInput) progress.setValue(valueInput.value);
    if (animateToggle) progress.setAnimated(animateToggle.checked);
    if (hideToggle) progress.setHidden(hideToggle.checked);

    // Обработка ввода значения
    if (valueInput) {
        valueInput.addEventListener('input', (e) => {
            let val = e.target.value;
            // Валидация на лету
            if (val > 100) {
                val = 100;
                e.target.value = 100;
            }
            if (val < 0) {
                val = 0;
                e.target.value = 0;
            }
            progress.setValue(val);
        });
    }

    // Обработка переключателя Animate
    if (animateToggle) {
        animateToggle.addEventListener('change', (e) => {
            progress.setAnimated(e.target.checked);
        });
    }

    // Обработка переключателя Hide
    if (hideToggle) {
        hideToggle.addEventListener('change', (e) => {
            progress.setHidden(e.target.checked);
        });
    }
});