// login/js/navigation.js

export function initLoginNavigation() {
    // Captura todos os elementos com a classe .navigable na ordem em que aparecem
    const elements = Array.from(document.querySelectorAll('.navigable'));
    
    // Define o foco inicial no campo de email
    if (elements.length > 0) {
        elements[0].focus();
    }

    window.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;
        const currentIndex = elements.indexOf(activeElement);

        switch (e.key) {
            case 'ArrowDown':
                if (currentIndex < elements.length - 1) {
                    e.preventDefault(); // Evita scroll da página
                    elements[currentIndex + 1].focus();
                }
                break;
            case 'ArrowUp':
                if (currentIndex > 0) {
                    e.preventDefault();
                    elements[currentIndex - 1].focus();
                }
                break;
            case 'Enter':
                // Se o foco estiver em um input, o Enter geralmente abre o teclado da TV.
                // Se estiver no botão, dispara o clique.
                if (activeElement.tagName === 'BUTTON') {
                    activeElement.click();
                }
                break;
        }
    });
}