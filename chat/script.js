// Redireciona para a página de login se não estiver logado
if (window.location.pathname.includes('chat.html') && !sessionStorage.getItem('username')) {
    window.location.href = 'index.html';
}

// Lógica de Login
function login() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        sessionStorage.setItem('username', username);
        window.location.href = 'chat.html';
    } else {
        alert('Please enter a username!');
    }
}

// Função global para obter o nome de usuário
function usernamefunc() {
    return sessionStorage.getItem('username'); // Usa sessionStorage para obter o usuário logado
}

// Exibir nome do usuário na página de chat
if (window.location.pathname.includes('chat.html')) {
    const username = sessionStorage.getItem('username');
    document.querySelector('.chat-header').textContent = `Welcome, ${username}!`;
}

// Gerenciar mensagens no chat
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const messages = JSON.parse(localStorage.getItem('messages')) || [];

// Carregar mensagens salvas
if (chatMessages && messages.length) {
    messages.forEach(({ sender, text }) => addMessage(sender, text));
}

// Enviar mensagem
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    const sender = sessionStorage.getItem('username');
    addMessage(sender, text);
    messages.push({ sender, text });
    localStorage.setItem('messages', JSON.stringify(messages));
    chatInput.value = '';
}

// Adicionar mensagem ao chat
function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === sessionStorage.getItem('username') ? 'user' : 'bot'}`;
    messageDiv.textContent = `${sender}: ${text}`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para limpar o localStorage
function clearLocalStorage() {
    function recarregarPagina() {
        location.reload();  // Recarrega a página
    }
    const username = usernamefunc(); // Chama a função global para obter o usuário logado

    if (username === 'MatheusSchwebelAdminMax.:.true.Config.local.storage') {
        localStorage.clear();
        alert('Local storage limpo!');
        setTimeout(recarregarPagina, 3000);

    } else {
        alert('Você não tem permissão para limpar as conversas do chat');
    }
}
