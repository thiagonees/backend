const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const { authenticate, preventAuthenticatedAccess } = require('../middlewares/authMiddleware');

// Aplicar o middleware de prevenção de acesso para usuários autenticados
router.post("/register", preventAuthenticatedAccess, register);
router.post("/login", preventAuthenticatedAccess, login);

// Rota de logout
router.post('/logout', authenticate, (req, res) => {
    return res.status(200).send({ message: 'Logout com sucesso!' });
});

module.exports = router;
