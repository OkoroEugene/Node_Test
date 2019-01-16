if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'prod') {
    process.env.DEBUG = '*';
}

require('dotenv').config();
const _mongoose = require('mongoose'),
    _express = require('express'),
    _passport = require('passport'),
    _cookieParser = require('cookie-parser'),
    _bodyParser = require('body-parser'),
    _app = _express(),
    _config = require('./src/config/config')(process.env.NODE_ENV || 'dev');

_app.use(_express.static('public'));
_app.use(_cookieParser());

_app.use(_bodyParser.json({
    limit: '50mb'
})),
    _app.use(_bodyParser.urlencoded({
        extended: false
    })),
    _app.use(_express.static('public')),
    _app.use(_passport.initialize()),
    _app.use(_passport.session());

    require('./src/services/AuthenticationService')(_passport, _config);
_app.use('/', require('./src/routes/authentication')),
_app.use('/', require('./src/routes/states'));

_app.get('/', function (req, res) {
    res.send("express application");
});

(function _init() {
    _app.listen(process.env.PORT || _config.app.port, () => (`server started on port: ${_config.app.port}`));
    _mongoose.connect(`mongodb://${_config.database.host}:${_config.database.port}/${_config.database.name}`);
})();