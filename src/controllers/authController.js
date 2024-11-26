const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

// Registrar um usuário
exports.register = async (req, res) => {
    const { name, whatsapp, cpf, password } = req.body;

    if (!name || !whatsapp || !cpf || !password) {
        return res.status(400).send({ error: "All fields are required!" });
    }

    const existingUser = await User.findOne({ $or: [{ cpf }, { whatsapp: whatsapp }] });
    if (existingUser) {
        return res.status(400).send({ error: "CPF or WhatsApp already registered!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, whatsapp, cpf, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: "User registered successfully!" });
};

// Login do usuário
exports.login = async (req, res) => {
    const { name, whatsapp, password } = req.body;

    if (!name || !whatsapp || !password) {
        return res.status(400).send({ error: "Name, WhatsApp, and password are required!" });
    }

    const user = await User.findOne({ name, whatsapp });
    if (!user) {
        return res.status(404).send({ error: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ error: "Invalid password!" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).send({ message: "Login successful!", token });
};
