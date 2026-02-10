import { appState, pageState } from './state.js';
import { supabaseClient } from '../../supabase.js';

export async function loadConfigAndAds() {
    try {
        console.log("SINCRONIZANDO DADOS DO USUÁRIO COM BANCO DE DADOS");
        // 1. Verificar se há um usuário logado (Equivalente ao currentUserUid)
        const { data: { user } } = await supabaseClient.auth.getUser();
        
        if (!user) {
            console.error("Usuário não autenticado");
            window.location.href = 'index.html';
            return;
        }

        // 2. Buscar dados da tabela 'usuarios' (Configuração da Rádio)
        const { data: userData, error: userError } = await supabaseClient
            .from('usuarios')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (userError) throw userError;

        // Mapeamento para o appState (conforme o código Dart original)
        appState.userLatitude = userData.latitude;
        appState.userLongitude = userData.longitude;
        appState.city = userData.cidade;
        appState.state = userData.estado;
        appState.radioName = userData.nome;
        appState.urlCastResource = userData.url_musica_atual; // FFAppState().URLdaAPIdaRadio
        appState.urlStreaming = userData.url_link_streaming || 'null';
        appState.radioLogo = userData.url_logo_radio || '../assets/img/generic_song.jpg';

        // 3. Buscar dados da tabela 'propagandas'
        const { data: adsData, error: adsError } = await supabaseClient
            .from('propagandas')
            .select('url_propaganda');

        if (adsError) throw adsError;

        // Mapeamento para o pageState
        pageState.AdvertisementList = adsData.map(ad => ad.url_propaganda).filter(url => url != null);
        pageState.AdvertisementDisplayed = pageState.AdvertisementList[0] || null;

        console.log("Configurações carregadas com sucesso!");

    } catch (error) {
        console.error("Erro ao carregar dados do Supabase:", error.message);
    }
}

export async function logout() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;

        // Limpa qualquer dado sensível do estado se necessário
        console.log("Usuário deslogado");
        
        // Redireciona para o login
        window.location.href = '../../index.html';
    } catch (error) {
        console.error("Erro ao deslogar:", error.message);
        alert("Erro ao sair. Tente novamente.");
    }
}