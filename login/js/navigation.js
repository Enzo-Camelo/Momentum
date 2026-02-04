// login/js/navigation.js

export function initLoginNavigation() {
    // 1. A PONTE (Deve estar em todas as páginas)
    window.handleAndroidKey = function(keyCode) {
        console.log("Tecla recebida:", keyCode);
        
        // Tenta achar o elemento focado
        const current = document.activeElement;

        // Se a tecla for ENTER (13)
        if (parseInt(keyCode) === 13 && current) {
            // 1. Simula o clique físico
            current.click();
            
            // 2. Dispara eventos de Mouse para garantir (importante para Play/Fullscreen)
            const mouseEvents = ['mousedown', 'mouseup', 'click'];
            mouseEvents.forEach(type => {
                current.dispatchEvent(new MouseEvent(type, {
                    view: window, bubbles: true, cancelable: true
                }));
            });
            return;
        }

        // Para as outras teclas (Setas), dispara o evento de teclado normal
        const event = new KeyboardEvent('keydown', {
            keyCode: parseInt(keyCode),
            which: parseInt(keyCode),
            bubbles: true
        });
        window.dispatchEvent(event);
    };

    const navigableElements = Array.from(document.querySelectorAll('.navigable'));

    // Foco inicial
    setTimeout(() => {
        if (navigableElements.length > 0) navigableElements[0].focus();
    }, 1000);

    window.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode || e.which;
        const current = document.activeElement;
        let index = navigableElements.indexOf(current);

        if (keyCode === 40) { // DOWN
            if (index < navigableElements.length - 1) navigableElements[index + 1].focus();
        } else if (keyCode === 38) { // UP
            if (index > 0) navigableElements[index - 1].focus();
        } else if (keyCode === 13) { // ENTER
            current.click();
        }
    });
}