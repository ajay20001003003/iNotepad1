const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,// foreign key 
        ref: 'user'// user table sae foreign key bna rahe hai
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    }
});
module.exports = mongoose.model('notes', NotesSchema);