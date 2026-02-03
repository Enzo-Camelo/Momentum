// login/js/navigation.js

export function initLoginNavigation() {
    const elements = Array.from(document.querySelectorAll('.navigable'));

    // Foco inicial no Email com delay para a WebView carregar
    setTimeout(() => {
        if (elements.length > 0) elements[0].focus();
    }, 1000);

    window.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode || e.which;
        const activeElement = document.activeElement;
        const currentIndex = elements.indexOf(activeElement);

        const keys = {
            UP: 38,
            DOWN: 40,
            ENTER: 13,
            BACK: 461,
            RETURN: 10009
        };

        switch (keyCode) {
            case keys.DOWN:
                if (currentIndex < elements.length - 1) {
                    e.preventDefault();
                    elements[currentIndex + 1].focus();
                }
                break;

            case keys.UP:
                if (currentIndex > 0) {
                    e.preventDefault();
                    elements[currentIndex - 1].focus();
                }
                break;

            case keys.ENTER:
                // Se estiver num input, o Enter na TV geralmente abre o teclado
                // Se estiver no botão ou no ícone do olho, dispara o clique
                if (activeElement.tagName === 'BUTTON' || activeElement.id === 'togglePassword') {
                    activeElement.click();
                }
                break;
        }
    });

    // Se o usuário clicar fora, volta o foco para o elemento atual
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('navigable')) {
            if (elements.length > 0) elements[0].focus();
        }
    });
}