
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:5000/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha }),
            credentials: 'include' // Inclui cookies e credenciais na requisição
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.textContent = 'Login realizado com sucesso!';
            messageDiv.className = 'message success';
            window.location.href = './veiculos.html'; // Atualize para o caminho do arquivo HTML
        } else {
            throw new Error(data.error || 'Erro ao realizar login');
        }
    } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.className = 'message error';
    }
});
