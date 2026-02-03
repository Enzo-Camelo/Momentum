// js/navigation.js

export function initTVNavigation() {
    const navigableElements = document.querySelectorAll('.navigable');

    // Ao carregar, define o primeiro elemento como foco inicial (ex: Play Button)
    const initialFocus = document.getElementById('play-pause-btn');
    if (initialFocus) initialFocus.focus();

    window.addEventListener('keydown', (e) => {
        const current = document.activeElement;
        
        // Mapeamento de teclas de TV
        switch(e.key) {
            case 'ArrowUp':
                // Se estiver no Play, sobe para o Logout
                if (current.id === 'play-pause-btn') {
                    document.getElementById('logout-btn').focus();
                }
                break;
            case 'ArrowDown':
                // Se estiver em cima, desce para o Play
                if (current.id === 'logout-btn' || current.id === 'fullscreen-btn') {
                    document.getElementById('play-pause-btn').focus();
                }
                break;
            case 'ArrowLeft':
                if (current.id === 'logout-btn') {
                    document.getElementById('fullscreen-btn').focus();
                }
                break;
            case 'ArrowRight':
                if (current.id === 'fullscreen-btn') {
                    document.getElementById('logout-btn').focus();
                }
                break;
            case 'Enter':
                // O Enter simula o clique no botão focado
                current.click();
                break;
        }
    });
}