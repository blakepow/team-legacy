"use strict";
module.exports = function (mongoose) {
    var projectsSchema = mongoose.Schema({
        user_id: {
            type: String,
            required: true,
            unique: false
        },
        title: {
            type: String,
            required: true,
            unique: false
        },
        description: {
            type: String,
            required: true,
            unique: false
        }
    });
    return mongoose.model('projects', projectsSchema);
};
