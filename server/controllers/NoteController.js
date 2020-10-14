const Note = require('../models/note')

createNote = (req, res) => {
    const body = req.body
    console.log('create note' + req.body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a note',
        })
    }

    const note = new Note(body);

    if (!note) {
        return res.status(400).json({ success: false, error: err })
    }

    note
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: note._id,
                message: 'Note created!',
            })
        })
        .catch(error => {
            console.log('note is not created: ' + error);
            return res.status(400).json({
                error,
                message: 'Note not created!',
            })
        })
}

updateNote = async (req, res) => {
    const body = req.body;
    console.log('update note' + req.params.id);

    console.log(req.body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must note a body to update',
        })
    }

    Note.findOne({ _id: req.params.id }, (err, note) => {
        if (err) {
            console.log('error during update note' + err);
            return res.status(404).json({
                err,
                message: 'Note not found!',
            })
        }
        note.text = body.text
        note.completed = body.completed
        note
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: note._id,
                    message: 'Note updated!',
                })
            })
            .catch(error => {
                console.log('note is not updated: ' + error);
                return res.status(404).json({
                    error,
                    message: 'Note not updated!',
                })
            })
    })
};

deleteNote = async (req, res) => {
    console.log('delete Note' + req.params.id);
    await Note.findOneAndDelete({ _id: req.params.id }, (err, note) => {
        if (err) {
            console.log('error during note deleting' + err);
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
};

getNoteById = async (req, res) => {
    console.log('get Note by id: ' + req.params.id);

    await Note.findOne({ _id: req.params.id }, (err, note) => {
        if (err) {
            console.log('error during get Note by id: ' + err);
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNoteList = async (req, res) => {
    console.log('get Note list: ');
    await Note.find({}, (err, notes) => {
        if (err) {
            console.log('error during get Note list: ' + err);
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: notes })
    }).catch(err => console.log(err))
}

deleteClearNotes = async (req, res) => {
    console.log('delete completed Notes');
    // console.log('delete completed Notes' + req.params);
    await Note.deleteMany({
        completed: true
    }, (err, note) => {
        if (err) {
            console.log('error during note complited' + err);
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note is not found` })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
};

getFilter =  async (req, res) => {
    console.log('get filter ',req.params.completed );

        console.log('get Note list: ');
        await Note.find({completed: req.params.completed}, (err, notes) => {
            if (err) {
                console.log('error during get filter: ' + err);
                return res.status(400).json({ success: false, error: err })
            }
            return res.status(200).json({ success: true, data: notes })
        }).catch(err => console.log(err))

};




module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNoteList,
    getNoteById,
    deleteClearNotes,
    getFilter,
};
