function UserService() {
    this.repository = new (require('../repositories/UserRepository'))();
}

UserService.prototype = Object.create(require('./ServiceHelper').prototype);

UserService.prototype.changePassword = function (req, callback) {
    return this.repository.changePassword(req, callback);
}

module.exports = UserService;