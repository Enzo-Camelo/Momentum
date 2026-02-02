export const pageState = {

    // Propaganda
    showAdvertisement: false,
    currentIndex: 0,
    AdvertisementList: [],
    AdvertisementDisplayed: null,

    // Música que está tocando (vem do variavel urlCastResource)
    nowPlayingData: { song: '---', artist: '---', photo: '' },
    isAudioPlaying: false,

    // Clima
    weatherData: null,

    // Cotação
    exchangeData: null,

    // Dark Mode
    darkMode: true,

    // Hora atual (possivelmente vai ser removida por ja existir o clock.js)
    currentTime: null,
};

export const appState = {
    // Dados da rádio
    userLatitude: null,
    userLongitude: null,
    city: null,
    state: null,
    radioName: null,
    radioLogo: null,
    // JSON
    urlCastResource: null,
    // Audio
    urlStreaming: null,
};