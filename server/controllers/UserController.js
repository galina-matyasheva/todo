const User = require('../models/user');

login =  async (req, res) => {
    console.log('login', req.body.login, req.body.password);

    await User.find({deleted: false,
                     name: req.body.login,
                     password: req.body.password
    }, (err, user) => {
        if (err) {
            console.log('error during get filter: ' + err);
            return res.status(400).json({ success: false, error: err })
        }
        console.log(user);
        return res.status(200).json({ success: true, data: user })
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
