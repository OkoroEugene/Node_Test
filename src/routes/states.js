const _router = require('express').Router(),
    _infrastructure = require('../infrastructure');

_router.get('/states', function (req, res) {
    res.send(_infrastructure.states)
});

_router.post('/states', function (req, res) {
    _infrastructure.states.push(req.body.state);
    res.send(200).json({ message: "added successfully" })
});

_router.put('/states/:id', function (req, res) {
    if (_infrastructure.states.includes(req.body.state)) {
        _infrastructure.states.filter(a => {
            return a.states = req.params.state
        })
        res.send(200).json({ message: "modified successfully" })
    }
    res.send(401).json({ message: "an error occured" })
});

_router.delete('/states/:id', function (req, res) {
    var key = _infrastructure.states.findIndex(a => {
        return a.states === req.params.state
    })
    if (key !== -1) {
        _infrastructure.states.splice(key, 1);
        res.send(200).json({ message: "deleted successfully" })
    }
    res.send(401).json({ message: "an error occured" })
});

module.exports = _router;