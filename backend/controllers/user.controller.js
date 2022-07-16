const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id)) {
        res.status(400).send('ID inconnu : ' + req.params.id)
    }
    UserModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log('ID inconnu : ' + err);
        }
    }).select('-password');
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(400).send('ID inconnu : ' + req.params.id)
    }
  
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            pseudo: req.body.pseudo,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(400).send('ID inconnu : ' + req.params.id)
    }
    try {
        await UserModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message : "Suppression effectuée !"})
    }
    catch (err) {
        return res.status(500).json({ message: err})
    }
}