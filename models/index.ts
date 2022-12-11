const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {
    'mongoose': mongoose,
    'url': process.env.MONGODB_URI,
    'user': require('./user')(mongoose),
    'projects': require('./projects')(mongoose)};

module.exports = db;