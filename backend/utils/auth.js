import jwt from 'jsonwebtoken';

<<<<<<< Updated upstream
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
=======
// Função para gerar um token de acesso JWT
export function generateAccessToken(usuario, options = { expiresIn: '1800s' }) {
    try {
        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf ? usuario.cpf.toString() : null,
            telefone: usuario.telefone ? usuario.telefone.toString() : null
        };

        return jwt.sign(payload, process.env.SECRET_KEY, options);
    } catch (error) {
        console.error('Erro ao gerar o token:', error);
        throw new Error('Erro ao gerar o token de acesso');
    }
}

// Middleware para autenticar o token JWT
export function authenticateToken(req, res, next) {
>>>>>>> Stashed changes
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação ausente' });
    }

    // Verifica e decodifica o token
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }

        req.accessToken = data;
        next(); // Passa para a próxima função de middleware
    });
}
