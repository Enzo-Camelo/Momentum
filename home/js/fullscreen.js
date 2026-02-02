/**
 * Alterna o modo de tela cheia do navegador
 */
export function toggleFullscreen() {
    const btn = document.getElementById('fullscreen-btn');

    if (!document.fullscreenElement) {
        // Entrar em tela cheia
        document.documentElement.requestFullscreen()
            .then(() => {
                if (btn) btn.innerText = 'fullscreen_exit';
            })
            .catch((err) => {
                console.error(`Erro ao tentar entrar em tela cheia: ${err.message}`);
            });
    } else {
        // Sair da tela cheia
        if (document.exitFullscreen) {
            document.exitFullscreen()
                .then(() => {
                    if (btn) btn.innerText = 'fullscreen';
                });
        }
    }
}

/**
 * Listener para caso o usuário saia da tela cheia usando a tecla ESC
 */
export function initFullscreenListener() {
    document.addEventListener('fullscreenchange', () => {
        const btn = document.getElementById('fullscreen-btn');
        if (!btn) return;

        if (document.fullscreenElement) {
            btn.innerText = 'fullscreen_exit';
        } else {
            btn.innerText = 'fullscreen';
        }
    });
}