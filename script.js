class ProgressAPI {
    constructor() {
        this.progress = null;
        this.valueInput = null;
        this.animateCheck = null;
        this.hideCheck = null;
        this.currentValue = 100;
        this.isAnimated = false;
        this.isHidden = false;
        
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleAnimateChange = this.handleAnimateChange.bind(this);
        this.handleHideChange = this.handleHideChange.bind(this);
    }

    attachToDOM(progressId, circleId, valueInputId, animateCheckId, hideCheckId) {
        this.progress = document.getElementById(progressId);
        this.circle = document.getElementById(circleId);
        this.valueInput = document.getElementById(valueInputId);
        this.animateCheck = document.getElementById(animateCheckId);
        this.hideCheck = document.getElementById(hideCheckId);

        if (!this.progress || !this.circle || !this.valueInput || !this.animateCheck || !this.hideCheck) {
            return false;
        }

        this.init();
        return true;
    }

    init() {
        this.updateProgressValue(this.currentValue);
        this.valueInput.addEventListener('input', this.handleValueChange);
        this.animateCheck.addEventListener('change', this.handleAnimateChange);
        this.hideCheck.addEventListener('change', this.handleHideChange);
        
        this.valueInput.addEventListener('blur', () => {
            let val = parseInt(this.valueInput.value);
            if (isNaN(val)) val = 0;
            if (val < 0) val = 0;
            if (val > 100) val = 100;
            this.valueInput.value = val;
            this.updateProgressValue(val);
        });
    }

    setValue(value) {
        if (!this.valueInput) return;
        value = Math.min(100, Math.max(0, parseInt(value) || 0));
        this.valueInput.value = value;
        this.updateProgressValue(value);
        return this;
    }

    setAnimated(animated) {
        if (!this.animateCheck) return;
        this.animateCheck.checked = animated;
        this.handleAnimateChange({ target: { checked: animated } });
        return this;
    }

    setHidden(hidden) {
        if (!this.hideCheck) return;
        this.hideCheck.checked = hidden;
        this.handleHideChange({ target: { checked: hidden } });
        return this;
    }

    getState() {
        return {
            value: this.currentValue,
            animated: this.isAnimated,
            hidden: this.isHidden,
            attached: !!this.progress
        };
    }

    handleValueChange(event) {
        const value = event.target.value;
        this.updateProgressValue(value);
    }

    handleAnimateChange(event) {
        this.isAnimated = event.target.checked;
        
        if (this.isAnimated) {
            this.progress.classList.add('progress--animated');
        }
        
        else {
            this.progress.classList.remove('progress--animated');
        }
    }

    handleHideChange(event) {
        this.isHidden = event.target.checked;
        
        if (this.isHidden) {
            this.progress.classList.add('progress--hidden');
            this.valueInput.disabled = true;
            this.animateCheck.disabled = true;
        }
        
        else {
            this.progress.classList.remove('progress--hidden');
            this.valueInput.disabled = false;
            this.animateCheck.disabled = false;
        }
    }

    updateProgressValue(value) {
        this.currentValue = Math.min(100, Math.max(0, parseInt(value) || 0));
        if (this.progress) {
            this.progress.style.setProperty('--progress-value', this.currentValue);
            this.progress.setAttribute('data-value', this.currentValue);
        }
    }

    detach() {
        if (this.valueInput) {
            this.valueInput.removeEventListener('input', this.handleValueChange);
        }
        if (this.animateCheck) {
            this.animateCheck.removeEventListener('change', this.handleAnimateChange);
        }
        if (this.hideCheck) {
            this.hideCheck.removeEventListener('change', this.handleHideChange);
        }
        
        this.progress = null;
        this.circle = null;
        this.valueInput = null;
        this.animateCheck = null;
        this.hideCheck = null;
    }
}

window.ProgressAPI = new ProgressAPI();

document.addEventListener('DOMContentLoaded', () => {
    window.ProgressAPI.attachToDOM('progressComponent', 'progressCircle', 'valueInput', 'animateCheck', 'hideCheck');
});