const mongoose = require('mongoose')

mongoose
    //.connect('mongodb://127.0.0.1:27017/cinema', { useNewUrlParser: true })
     .connect('mongodb+srv://galina:Ghjcnj14!@cluster0.ctdvh.mongodb.net/TodoList', { useNewUrlParser: true })
   // .connect('mongodb+srv://galina:Ghjcnj14!@cluster0-a80sz.mongodb.net/cinema', { useNewUrlParser: true })
   // .connect('mongodb+srv://galina:Ghjcnj14!@cluster0.osjzt.mongodb.net/Task', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
