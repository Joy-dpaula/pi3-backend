import jwt from 'jsonwebtoken';

export function generateAccessToken(usuario, options = { expiresIn: '1800s' }) {
    try {
        if (!usuario || typeof usuario !== 'object') {
            throw new Error('Usuário inválido');
        }

        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf ? usuario.cpf.toString() : null,
            telefone: usuario.telefone ? usuario.telefone.toString() : null
        };

        if (!process.env.SECRET_KEY) {
            throw new Error('Chave secreta não configurada');
        }

        return jwt.sign(payload, process.env.SECRET_KEY, options);
    } catch (error) {
        console.error('Erro ao gerar o token:', error);
        throw new Error('Erro ao gerar o token de acesso');
    }
}

export function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token de autenticação ausente' });
        }

        if (!process.env.SECRET_KEY) {
            throw new Error('Chave secreta não configurada');
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err) {
                console.error('Erro ao verificar o token:', err);
                return res.status(403).json({ error: 'Token inválido ou expirado' });
            }

            req.accessToken = data;
            next();
        });
    } catch (error) {
        console.error('Erro na autenticação do token:', error);
        return res.status(500).json({ error: 'Erro interno de autenticação' });
    }
}
