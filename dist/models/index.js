"use strict";
var dotenv = require('dotenv');
dotenv.config();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = {
    'mongoose': mongoose,
    'url': process.env.MONGODB_URI,
    'user': require('./user')(mongoose),
    'contact': require('./contact')(mongoose)
};
module.exports = db;
