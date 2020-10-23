const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const note = new Schema(
    {
        text: { type: String, required: false },
        completed: { type: Boolean, required: true},
        userId: {type: String, required: true} //идентификатор пользователя

    },
    { timestamps: true },
);

module.exports = mongoose.model('note', note);


