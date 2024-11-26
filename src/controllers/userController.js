const User = require('../models/User');

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).send({ error: "User not found!" });
    }
    res.send(user);
};
