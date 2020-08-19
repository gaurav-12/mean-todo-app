const UserModel = require('../models/user.model');

const router = require('express').Router();

router.post('/signup', (req, res) => {
    UserModel.findOne({email: req.query.email}, (err, userModel) => {
        if(!err) res.status(400).send('User already present with same email id');
        else {
            const user = new UserModel({
                fullName: req.query.fullName,
                email: req.query.email,
                password: req.query.password
            });

            user.save((err, user) => {
                if(err) res.status(404).send(err)
                else res.status(201).send(user);
            });
        }
    });
});

router.get('/login', (req, res) => {
    UserModel.findOne({email: req.query.email}, (err, userModel) => {
        if(err) res.status(400).send('No user found with entered email');
        else res.status(200).send(userModel);
    });
});

module.exports = router;