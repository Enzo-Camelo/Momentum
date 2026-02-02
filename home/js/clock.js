/**
 * Inicia a atualização do relógio na tela
 * @param {string} elementId - O ID do elemento HTML onde o tempo será exibido
 */
export function initClock(elementId) {
    const clockElement = document.getElementById(elementId);

    if (!clockElement) {
        console.error(`Elemento com ID "${elementId}" não encontrado.`);
        return;
    }

    const updateTime = () => {
        const now = new Date();

        // Obtém horas e minutos e garante que tenham 2 dígitos (ex: 09 em vez de 9)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const timeString = `${hours}:${minutes}`;

        // Só atualiza o DOM se o valor mudar (melhora a performance)
        if (clockElement.textContent !== timeString) {
            clockElement.textContent = timeString;
        }
    };

    // Executa a função imediatamente para não esperar o primeiro segundo do intervalo
    updateTime();

    // Atualiza a cada 1 segundo (para garantir que a virada do minuto seja precisa)
    setInterval(updateTime, 1000);
}

/**
 * Retorna a data formatada (ex: Quinta, 29 de Janeiro) 
 * útil para o cabeçalho da localização
 */
export function getFormattedDate() {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return now.toLocaleDateString('pt-BR', options);
}