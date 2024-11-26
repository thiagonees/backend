const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Importe o pacote cors

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configurar o CORS para permitir requisições do frontend
const corsOptions = {
  origin: 'http://localhost:3001', // Permite requisições do frontend na porta 3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define os métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));  // Use o middleware CORS

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
    console.log(`Server is running on port 3000! 🚀`);
});
