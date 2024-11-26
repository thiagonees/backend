const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');

router.post("/register", register);
router.post("/login", login);

// Rota de logout
router.post('/logout', authenticate, (req, res) => {
    return res.status(200).send({ message: 'Logout successful!' });
});

module.exports = router;
