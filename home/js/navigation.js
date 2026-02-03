export function initTVNavigation() {
    const navigableElements = Array.from(document.querySelectorAll('.navigable'));

    // 1. FORÇAR FOCO INICIAL (O segredo para a TV começar a navegar)
    setTimeout(() => {
        const initialFocus = document.getElementById('play-pause-btn') || navigableElements[0];
        if (initialFocus) initialFocus.focus();
    }, 1000);

    window.addEventListener('keydown', (e) => {
        // Mapeamento de KeyCodes comuns em controles remotos de TV
        const keyCode = e.keyCode || e.which;
        const keys = {
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ENTER: 13,
            BACK: 461, // LG WebOS
            RETURN: 10009 // Samsung Tizen
        };

        const current = document.activeElement;
        let currentIndex = navigableElements.indexOf(current);

        // Se o foco se perder por algum motivo, reseta para o play
        if (currentIndex === -1) {
            navigableElements[0].focus();
            return;
        }

        switch(keyCode) {
            case keys.UP:
                // Se estiver no Play, sobe para o primeiro da header (Fullscreen)
                if (current.id === 'play-pause-btn') {
                    document.getElementById('logout-btn').focus();
                }
                break;
                
            case keys.DOWN:
                // Se estiver em qualquer lugar da header, desce para o Play
                if (current.id === 'logout-btn' || current.id === 'fullscreen-btn') {
                    document.getElementById('play-pause-btn').focus();
                }
                break;

            case keys.LEFT:
                if (current.id === 'logout-btn') {
                    document.getElementById('fullscreen-btn').focus();
                }
                break;

            case keys.RIGHT:
                if (current.id === 'fullscreen-btn') {
                    document.getElementById('logout-btn').focus();
                }
                break;

            case keys.ENTER:
                // Simula o clique
                current.click();
                break;
                
            case keys.BACK:
            case keys.RETURN:
                // Opcional: Lógica para fechar o app ou voltar
                console.log("Botão Voltar pressionado");
                break;
        }
    });

    // Impede que o foco "fuja" para fora do app se o usuário clicar no fundo
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('navigable')) {
            const current = document.activeElement;
            if (!current || !current.classList.contains('navigable')) {
                document.getElementById('play-pause-btn').focus();
            }
        }
    });
}