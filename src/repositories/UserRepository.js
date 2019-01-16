const _BaseRepository = require('./BaseRepository'),
    _User = require('../schemas/User').model;

function UserRepository() {
    this.model = _User;
};

UserRepository.prototype = Object.create(_BaseRepository.prototype);

UserRepository.prototype.changePassword = function (req, callback) {
    return this.model.findById({ _id: req.user.id }, function (err, user) {
        if (!user.confirmPassword(req.body.oldPassword)) {
            return callback({
                message: 'Invalid credentials.'
            }, null);
        }
        user.password = req.body.newPassword;
        user.save((err, user) => {
            if (!err)
                return callback(null, user);
        })
    });
}

module.exports = UserRepository;