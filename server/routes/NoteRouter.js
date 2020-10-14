const express = require('express')

const NoteController = require('../controllers/NoteController');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/note', NoteController.createNote);
router.put('/note/:id', NoteController.updateNote);
router.delete('/note/:id', NoteController.deleteNote);
router.get('/note/:id', NoteController.getNoteById);
router.get('/notes', NoteController.getNoteList);
router.delete('/notes', NoteController. deleteClearNotes);
router.get('/note/filter/:completed', NoteController.getFilter);
router.post('/user/login', UserController.login);


module.exports = router;
