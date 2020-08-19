const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title cannot be empty'
    },
    description: {
        type: String,
        default: 'NA',
        set: (value) => {
            if(value === undefined || value === null) return 'NA';
            else return value
        }
    },
    createdOn: {
        type: mongoose.Types.date,
        default: new Date()
    },
    status: {
        type: String,
        enum: ['done', 'pending', 'doing'],
        default: 'pending',
    }
});

module.exports = mongoose.model('ToDo', todoSchema);