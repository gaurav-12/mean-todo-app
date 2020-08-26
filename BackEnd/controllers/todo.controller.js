const router = require('express').Router();
const UserModel = require('../models/user.model');
const ToDoModel = require('../models/todo.model');

router.get('/get', async (req, res) => {
    try {
        const user = await UserModel.findById(req.query.id);
        if (user === null) res.status(400).send('User not found');
        else {
            const todos = await ToDoModel.find({ uid: req.query.id });
            res.status(201).send(todos);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

router.post('/add', async (req, res) => {
    try {
        const user = await UserModel.findById(req.query.uid);
        if (user === null) res.status(400).send('User not found');
        else {
            const newTodo = new ToDoModel({
                title: req.query.title,
                description: req.query.description,
                uid: req.query.uid
            });

            const todo = await newTodo.save();

            await user.updateOne({ "$push": { "todoList": todo._id } });

            res.status(201).json(todo.toJSON());
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

router.put('/update', async (req, res) => { // Expects whole todo including: title, description and status
    // Here query.id is the _id of ToDo Document and not the user id(uid)
    try {
        const todo = await ToDoModel.findById(req.query.id);
        if (todo === null) res.status(400).send('ToDo not found');
        else {
            todo.title = req.query.title;
            todo.description = req.query.description;
            todo.status = req.query.status;

            await todo.save();
            res.status(200).json({ success: true, message: 'ToDo updated' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

router.delete('/remove', async (req, res) => { // Expects the index of todo to be deleted, _id of ToDo, and user's if (as 'uid' in ToDo)
    try {
        const user = await UserModel.findById(req.query.uid);
        if (user === null) res.status(400).send('User not found');
        else {
            if (req.query.index === '-1') await user.update({ "$pull": { "todoList": { "uid": user._id } } });
            else {
                const todo = user.todoList[req.query.index]
                await user.updateOne({ "$pull": { "todoList": { "$in": [todo] } } });
            }
        }

        if (req.query.index === '-1') { // Delete all with matching 'uid'
            await ToDoModel.remove({ uid: req.query.uid });
        } else {
            const todo = await ToDoModel.findById(req.query.id);
            if (todo === null) res.status(400).send('ToDo not found');
            else await todo.deleteOne();
        }

        res.status(200).json({ success: true, message: 'ToDo removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;