const router = require('express').Router();
const UserModel = require('../models/user.model');
const ToDoModel = require('../models/todo.model');

router.post('/add', (req, res) => {
    UserModel.findOne({uid: req.query.uid}, (err, user) => {
        if(err) res.status(404).send('User not found');
        else {
            const todo = new ToDoModel({
                title: req.query.title,
                description: req.query.description,
            });

            todo.save((err, todo) => {
                if(err) res.status(404).send(err)
                else res.status(201).send(todo);
            })
        }
    });
});

router.put('/update', (req, res) => {
    
});

router.delete('/remove', (req, res) => {
    res.status(200).send({
        title: req.query.title,
        description: req.query.description,
        status: req.query.status
    });
});

module.exports = router;