const jwt = require('jsonwebtoken');

// Função para gerar o token JWT
function generateAccessToken(usuario, options = { expiresIn: '1800s' }) {
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf ? usuario.cpf.toString() : null,
        telefone: usuario.telefone ? usuario.telefone.toString() : null,
        isAdmin: usuario.isAdmin // Inclua o campo isAdmin
    };

    // Gera e retorna o token assinado com a chave secreta
    return jwt.sign(payload, process.env.SECRET_KEY, options);
}

// Middleware para autenticar o token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // 401 Unauthorized.
    }

    // Verifica e decodifica o token
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return res.sendStatus(403); // 403 Forbidden.
        }

        req.accessToken = data;
        next(); // Passa para a próxima função de middleware
    });
}

module.exports = { generateAccessToken, authenticateToken };
