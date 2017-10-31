function updateValue(field, value) {
    if (field.innerHTML != value) {
        field.style.webkitAnimationName = 'slide-out';

        field.addEventListener('webkitAnimationEnd', function () {
            this.style.webkitAnimationName = '';
            field.innerHTML = value;
        }, false);

        field.removeEventListener('webkitAnimationEnd', false);
        return true;
    }
    return false;
}