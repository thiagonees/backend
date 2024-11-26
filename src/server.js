const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Conexão ao banco de dados
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error("Database connection error:", err));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Inicialização do servidor
app.listen(3000, () => {
    console.log(`Server is running! 🚀`);
});
