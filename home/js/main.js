import { loadConfigAndAds, logout } from './supabase.js';
import { appState, pageState } from './state.js';
import { initClock, getFormattedDate } from './clock.js';
import { fetchWeather, fetchExchange, fetchNowPlaying, getWeatherImage, getWeatherDescription, renderForecastList } from './api.js';
import { initCarousel } from './carousel.js';
import { toggleStreaming, initLottie } from './audio_player.js';
import { toggleFullscreen, initFullscreenListener } from './fullscreen.js';
import { initTVNavigation } from './navigation.js';

// Funções de formatação (podem ficar aqui ou num arquivo utils.js)
const formatCurrency = (val) => parseFloat(val).toFixed(2).replace('.', ',');
const formatPct = (val) => parseFloat(val).toFixed(2).replace('.', ',') + '%';

function updateUI() {
    // 1. Atualiza Clima e Previsão
    if (pageState.weatherData) {
        const current = pageState.weatherData.current;
        document.getElementById('temp-now').innerText = `${Math.round(current.temperature_2m)}°`;
        document.getElementById('main-weather-icon').src = getWeatherImage(current.weather_code);
        document.getElementById('weather-desc').innerText = getWeatherDescription(current.weather_code);
        renderForecastList(pageState.weatherData);
    }

    // 2. Atualiza Música
    const music = pageState.nowPlayingData;
    if (music) {
        const songEl = document.getElementById('song-name');
        const artistEl = document.getElementById('artist-name');
        const logoEl = document.getElementById('radio-logo');

        if (songEl) songEl.innerText = music.song;
        if (artistEl) artistEl.innerText = music.artist;

        // Só atualizamos a imagem da rádio se NÃO estivermos mostrando uma propaganda
        if (!pageState.showAdvertisement && logoEl) {
            logoEl.src = music.photo;
        }
    }

    // 3. Atualiza Cotações (A lógica que estava no updateQuotationUI consolidada aqui)
    if (pageState.exchangeData) {
        const usd = pageState.exchangeData.USDBRL;
        const eur = pageState.exchangeData.EURBRL;

        // Dólar
        document.getElementById('usd-bid').innerText = `R$ ${formatCurrency(usd.bid)}`;
        document.getElementById('usd-yesterday').innerText = `R$ ${formatCurrency(usd.bid - usd.varBid)}`;
        const usdPctEl = document.getElementById('usd-pct');
        usdPctEl.innerText = formatPct(usd.pctChange);
        usdPctEl.className = `q-pct ${parseFloat(usd.pctChange) >= 0 ? 'pct-up' : 'pct-down'}`;

        // Euro
        document.getElementById('eur-bid').innerText = `R$ ${formatCurrency(eur.bid)}`;
        document.getElementById('eur-yesterday').innerText = `R$ ${formatCurrency(eur.bid - eur.varBid)}`;
        const eurPctEl = document.getElementById('eur-pct');
        eurPctEl.innerText = formatPct(eur.pctChange);
        eurPctEl.className = `q-pct ${parseFloat(eur.pctChange) >= 0 ? 'pct-up' : 'pct-down'}`;
    }
}

// Helpers de refresh
async function refreshMusic() {
    await fetchNowPlaying();
    updateUI();
}

async function refreshWeatherAndFinance() {
    await fetchWeather();
    await fetchExchange();
    updateUI();
}

async function startApp() {
    await loadConfigAndAds(); // Carrega dados do Supabase (inclusive lista de ads)
    initLottie();

    // UI Estática
    document.getElementById('city-state').innerText = `${appState.city}, ${appState.state}`;
    document.getElementById('radio-logo').src = appState.radioLogo;

    initClock('current-time');
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.textContent = getFormattedDate();

    const fsBtn = document.getElementById('fullscreen-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', toggleFullscreen);
    }
    initFullscreenListener(); // Monitora a tecla ESC

    // Configura Botão de Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    const playBtn = document.getElementById('play-pause-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            toggleStreaming('play-pause-btn');
        });
    }

    // Primeira carga
    initTVNavigation();
    await refreshMusic();
    await refreshWeatherAndFinance();

    // Inicia o Carrossel (Única fonte de verdade agora)
    initCarousel(30000); // 30 segundos

    // Intervals
    setInterval(refreshMusic, 5000); // 5 segundos
    setInterval(refreshWeatherAndFinance, 300000); // 5 minutos
}

startApp();