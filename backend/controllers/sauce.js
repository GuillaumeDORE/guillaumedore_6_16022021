const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié!' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé!' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
exports.createLike = (req, res, next) => {
    const { like, userId } = req.body;
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            let { likes, dislikes, usersLiked, usersDisliked } = sauce

            switch (like) {
                case 1:
                    likes++
                    usersLiked.push(userId)
                    break;

                case 0:
                    if (usersDisliked.includes(userId)) {
                        usersDisliked.splice(usersDisliked.indexOf(userId), 1)
                        dislikes--
                    }

                    if (usersLiked.includes(userId)) {
                        usersLiked.splice(usersLiked.indexOf(userId), 1)
                        likes--
                    }
                    break;

                case -1:
                    dislikes++
                    usersDisliked.push(userId)
                    break;
            }

            Sauce.updateOne({ _id: req.params.id }, { likes, dislikes, usersLiked, usersDisliked, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Likes sur la sauce modifiés !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(407).json({ error }));
};
