import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    skills: {
        type: [String],
    },
    education: {
        type: [String],
    },
    experience: {
        type: [String],
    },
    projects: {
        type: [String],
    },
    interests: {
        type: [String],
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

export const AboutSchema = mongoose.model('about', aboutSchema);
