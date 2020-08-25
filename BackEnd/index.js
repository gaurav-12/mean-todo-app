const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/user.controller');
const todoController = require('./controllers/todo.controller');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());
app.use(cors());
app.listen(3000, () => {
    console.log('Server running at port 3000...');
});

require('./db');

app.use('/api/user', userController);

app.use('/api/todo', todoController);

app.get('/', (req, res) => {
    res.send("<h2> Welcome to ToDo application's Backend </h2>");
});

app.get('*', (req, res) => {
    res.redirect('/');
});