const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const noteRouter = require('./routes/NoteRouter')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
//
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', noteRouter);




app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

