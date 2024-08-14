const jwt = require('jsonwebtoken');

function generateAccessToken(usuario, options = { expiresIn: '1800s' }) {
    // Convert BigInt fields to strings
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf ? usuario.cpf.toString() : null,
        telefone: usuario.telefone ? usuario.telefone.toString() : null
    };

    return jwt.sign(payload, process.env.SECRET_KEY, options);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // 401 Unauthorized.
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return res.sendStatus(403); // 403 Forbidden.
        }

        req.accessToken = data;
        next();
    });
}

module.exports = { generateAccessToken, authenticateToken };
