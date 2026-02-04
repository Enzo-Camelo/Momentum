// login/js/navigation.js

window.handleAndroidKey = function(keyCode) {
    // Cria um evento de teclado real dentro do navegador
    const event = new KeyboardEvent('keydown', {
        keyCode: parseInt(keyCode),
        which: parseInt(keyCode),
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(event); 
    // Isso vai disparar o window.addEventListener('keydown') que você já tem
};

export function initLoginNavigation() {
    const elements = Array.from(document.querySelectorAll('.navigable'));
    let currentIndex = 0;

    // Foco inicial
    setTimeout(() => {
        if (elements.length > 0) elements[0].focus();
    }, 1000);

    const keys = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,
        // Códigos que vêm do Android (conforme sua pesquisa)
        ANDROID_UP: 19,
        ANDROID_DOWN: 20,
        ANDROID_LEFT: 21,
        ANDROID_RIGHT: 22,
        ANDROID_ENTER: 23,
        ANDROID_BACK: 4
    };

    function moveFocus(direction) {
        const activeElement = document.activeElement;
        const index = elements.indexOf(activeElement);

        if (direction === 'DOWN' && index < elements.length - 1) {
            elements[index + 1].focus();
        } else if (direction === 'UP' && index > 0) {
            elements[index - 1].focus();
        } else if (direction === 'ENTER') {
            if (activeElement.tagName === 'BUTTON' || activeElement.id === 'togglePassword' || activeElement.classList.contains('navigable')) {
                activeElement.click();
            }
        }
    }

    // Ouvinte para teclado padrão (PC / Browser)
    window.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode || e.which;
        if (keyCode === keys.DOWN) moveFocus('DOWN');
        if (keyCode === keys.UP) moveFocus('UP');
        if (keyCode === keys.ENTER) moveFocus('ENTER');
    });

    // Se o usuário clicar fora, volta o foco
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('navigable')) {
            if (elements.length > 0) elements[0].focus();
        }
    });
}