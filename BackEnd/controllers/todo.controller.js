const router = require('express').Router();
const UserModel = require('../models/user.model');
const ToDoModel = require('../models/todo.model');

router.post('/add', async (req, res) => {
    try {
        const user = await UserModel.findById(req.query.id);
        if (user === null) res.status(400).send('User not found');
        else {
            const newTodo = new ToDoModel({
                title: req.query.title,
                description: req.query.description,
                uid: req.query.id
            });

            const todo = await newTodo.save();

            user.todoList.push(todo._id);
            await user.save();

            res.status(201).json({ todo });
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
            res.status(200).send('ToDo updated');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

router.delete('/remove', async (req, res) => { // Expects the index of todo to be deleted and _id of ToDo
    try {
        const todo = await ToDoModel.findById(req.query.id);
        if (todo === null) res.status(400).send('ToDo not found');
        else {
            const uid = todo.uid;

            await todo.deleteOne();

            const user = await UserModel.findById(uid);
            if (user === null) res.status(400).send('User not found');
            else {
                user.todoList.splice(req.query.index, 1);
                await user.save();
                res.status(200).send('ToDo removed');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;