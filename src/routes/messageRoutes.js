const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const { authenticate } = require('../middlewares/authMiddleware'); // Certifique-se de que esse middleware existe

const router = express.Router();

// Rota para exibir o formulário
router.get('/contact', authenticate, async (req, res) => {
    try {
      console.log("User ID:", req.userId);  // Verifique o ID do usuário aqui
      const user = await User.findById(req.userId);  // Verifica se o usuário existe no banco
      if (!user) {
        return res.status(404).send({ error: 'Usuário não encontrado' });
      }
  
      res.status(200).send({
        name: user.name,
        whatsapp: user.whatsapp,
        cpf: user.cpf,
      });
    } catch (err) {
      console.log("Erro ao buscar o usuário:", err);
      res.status(500).send({ error: 'Erro ao buscar o usuário' });
    }
  });
  

// // Rota para enviar a mensagem
// router.post('/contact', authenticate, async (req, res) => {
//     const { message } = req.body;
    
//     console.log("Mensagem recebida:", message);  // Verifique o conteúdo da mensagem
  
//     if (!message) {
//       return res.status(400).send({ error: 'A mensagem não pode estar vazia!' });
//     }
  
//     try {
//       const user = await User.findById(req.userId);
//       if (!user) {
//         console.log("Usuário não encontrado!");  // Log caso o usuário não seja encontrado
//         return res.status(404).send({ error: 'Usuário não encontrado' });
//       }
  
//       // Cria a nova mensagem
//       const newMessage = new Message({
//         userId: user._id,
//         message: message,
//       });
  
//       console.log("Mensagem a ser salva:", newMessage);  // Verifique o conteúdo da mensagem antes de salvar
  
//       await newMessage.save();
//       res.status(201).send({ message: 'Mensagem enviada com sucesso!' });
//     } catch (err) {
//       console.error("Erro ao enviar a mensagem:", err);  // Log do erro ao salvar a mensagem
//       res.status(500).send({ error: 'Erro ao enviar a mensagem' });
//     }
//   });

router.post('/contact', authenticate, async (req, res) => {
    const { message } = req.body; // Pega apenas a mensagem do corpo da requisição
  
    if (!message) {
      return res.status(400).send({ error: 'A mensagem não pode estar vazia!' });
    }
  
    try {
      const user = await User.findById(req.userId); // Pega o usuário logado com base no token
      if (!user) {
        return res.status(404).send({ error: 'Usuário não encontrado' });
      }
  
      // Cria uma nova mensagem com dados adicionais do usuário
      const newMessage = new Message({
        userId: user._id,
        message: message,
        name: user.name,        // Inclui o nome do usuário
        whatsapp: user.whatsapp, // Inclui o WhatsApp do usuário
        cpf: user.cpf,          // Inclui o CPF do usuário
      });
  
      await newMessage.save();
      res.status(201).send({ message: 'Mensagem enviada com sucesso!' });
    } catch (err) {
      res.status(500).send({ error: 'Erro ao enviar a mensagem' });
    }
  });
  
  

module.exports = router;
