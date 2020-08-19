const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ToDoAppDB',
{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err) => {
    if(!err) console.log('Successfully connected to DB');
    else throw err;
});

module.exports = mongoose;