const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());




const User = mongoose.model('User', { 
    name: String, 
    whatsapp: String, 
    cpf: String, 
    password: String
});

//Listagem de usuario
app.get("/", async (req, res) => {
    const user = await User.find()
    return res.send(user);
});


//Criacao de usuario
app.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
        whatsapp: req.body.whatsapp,
        cpf: req.body.cpf,
        password: req.body.password
    })

    await user.save();
    return res.send(user)
});

//Deleta o usuario
app.delete("/:id", async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.send(user);
})

app.listen(3000, () => {
    mongoose.connect('mongodb+srv://thiagoalvesdevp:nY7YOIxN08KoHaXE@backend.ob6ly.mongodb.net/?retryWrites=true&w=majority&appName=Backend');
    console.log(`Server is running!  🚀`);
})