var properties = require('../package.json')
var email = require('../service/email');
var {JoinUs, validate} = require('../model/joinus');
var validator = require('../midleware/validate');

var controllers = {
    about: function (req, res) {
        var aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutInfo);
    },
    joinUs: function(req, res){
        email.send(req, res, function(err, result){
            if(!err){
                console.log('email sent');
            }
        })
        email.store(req, res, function(err, result){
            if(!err){
                console.log('email stored');
            }
        });

        res.json('success');
    }
};

module.exports = controllers;