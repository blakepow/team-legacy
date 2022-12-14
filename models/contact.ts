import mongoose from 'mongoose';
  
const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
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
})

export const ContactSchema = mongoose.model('contact', contactSchema);