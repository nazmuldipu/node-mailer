'use strict';

const controller = require('./controller');

var {JoinUs, validate} = require('../model/joinus');
var validator = require('../midleware/validate');

module.exports = function (app) {
    app.get('/about', controller.about);
    app.post('/join-us', validator(validate), controller.joinUs);
};