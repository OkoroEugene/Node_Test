const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/UserService'))(),
    _cloudinary = require('../services/CloudinaryService');

function UserController() {
    this.service = _service;
}

UserController.prototype = Object.create(_controllerHelper.prototype);

UserController.prototype.addContact = function (req, res) {
    return this.service.update({
        _id: req.user.id
    }, {
            $push: {
                address: req.body.address
            }
        }, (err, result) => {
            return res.send(err || result);
        })
}

UserController.prototype.fetchContact = function (req, res) {
    return this.service.findOneByParam({
        _id: req.user.id
    }, (err, result) => {
        return res.send(err || result.address);
    })
}

UserController.prototype.changePassword = function (req, res) {
    return this.service.changePassword(req, (error, result) => {
        if (error) {
            return res.status(404).send(error);
        }
        return res.send(result);
    })
}

UserController.prototype.avatar = function (req, res) {
    return _cloudinary.v2.uploader.upload(req.body.avatar, function (error, result) {
        var _service = new (require('../services/UserService'))();
        if (error || result) {
            _service.update({
                _id: req.user.id
            }, {
                    avatar: result.url
                }, (err, user) => {
                    if (error) return res.status(404).json({ message: "network error!" })
                    return res.send(err || {
                        url: result.url
                    });
                })
        }
    });
}

// UserController.prototype.uploadAvatar = function(req, res){
//     return this.service
// }

module.exports = UserController;