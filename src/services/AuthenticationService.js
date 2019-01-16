module.exports = function (passport, config) {
    const LocalStrategy = require('passport-local').Strategy,
        passportJWT = require("passport-jwt"),
        JWTStrategy = passportJWT.Strategy,
        ExtractJWT = passportJWT.ExtractJwt,
        _infratstructure = require('../infrastructure');

    passport.use(new LocalStrategy(
        function (username, password, done) {
            var user = _infratstructure.user.filter(a => {
                return a.username === username
            })
            if (!user.length) {
                return done(null, false, {
                    message: 'Invalid credentials.'
                });
            }
            if (user[0].password !== password) {
                return done(null, false, {
                    message: 'Invalid credentials.'
                });
            }
            return done(null, user);
        }
    ));

    // passport.use(new JWTStrategy({
    //     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //     secretOrKey: config.auth.secret
    // },
    //     function (jwtPayload, done) {
    //         var _getUser = _infratstructure.user.map(a => {
    //             a.username === username
    //         });
    //         return userService.findById(jwtPayload.id, (err, user) => {
    //             if (err) return done(err);
    //             return done(null, user);
    //         });
    //     }
    // ));
};