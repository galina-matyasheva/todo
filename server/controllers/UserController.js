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
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))

};

module.exports = {
    login
};
