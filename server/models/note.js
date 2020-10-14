const mongoose = require('mongoose')
const Schema = mongoose.Schema

const note = new Schema(
    {
        text: { type: String, required: false },
        completed: { type: Boolean, required: true},

    },
    { timestamps: true },
);

module.exports = mongoose.model('note', note);
