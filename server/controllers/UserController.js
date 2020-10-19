const User = require('../models/user');
const jwt = require('jsonwebtoken');

login =  async (req, res) => {
    console.log('login', req.body.login, req.body.password);

    await User.findOne({deleted: false,
                     name: req.body.login,
                     password: req.body.password
    }, (err, user) => {
        if (err) {
            console.log('error during get filter: ' + err);
            return res.status(400).json({ success: false, error: err })
        }
        console.log(user);
        if (user) {
            // token
            const payload = {
                userId: user._id
            };
            const token = jwt.sign(payload, 'superSecret', {
                expiresIn : 60*60*24 // expires in 24 hours
            });
            return res.status(200).json({success: true, userId: user._id, token: token})
        } else {
            return res.status(401).json({
                success : false,
                error : "Invalid username and password.",
            });
        }
    }).catch(err => console.log(err))

};

registerUser = async (req, res) => {
    console.log('registerUser', req.body.name, req.body.password, req.body.email);

    const user = new User({ name: req.body.name, password: req.body.password, email: req.body.email, deleted: false
    });

    user
        .save()
        .then(() => {
            console.log(user);
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            console.log('user is not created: ' + error);
            return res.status(400).json({
                error,
                message: 'user not created!',
            })
        })

};

module.exports = {
    login,
    registerUser
};
