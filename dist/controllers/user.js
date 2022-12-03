"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var db = require('../models');
var User = db.user;
var getAll = function (req, res) {
    User.find({})
        .then(function (data) {
        res.status(200);
        res.send(data);
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).send({
            message: 'Could not get users from database. Please try again later.'
        });
    });
};
var getSingle = function (req, res) {
    try {
        var user_id_1 = mongoose.Types.ObjectId(req.params.user_id);
        User.findOne({ _id: user_id_1 })
            .then(function (data) {
            if (data === null || data.length == 0) {
                res.status(400).send({ message: 'Could not find user with id ' + user_id_1 + ' in the database.' });
            }
            else {
                res.status(200).send(data);
            }
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error getting user from database. Please try again later.'
            });
        });
    }
    catch (e) {
        res.status(400).send({ message: 'Invalid user_id. Please try again.' });
    }
};
module.exports = { getAll: getAll, getSingle: getSingle };
