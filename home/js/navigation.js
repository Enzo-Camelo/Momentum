export function initTVNavigation() {
    // --- 1. PONTE MELHORADA ---
    window.handleAndroidKey = function(keyCode) {
        const current = document.activeElement;
        const navigableElements = Array.from(document.querySelectorAll('.navigable'));
        
        // Se por algum motivo nada tiver foco, foca no primeiro item
        if (!current || current === document.body) {
            if (navigableElements.length > 0) {
                navigableElements[0].focus();
            }
            return;
        }

        // Se for ENTER (13), tratamos aqui e PARAMOS por aqui para evitar duplo clique
        if (parseInt(keyCode) === 13) {
            console.log("Executando clique em:", current.id);
            
            // Simula uma sequência completa de interação humana
            const options = { bubbles: true, cancelable: true, view: window };
            current.dispatchEvent(new MouseEvent('mousedown', options));
            current.dispatchEvent(new MouseEvent('mouseup', options));
            current.click(); 
            return; // IMPORTANTE: sai da função para não disparar o keydown abaixo
        }

        // Para setas, dispara o evento que o listener lá embaixo vai capturar
        const event = new KeyboardEvent('keydown', {
            keyCode: parseInt(keyCode),
            bubbles: true
        });
        window.dispatchEvent(event);
    };

    // --- 2. GERENCIAMENTO DE NAVEGAÇÃO ---
    const navigableElements = Array.from(document.querySelectorAll('.navigable'));

    // Tenta focar várias vezes para garantir (correção do foco inicial)
    [100, 500, 1000, 2000].forEach(delay => {
        setTimeout(() => {
            if (document.activeElement === document.body && navigableElements.length > 0) {
                navigableElements[0].focus();
            }
        }, delay);
    });

    window.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode || e.which;
        const current = document.activeElement;
        let index = navigableElements.indexOf(current);

        const keys = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39 };

        // Navegação simples entre os índices
        if (keyCode === keys.RIGHT || keyCode === keys.DOWN) {
            if (index < navigableElements.length - 1) {
                navigableElements[index + 1].focus();
                e.preventDefault();
            }
        } else if (keyCode === keys.LEFT || keyCode === keys.UP) {
            if (index > 0) {
                navigableElements[index - 1].focus();
                e.preventDefault();
            }
        }
        // NOTA: O Enter (13) NÃO é tratado aqui, é tratado na handleAndroidKey
    });
}