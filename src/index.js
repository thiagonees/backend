const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
app.use(express.json());

// Modelo do usuário
const User = mongoose.model('User', { 
    name: String, 
    whatsapp: String, 
    cpf: String, 
    password: String
});

// Chave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Criação de usuário
app.post("/register", async (req, res) => {
    const { name, whatsapp, cpf, password } = req.body;

    if (!name || !whatsapp || !cpf || !password) {
        return res.status(400).send({ error: "All fields are required!" });
    }

    // Verifica se o CPF já existe
    const existingUser = await User.findOne({ cpf });
    if (existingUser) {
        return res.status(400).send({ error: "CPF already registered!" });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Salva o usuário no banco
    const user = new User({
        name,
        whatsapp,
        cpf,
        password: hashedPassword
    });

    await user.save();
    return res.status(201).send({ message: "User registered successfully!" });
});

// Login de usuário com `name` e `whatsapp`
app.post("/login", async (req, res) => {
    const { name, whatsapp, password } = req.body;

    if (!name || !whatsapp || !password) {
        return res.status(400).send({ error: "Name, WhatsApp, and password are required!" });
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ name, whatsapp });
    if (!user) {
        return res.status(404).send({ error: "User not found!" });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ error: "Invalid password!" });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).send({ message: "Login successful!", token });
});

// Middleware para autenticação
const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send({ error: "Unauthorized!" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Invalid token!" });
    }
};

// Rota protegida de exemplo
app.get("/profile", authenticate, async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).send({ error: "User not found!" });
    }

    return res.send(user);
});

// Logout (opcional)
app.post("/logout", authenticate, (req, res) => {
    // O cliente pode apenas descartar o token, pois ele não será mais válido após o tempo de expiração
    return res.send({ message: "Logout successful!" });
});

// Conexão com o banco e inicialização do servidor
app.listen(3000, async () => {
    await mongoose.connect('mongodb+srv://thiagoalvesdevp:nY7YOIxN08KoHaXE@backend.ob6ly.mongodb.net/?retryWrites=true&w=majority&appName=Backend');
    console.log(`Server is running! 🚀`);
});
