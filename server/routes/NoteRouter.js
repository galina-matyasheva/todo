const express = require('express');

const NoteController = require('../controllers/NoteController');
const UserController = require('../controllers/UserController');
const jwt = require('jsonwebtoken');

const router = express.Router();

// router.use(function (req, res, next) {
//     const token = req.body.token || req.query.token || req.headers['x-access-token'];
//     console.log("router use", token);
//     if (token) {
//         jwt.verify(token, 'superSecret', function (err, decoded) {
//             if (err) {
//                 return res.json({status: 403, success: false, message: 'Failed to authenticate token.'});
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         return res.json({
//             status: 403,
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// });

router.post('/note', NoteController.createNote);
router.put('/note/:id', NoteController.updateNote);
router.delete('/note/:id', NoteController.deleteNote);
router.get('/note/:id', NoteController.getNoteById);
router.get('/notes/:userId', NoteController.getNoteList);
router.delete('/notes', NoteController. deleteClearNotes);
router.get('/note/filter/:userId/:completed', NoteController.getFilter);
router.post('/user/login', UserController.login);
router.post('/user/registerUser', UserController.registerUser);


module.exports = router;
