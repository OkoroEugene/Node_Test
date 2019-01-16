// @ts-nocheck
const _router = require('express').Router(),
    _userController = new (require('../controllers/UserController'))(),
    _base64ToFile = require('../services/UtilityService').base64ToFile;

_router.get('/', _userController.findAll.bind(_userController));
_router.get('/contact', _userController.fetchContact.bind(_userController));
_router.put('/avatar', _base64ToFile("avatar"), _userController.avatar.bind(_userController));
_router.post('/', _userController.save.bind(_userController));
_router.post('/contact', _userController.addContact.bind(_userController));
_router.post('/password/change', _userController.changePassword.bind(_userController));
_router.get('/:id', _userController.findById.bind(_userController));
_router.put('/', _userController.update.bind(_userController));
_router.delete('/:id', _userController.delete.bind(_userController));

// function getAvatar(req, res, next) {
//     console.log(req.body.uploads)
//     if (req.body) {
//         req.body.avatar = req.body.uploads;
//         return next();
//     }
//     return next();
// }

module.exports = _router;