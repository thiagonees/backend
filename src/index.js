const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const port = 3000;


const User = mongoose.model('User', { 
    name: String, 
    whatsapp: String, 
    cpf: String, 
    password: String
});


app.get("/", (req, res) => {
    res.send("Welcome to the Express server!");
});

app.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
        whatsapp: req.body.whatsapp,
        cpf: req.body.cpf,
        password: req.body.password
    })

    await user.save();
    res.send(user);
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://thiagoalvesdevp:nY7YOIxN08KoHaXE@backend.ob6ly.mongodb.net/?retryWrites=true&w=majority&appName=Backend');
    console.log(`Server is running on port ${port} 🚀`);
})