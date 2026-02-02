import { pageState } from './state.js';
import { updateLottieState } from './audio_player.js'; // Ajustado para o nome que você usou

export function toggleDashboardMode() {
    const forecastPanel = document.getElementById('forecast-panel');
    const quotationPanel = document.getElementById('quotation-panel');
    const radioLogo = document.getElementById('radio-logo');
    const adImage = document.getElementById('ad-image');

    // 1. Identifica quem sai e quem entra na Sidebar
    const outPanel = pageState.showAdvertisement ? quotationPanel : forecastPanel;
    const inPanel = pageState.showAdvertisement ? forecastPanel : quotationPanel;

    // 2. Executa a animação de Slide (Entra Esquerda -> Sai Direita)
    outPanel.classList.remove('active');
    outPanel.classList.add('exit');
    
    inPanel.classList.add('active');

    // 3. Lógica Paralela: Alternância de Imagem (Lado Direito)
    pageState.showAdvertisement = !pageState.showAdvertisement;
    
    // Sincroniza o Lottie com o novo estado
    updateLottieState(pageState.isAudioPlaying);
    
    if (pageState.showAdvertisement) {
        // Mostra Propaganda
        radioLogo.style.opacity = "0";
        
        if (pageState.AdvertisementList.length > 0) {
            adImage.src = pageState.AdvertisementList[pageState.currentIndex];
            pageState.currentIndex = (pageState.currentIndex + 1) % pageState.AdvertisementList.length;
        }
        
        adImage.style.display = "block";
        setTimeout(() => { adImage.style.opacity = "1"; }, 50);
    } else {
        // Volta para Logo da Rádio
        adImage.style.opacity = "0";
        radioLogo.style.opacity = "1";
        setTimeout(() => { adImage.style.display = "none"; }, 800);
    }

    // 4. Limpeza: Remove a classe 'exit' após o término da animação (800ms)
    setTimeout(() => {
        outPanel.classList.remove('exit');
    }, 800);
}

/**
 * Inicia o carrossel com tempos dinâmicos: 
 * Previsão (30s) e Propaganda (15s)
 */
export function initCarousel() {
    // Garante que o estado inicial (Previsão) esteja ativo
    document.getElementById('forecast-panel').classList.add('active');

    function runTimer() {
        // Se AGORA estamos em modo Propaganda, o próximo passo é voltar para Previsão em 15s
        // Se AGORA estamos em modo Previsão, o próximo passo é ir para Propaganda em 30s
        const nextInterval = pageState.showAdvertisement ? 15000 : 30000;

        setTimeout(() => {
            toggleDashboardMode(); // Faz a troca
            runTimer();            // Agenda a próxima troca baseada no novo estado
        }, nextInterval);
    }

    runTimer();
}