const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        deleted: { type: Boolean, required: true},
        //loginAttemptsCount: {type: Number, required: true},//кол-во раз
       // lastLoginAccessDate: {type: Date, required: true},//дата
       // isLocked: {type: Boolean, required: true}//аблокирован или нет пользователь

    },
    { timestamps: true },
);

module.exports = mongoose.model('user', user);