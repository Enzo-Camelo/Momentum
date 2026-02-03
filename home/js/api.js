import { appState, pageState } from './state.js';

/**
 * 1. CLIMA - Open Meteo
 */
export async function fetchWeather() {
    const { userLatitude, userLongitude } = appState;
    
    if (!userLatitude || !userLongitude) return;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${userLatitude}&longitude=${userLongitude}&current=apparent_temperature,temperature_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        pageState.weatherData = data;
        
        // Disparar atualização na UI se necessário
        console.log("Clima atualizado");
    } catch (error) {
        console.error("Erro ao buscar clima:", error);
    }
}



/**
 * 2. COTAÇÃO - AwesomeAPI
 */
export async function fetchExchange() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL', {
            headers: {
                'Authorization': 'ea7dd3e95354fd0485abebe8786ca4d36932b858e7e14ad60213adfcdfb13670'
            }
        });
        const data = await response.json();
        pageState.exchangeData = data;
        console.log("Cotações atualizadas");
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
    }
}



/**
 * 3. MÚSICA ATUAL - API da Rádio
 */
export async function fetchNowPlaying() {
    const targetUrl = appState.urlCastResource;
    if (!targetUrl || targetUrl === 'null' || targetUrl === '') return;

    try {
        const response = await fetch(targetUrl);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const json = await response.json();

        // 1. Verificamos se existe o nome da música
        const musicName = json.data?.music?.name;

        if (musicName && musicName.trim() !== "") {
            // CASO TENHA MÚSICA
            pageState.nowPlayingData = {
                song: musicName,
                artist: json.data?.artist?.name || "Artista Desconhecido",
                photo: json.data?.artist?.url_photo || appState.radioLogo,
                hasMusic: true
            };
        } else {
            // CASO NÃO TENHA MÚSICA
            pageState.nowPlayingData = {
                song: appState.radioName,
                artist: `${appState.city} - ${appState.state}`,
                photo: appState.radioLogo,
                hasMusic: false
            };
        }

    } catch (error) {
        console.error("Erro ao buscar dados da rádio:", error);

        // Fallback em caso de erro
        pageState.nowPlayingData = {
            song: appState.radioName,
            artist: "",
            photo: appState.radioLogo,
            hasMusic: false
        };
    }
}









/**
 * Utilitário: Tradução de Weather Code (WMO) para texto/ícone
 * Útil para o painel lateral
 */
export function getWeatherImage(code) {
    const path = '../assets/img/weather/';

    switch (code) {
        case 0:
            return `${path}sunny.png`;

        case 1:
        case 2:
            return `${path}partialy_cloudy.png`;

        case 3:
            return `${path}cloudy.png`;

        case 45:
        case 48:
            return `${path}fog.png`;

        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            return `${path}rainy.png`;

        case 56:
        case 57:
        case 66:
        case 67:
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return `${path}snowy.png`;

        case 95:
        case 96:
        case 99:
            return `${path}storm.png`;

        default:
            return `${path}default_dark.png`;
    }
}

/**
 * Retorna a descrição textual do clima (útil para acessibilidade/alt)
 */
export function getWeatherDescription(code) {
    switch (code) {
        case 0:
            return 'Ensolarado';

        case 1:
        case 2:
            return 'Parcialmente Nublado';

        case 3:
            return 'Nublado';

        case 45:
        case 48:
            return 'Nevoeiro';

        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            return 'Chuva';

        case 56:
        case 57:
        case 66:
        case 67:
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return 'Neve';

        case 95:
        case 96:
        case 99:
            return 'Tempestade';

        default:
            return 'Clima Variado';
    }
}

/**
 * Formata a data da API para o padrão "ter. 1"
 */
function formatForecastDay(dateString) {
    const date = new Date(dateString + "T00:00:00"); // Força fuso local
    const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    const dayNum = date.getDate();
    return `${dayName}. ${dayNum}`;
}

/**
 * Renderiza a lista de previsão na tela
 */
export function renderForecastList(weatherData) {
    const listContainer = document.getElementById('forecast-list');
    if (!listContainer || !weatherData) return;

    listContainer.innerHTML = ''; // Limpa a lista atual

    // Open-Meteo retorna 7 dias. Vamos pular o index 0 (hoje) e mostrar os próximos 6.
    for (let i = 1; i <= 6; i++) {
        const dayLabel = formatForecastDay(weatherData.daily.time[i]);
        const rainProb = weatherData.daily.precipitation_probability_max[i];
        const weatherCode = weatherData.daily.weather_code[i];
        const tempMax = Math.round(weatherData.daily.temperature_2m_max[i]);
        const tempMin = Math.round(weatherData.daily.temperature_2m_min[i]);

        const row = document.createElement('div');
        row.className = 'forecast-row';
        row.innerHTML = `
            <div class="forecast-day">${dayLabel}</div>
            <div class="forecast-rain">
                <img src="../assets/img/weather/rainy.png" class="rain-icon">
                <span>${rainProb}%</span>
            </div>
            <img src="${getWeatherImage(weatherCode)}" class="forecast-weather-icon">
            <div class="forecast-temps">
                <span class="temp-max">${tempMax}°</span>
                <span class="temp-min">${tempMin}°</span>
            </div>
        `;
        listContainer.appendChild(row);
    }
}



/**
 * Formata a variação percentual: 
 * Converte para número -> Arredonda para 2 casas -> Troca ponto por vírgula -> Adiciona o símbolo %
 */
function formatPercentage(value) {
    if (!value) return "0,00%";
    
    // parseFloat garante que o valor seja tratado como número
    // toFixed(2) trava em duas casas decimais e arredonda (ex: 0.687 vira 0.69)
    return parseFloat(value).toFixed(2).replace('.', ',') + '%';
}