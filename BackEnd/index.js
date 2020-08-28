const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/user.controller');
const todoController = require('./controllers/todo.controller');
const passport = require('passport');
const jwtHelper = require('./jwtHelper');

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
app.listen(3000, () => {
    console.log('Server running at port 3000...');
});

require('./db');
require('./passportConfig');

app.use(passport.initialize());

app.post('/authenticate', userController.authenticate);

app.use('/api/user', userController.router);

app.use('/api/todo', todoController);

app.get('/', (req, res) => {
    res.send("<h2> Welcome to ToDo application's Backend </h2>");
});

app.get('*', (req, res) => {
    res.redirect('/');
});