// debug.js

export function initDebugConsole() {
    const consoleOutput = document.getElementById('console-output');
    const customConsole = document.getElementById('custom-console');
    const toggleBtn = document.getElementById('debug-toggle');
    const closeBtn = document.getElementById('close-console');

    // Função para adicionar texto na tela
    function addToUI(message, type = 'log') {
        const entry = document.createElement('div');
        entry.style.borderBottom = "1px solid #222";
        entry.style.padding = "5px 0";
        
        const colors = {
            log: '#fff',
            warn: '#ffc107',
            error: '#ff4444',
            info: '#00ccff'
        };

        const time = new Date().toLocaleTimeString();
        entry.innerHTML = `<span style="color: #888">[${time}]</span> 
                           <span style="color: ${colors[type]}">${message}</span>`;
        
        consoleOutput.prepend(entry); // Adiciona o mais recente no topo
    }

    // Interceptar console original
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args) => {
        originalLog(...args);
        addToUI(args.join(' '), 'log');
    };
    console.warn = (...args) => {
        originalWarn(...args);
        addToUI(args.join(' '), 'warn');
    };
    console.error = (...args) => {
        originalError(...args);
        addToUI(args.join(' '), 'error');
    };

    // Lógica de Abrir/Fechar
    toggleBtn.addEventListener('click', () => {
        customConsole.style.display = 'block';
        closeBtn.focus(); // Joga o foco para dentro do console
    });

    closeBtn.addEventListener('click', () => {
        customConsole.style.display = 'none';
        toggleBtn.focus();
    });
}