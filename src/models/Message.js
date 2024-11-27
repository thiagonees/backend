const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo User
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,  // Nome do usuário
    required: true,
  },
  whatsapp: {
    type: String,  // WhatsApp do usuário
    required: true,
  },
  cpf: {
    type: String,  // CPF do usuário
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
