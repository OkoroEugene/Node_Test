const _router = require('express').Router(),
    _jwt = require('jsonwebtoken'),
    _passport = require('passport'),
    _config = require('../../src/config/config')(process.env.NODE_ENV || 'dev');

require('../../src/services/AuthenticationService')(_passport, _config);

_router.get('/login', function (req, res) {
    res.send("you need to login");
});

_router.post('/login', function (req, res, next) {
    _passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Invalid login credentials',
                user: user
            });
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = _jwt.sign({
                id: user.username
            }, _config.auth.secret, { expiresIn: '1h' });
            return res.json({
                user: user,
                token
            });
        });
    })(req, res);
});

module.exports = _router;