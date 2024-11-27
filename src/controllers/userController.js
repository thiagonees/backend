const User = require('../models/User');

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).send({ error: "Usuário não encontrado!" });
    }
    res.send(user);
};
