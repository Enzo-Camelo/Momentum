import { supabaseClient } from './supabase.js';
import { initLoginNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    
    initLoginNavigation();

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnSignIn = document.querySelector('.btn-signin');
    const togglePassword = document.getElementById('togglePassword');

    // 1. Lógica de mostrar/esconder senha
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // 2. Lógica de Autenticação
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Estado de carregamento
        btnSignIn.disabled = true;
        btnSignIn.innerText = 'Autenticando...';

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            if (data.user) {
                // Redirecionamento bem-sucedido
                window.location.href = '../../home/pages/index.html';
            }

        } catch (error) {
            alert('Erro: ' + error.message);
            console.error('Erro de login:', error);
        } finally {
            btnSignIn.disabled = false;
            btnSignIn.innerText = 'Sign In';
        }
    });
});