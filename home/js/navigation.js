// home_navigation.js

export function initHomeNavigation() {
    // Busca todos os elementos que podem receber foco
    const navigableElements = Array.from(document.querySelectorAll('.navigable'));

    // --- PONTE OBRIGATÓRIA PARA FLUTTER/ANDROID ---
    window.handleAndroidKey = function(keyCode) {
        const event = new KeyboardEvent('keydown', {
            keyCode: parseInt(keyCode),
            which: parseInt(keyCode),
            bubbles: true
        });
        window.dispatchEvent(event);
    };

    // 1. FOCO INICIAL (Ajuste o ID para o primeiro item da sua Home)
    setTimeout(() => {
        const initialFocus = document.querySelector('.navigable'); // Foca no primeiro que encontrar
        if (initialFocus) initialFocus.focus();
    }, 1000);

    window.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode || e.which;
        const current = document.activeElement;
        let currentIndex = navigableElements.indexOf(current);

        const keys = {
            UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, ENTER: 13
        };

        // Se o foco estiver perdido, volta para o primeiro
        if (currentIndex === -1 && navigableElements.length > 0) {
            navigableElements[0].focus();
            return;
        }

        switch(keyCode) {
            case keys.RIGHT:
                if (currentIndex < navigableElements.length - 1) {
                    navigableElements[currentIndex + 1].focus();
                }
                break;

            case keys.LEFT:
                if (currentIndex > 0) {
                    navigableElements[currentIndex - 1].focus();
                }
                break;

            case keys.DOWN:
                // Lógica de "pular linha"
                // Se sua home for uma grade com 4 itens por linha:
                // const nextRowIndex = currentIndex + 4;
                // if (nextRowIndex < navigableElements.length) {
                //     navigableElements[nextRowIndex].focus();
                // }
                
                // Ou apenas ir para o próximo se for uma lista vertical:
                if (currentIndex < navigableElements.length - 1) {
                    navigableElements[currentIndex + 1].focus();
                }
                break;

            case keys.UP:
                if (currentIndex > 0) {
                    navigableElements[currentIndex - 1].focus();
                }
                break;

            case keys.ENTER:
                if (current) current.click();
                break;
        }
    });

    // Manter o foco ativo
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('navigable')) {
            if (navigableElements.length > 0) navigableElements[0].focus();
        }
    });
}