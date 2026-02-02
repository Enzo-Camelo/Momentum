import { appState, pageState } from './state.js';

const audio = new Audio();
let animation; // Variável global do arquivo para a animação

/**
 * Inicializa a animação Lottie
 */
export function initLottie() {
    const container = document.getElementById('lottie-player');
    if (!container) return;

    animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '../assets/img/animations/Audio_Wave.json',
        // O SEGREDO ESTÁ AQUI:
        rendererSettings: {
            preserveAspectRatio: 'xMidYMax meet', // Alinha no meio do X e no Máximo (base) do Y
            hideOnTransparent: true
        }
    });
    
    container.style.opacity = "0";
    container.style.transition = "opacity 0.5s ease";
}

/**
 * Atualiza o estado visual da animação
 */
export function updateLottieState(isPlaying) {
    if (!animation) return;
    const container = document.getElementById('lottie-player');

    // LÓGICA: Só mostra/toca se (Áudio estiver tocando) E (NÃO for modo propaganda)
    if (isPlaying && !pageState.showAdvertisement) {
        animation.play();
        if (container) container.style.opacity = "1";
    } else {
        // Se estiver em propaganda ou áudio pausado, para a animação (economiza CPU) e esconde
        animation.pause();
        if (container) container.style.opacity = "0";
    }
}

/**
 * Alterna entre Play e Pause
 */
export function toggleStreaming(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    if (audio.paused) {
        playStream(btn);
    } else {
        pauseStream(btn);
    }
}

function playStream(btn) {
    const streamUrl = appState.urlStreaming;

    if (!streamUrl || streamUrl === 'null') {
        alert("Erro: URL de streaming não configurada.");
        return;
    }

    if (audio.src !== streamUrl) {
        audio.src = streamUrl;
    }

    audio.play()
        .then(() => {
            pageState.isAudioPlaying = true;
            btn.innerText = 'pause';
            // SINCRONIA: Liga a animação somente após o sucesso do Play
            updateLottieState(true);
            console.log("Streaming iniciado");
        })
        .catch(error => {
            console.error("Erro ao tocar áudio:", error);
            updateLottieState(false);
        });
}

function pauseStream(btn) {
    audio.pause();
    audio.src = ""; // Reset para rádio ao vivo
    
    pageState.isAudioPlaying = false;
    btn.innerText = 'play_arrow';
    
    // Desliga a animação
    updateLottieState(false);
    console.log("Streaming pausado");
}