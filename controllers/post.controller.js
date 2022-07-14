const PostModel = require('../models/post.models');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find((err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log("Error to get data : " + err);
        }
    })
}

module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        postId: req.body.postId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post)
    }
    catch (err) {
        return res.status(400).send(err)
    }
};

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Id inconnu : " + req.params.id)
    }

    const updatedMessage = {
        message: req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedMessage },
        { new: true },
        (err, data) => {
            if (!err) {
                res.send(data)
            } else {
                console.log("Erreur de modification : " + err);
            }
        }
    )
}

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Id inconnu : " + req.params.id)
    }

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, data) => {
            if (!err) {
                res.send(data)
            } else {
                console.log("Erreur de suppression" + err);
            }
        }
    )
}


module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Id inconnu : " + req.params.id)
    }

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true })
            .catch((err) => res.status(400).send(err))
        
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true })
            .then((data) => { return res.send(data)})
            .catch((err) => res.status(400).send(err))
        
    }
    catch (err) {
        return res.status(400).send(err)
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Id inconnu : " + req.params.id)
    }
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true })
            .catch((err) => res.status(400).send(err))
        
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true })
            .then((data) => { return res.send(data)})
            .catch((err) => res.status(400).send(err))
        
    }
    catch (err) {
        return res.status(400).send(err)
    }
}