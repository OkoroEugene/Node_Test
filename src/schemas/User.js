const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    _bcrypt = require('bcrypt'),
    _config = require('../config/config')(process.env.NODE_ENV || 'dev');

const User = new _Schema({
    email: String,
    fullName: String,
    password: String,
    avatar: String,
    address: _Schema.Types.Array
});

User.pre("save", function (next) {
    if (!this.password || !this.email) throw new Error("email and password is required");
    this.password = _bcrypt.hashSync(this.password, _config.auth.saltRounds);
    next();
});

User.methods.confirmPassword = function (password) {
    return _bcrypt.compareSync(password, this.password);
};

module.exports = {
    schema: User,
    model: _mongoose.model('User', User)
};