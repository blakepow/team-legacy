module.exports = (mongoose: any) => {
    const {isEmail} = require('validator');

    const contactSchema = mongoose.Schema({
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
        },
        email : {
            type: String,
            required: true,
            validate: [isEmail, 'invalid email'],
            unique: true,
        }
    });
    return mongoose.model('Contact', contactSchema);
};