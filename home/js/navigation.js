export function initHomeNavigation() {
    // 1. A PONTE
    window.handleAndroidKey = function(keyCode) {
        const event = new KeyboardEvent('keydown', {
            keyCode: parseInt(keyCode),
            which: parseInt(keyCode),
            bubbles: true
        });
        window.dispatchEvent(event);
    };

    // 2. BUSCA DE ELEMENTOS
    // Verifique se os IDs play-pause-btn e fullscreen-btn têm a classe 'navigable' no HTML!
    const navigableElements = Array.from(document.querySelectorAll('.navigable'));

    setTimeout(() => {
        if (navigableElements.length > 0) navigableElements[0].focus();
    }, 1000);

    window.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode || e.which;
        const current = document.activeElement;
        let index = navigableElements.indexOf(current);

        const keys = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, ENTER: 13 };

        switch(keyCode) {
            case keys.RIGHT:
            case keys.DOWN:
                if (index < navigableElements.length - 1) {
                    navigableElements[index + 1].focus();
                    e.preventDefault();
                }
                break;
            case keys.LEFT:
            case keys.UP:
                if (index > 0) {
                    navigableElements[index - 1].focus();
                    e.preventDefault();
                }
                break;
            case keys.ENTER:
                if (current) {
                    console.log("Tentando clicar em:", current.id);
                    // Força o clique de duas formas para garantir
                    current.click();
                    
                    // Se for um botão de Play/Fullscreen customizado, 
                    // talvez precise disparar o evento manualmente:
                    const clickEvent = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    current.dispatchEvent(clickEvent);
                }
                break;
        }
    });
}