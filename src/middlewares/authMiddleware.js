// authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware de autenticação (já existente)
exports.authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send({ error: "Não autorizado!" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).send({ error: "token inválido!" });
    }
};

// Middleware para impedir o acesso às rotas de login e register caso o usuário já esteja logado
exports.preventAuthenticatedAccess = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (decoded) {
                // Redireciona o usuário para a página inicial (ou qualquer outra rota)
                return res.redirect('/'); // Aqui você pode escolher a rota para onde deseja redirecionar
            }
        } catch (err) {

            next();
        }
    } else {
        next();
    }
};
