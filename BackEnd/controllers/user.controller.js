const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const router = require('express').Router();

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
                if(err) res.status(500).json({error: err});
                else if(same) res.status(200).json(user.toJSON());
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

module.exports = router;