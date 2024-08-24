import jwt from 'jsonwebtoken';

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
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação ausente' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }

        req.accessToken = data;
        next();
    });
}