const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const passport = require('passport');
const _ = require('lodash');

router.post('/signup', async (req, res) => {
    try {
        const newUser = new UserModel({
            fullName: req.query.fullName,
            email: req.query.email,
            password: req.query.password
        });

        const user = await newUser.save()
        res.status(201).json(user.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

router.get('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.query.email })
        if (user === null) res.status(400).send('User not found');
        else {
            await bcrypt.compare(req.query.password, user.password, (err, same) => {
                if (err) res.status(500).json({ error: err });
                else if (same) res.status(200).json(user.toJSON());
                else res.status(401).send('Password did not match');
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});
module.exports.router = router;

module.exports.userProfile = (req, res, next) =>{
    UserModel.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(404).json(err);
        if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(401).json(info);
    })(req, res);
}