const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    whatsapp: String,
    cpf: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now,
      },
    });

const User = mongoose.model('User', userSchema);
module.exports = User;
