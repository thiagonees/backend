

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Importe o pacote cors

dotenv.config();


const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const messageRoutes = require('./src/routes/messageRoutes');

const app = express();

// Configurar o CORS para permitir requisições do frontend
const corsOptions = {
  origin: ['http://localhost:3001', 'https://crescer-front.vercel.app', 'https://crescer-mong-api.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
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
app.use("/api/auth", messageRoutes);

// Inicialização do servidor
app.listen(3000, () => {
    console.log(`Server is running on port 3000! 🚀`);
});

