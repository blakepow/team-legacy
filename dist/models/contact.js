"use strict";
module.exports = function (mongoose) {
    var contactSchema = mongoose.Schema({
        houseNumber: {
            type: Number,
            required: true
        },
        streetName: {
            type: String,
            required: true
        },
        cityName: {
            type: String,
            required: true
        },
        countryName: {
            type: String,
            required: true
        },
        countryCode: {
            type: Number,
            required: true
        },
        telephoneNumber: {
            type: Number,
            required: true
        }
    });
    return mongoose.model('contact', contactSchema);
};
